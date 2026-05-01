#!/usr/bin/env node
/**
 * LaunchPad — fork setup.
 *
 * Run after cloning: `npm run setup`
 *
 *   • renames the project in package.json
 *   • confirms / pins the active theme
 *   • optionally replaces the dashboard showcase with a blank starter
 *   • rewrites the README to a clean per-project version
 *
 * Flags (all optional — anything you skip falls back to interactive prompt):
 *
 *   --name <slug>            Project name. Slugified for package.json.
 *   --theme <name>           Active theme (must exist under src/themes/).
 *   --prune                  Delete unused theme folders.
 *   --no-prune               Keep unused theme folders (default).
 *   --reset                  Replace dashboard showcase with starter.
 *   --no-reset               Keep dashboard showcase (default).
 *   --keep-readme            Don't rewrite README.md.
 *   --yes, -y                Non-interactive: use defaults for any unspecified flag.
 *
 * Examples:
 *   npm run setup                                # fully interactive
 *   npm run setup -- --theme helios --yes        # non-interactive defaults
 *   npm run setup -- --name my-app --theme helios --prune --yes
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout, argv } from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---- CLI flag parsing ----------------------------------------------
const flags = parseFlags(argv.slice(2));
const isInteractive = !flags.yes;
const rl = isInteractive
  ? readline.createInterface({ input: stdin, output: stdout })
  : null;
const askPrompt = async (q, fallback = '') => {
  if (!rl) return fallback;
  const v = await rl.question(q);
  return v.trim() || fallback;
};

const yes = (v) => /^y(es)?$/i.test(v.trim());

const c = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  accent: '\x1b[38;5;208m', // vermilion-ish
  green: '\x1b[32m',
  red: '\x1b[31m',
};

console.log(`\n${c.accent}${c.bold}LaunchPad${c.reset} ${c.dim}— fork setup${c.reset}\n`);

// ---- Detect available themes ---------------------------------------
const themesDir = path.join(ROOT, 'src/themes');
let availableThemes = [];
try {
  const entries = await readdir(themesDir, { withFileTypes: true });
  availableThemes = entries
    .filter((e) => e.isDirectory() && e.name !== 'active')
    .map((e) => e.name);
} catch {
  console.error(`${c.red}error:${c.reset} could not read ${themesDir}`);
  process.exit(1);
}

if (availableThemes.length === 0) {
  console.error(`${c.red}error:${c.reset} no themes found under src/themes/`);
  process.exit(1);
}

// ---- Project name --------------------------------------------------
const pkgPath = path.join(ROOT, 'package.json');
const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
const currentName = pkg.name ?? 'launchpad';

const projectName =
  flags.name ??
  (await askPrompt(
    `Project name ${c.dim}[${currentName}]${c.reset}: `,
    currentName
  ));

// ---- Theme choice --------------------------------------------------
let chosenTheme;
if (flags.theme) {
  if (!availableThemes.includes(flags.theme)) {
    console.error(
      `${c.red}error:${c.reset} theme "${flags.theme}" not found. Available: ${availableThemes.join(', ')}`
    );
    process.exit(1);
  }
  chosenTheme = flags.theme;
} else if (!isInteractive || availableThemes.length === 1) {
  chosenTheme = availableThemes[0];
  if (availableThemes.length === 1) {
    console.log(`Theme: ${c.bold}${chosenTheme}${c.reset} ${c.dim}(only theme available)${c.reset}`);
  } else {
    console.log(`Theme: ${c.bold}${chosenTheme}${c.reset} ${c.dim}(default — pass --theme to override)${c.reset}`);
  }
} else {
  console.log('\nAvailable themes:');
  availableThemes.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  const choice = await askPrompt(`\nPick a theme ${c.dim}[1]${c.reset}: `, '1');
  const idx = Math.max(0, Math.min(availableThemes.length - 1, Number(choice) - 1));
  chosenTheme = availableThemes[idx];
}

// ---- Prune other themes? -------------------------------------------
const otherThemes = availableThemes.filter((t) => t !== chosenTheme);
let pruneOthers = false;
if (otherThemes.length > 0) {
  if (flags.prune !== undefined) {
    pruneOthers = flags.prune;
  } else if (isInteractive) {
    pruneOthers = yes(
      await askPrompt(
        `Delete the other ${otherThemes.length} theme folder(s) (${otherThemes.join(', ')})? ${c.dim}[y/N]${c.reset}: `,
        'n'
      )
    );
  }
}

// ---- Reset showcase content? ---------------------------------------
let resetShowcase = false;
if (flags.reset !== undefined) {
  resetShowcase = flags.reset;
} else if (isInteractive) {
  resetShowcase = yes(
    await askPrompt(
      `Replace the dashboard component-showcase with a blank starter? ${c.dim}[y/N]${c.reset}: `,
      'n'
    )
  );
}

// ---- Write README? -------------------------------------------------
let writeReadme = true;
if (flags.keepReadme) {
  writeReadme = false;
} else if (isInteractive) {
  writeReadme = yes(
    await askPrompt(
      `Replace README.md with a project-specific one? ${c.dim}[Y/n]${c.reset}: `,
      'y'
    )
  );
}

console.log('');

// ---- Apply changes -------------------------------------------------
pkg.name = slugify(projectName);
await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
log('package.json', `name → ${pkg.name}`);

const activePath = path.join(ROOT, 'src/themes/active/index.ts');
const activeContent = `/**\n * Active theme barrel — change this single line to swap the active theme.\n * App routes import from \`@/themes/active\`.\n */\nexport * from '../${chosenTheme}';\n`;
await writeFile(activePath, activeContent);
log('themes/active', `→ ${chosenTheme}`);

if (pruneOthers) {
  const { rm } = await import('node:fs/promises');
  for (const t of otherThemes) {
    await rm(path.join(themesDir, t), { recursive: true, force: true });
    log('removed', `themes/${t}`);
  }
}

if (resetShowcase) {
  const dashPath = path.join(ROOT, `src/themes/${chosenTheme}/pages/Dashboard.tsx`);
  if (existsSync(dashPath)) {
    await writeFile(dashPath, blankDashboard());
    log('Dashboard.tsx', 'reset to starter');
  }
}

if (writeReadme) {
  await writeFile(path.join(ROOT, 'README.md'), buildReadme(projectName, chosenTheme));
  log('README.md', 'rewritten');
}

console.log(`\n${c.green}✓${c.reset} Setup complete. Run ${c.bold}npm run dev${c.reset} to start.\n`);
rl?.close();

// ---- Helpers -------------------------------------------------------
function parseFlags(args) {
  const out = { yes: false, keepReadme: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    switch (a) {
      case '--yes':
      case '-y':
        out.yes = true;
        break;
      case '--name':
        out.name = args[++i];
        break;
      case '--theme':
        out.theme = args[++i];
        break;
      case '--prune':
        out.prune = true;
        break;
      case '--no-prune':
        out.prune = false;
        break;
      case '--reset':
        out.reset = true;
        break;
      case '--no-reset':
        out.reset = false;
        break;
      case '--keep-readme':
        out.keepReadme = true;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
      default:
        console.error(`Unknown flag: ${a}\nRun \`npm run setup -- --help\` for usage.`);
        process.exit(1);
    }
  }
  return out;
}

function printHelp() {
  console.log(`
LaunchPad fork setup

  npm run setup                                # interactive
  npm run setup -- --theme helios --yes        # non-interactive with defaults
  npm run setup -- --name my-app --theme helios --prune --yes

Flags:
  --name <slug>      Project name (slugified for package.json)
  --theme <name>     Active theme — must exist under src/themes/
  --prune            Delete unused theme folders
  --no-prune         Keep unused theme folders (default)
  --reset            Replace dashboard showcase with starter
  --no-reset         Keep dashboard showcase (default)
  --keep-readme      Don't rewrite README.md
  --yes, -y          Skip prompts; use defaults for unspecified options
  --help, -h         Show this help
`);
}

function log(label, detail) {
  console.log(`  ${c.green}✓${c.reset} ${c.dim}${label.padEnd(18)}${c.reset} ${detail}`);
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 214);
}

function blankDashboard() {
  return `'use client';
import { Card } from '@/themes/active';

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1
        className="text-3xl md:text-4xl font-normal mb-6"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        Dashboard
      </h1>
      <Card>
        <p>Start building your app here.</p>
      </Card>
    </div>
  );
}
`;
}

function buildReadme(name, theme) {
  return `# ${name}

Built on [LaunchPad](https://github.com/) · **${theme}** theme.

## Quick start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open <http://localhost:3000>.

## Structure

\`\`\`
src/
├── app/             # Next.js routes (thin re-exports from active theme)
├── core/
│   ├── auth/        # Auth store + mock backend (replace with real API)
│   ├── theme/       # Theme infra
│   ├── routing/     # ProtectedShell
│   ├── hooks/       # useDisclosure, useDebounce, useMediaQuery, …
│   ├── lib/         # api.ts, cn.ts
│   └── templates/   # Settings, Team, Billing, Profile, Onboarding, Projects
└── themes/
    ├── active/      # one-line barrel — swap theme here
    └── ${theme}/        # tokens + components + brand pages
\`\`\`

## Authentication

The mock backend lives in \`src/core/auth/mock-backend.ts\`. Replace
\`mockLogin\` and \`mockSignup\` with calls to your real API.

The \`api()\` helper in \`src/core/lib/api.ts\` already attaches the auth
token from \`localStorage\` to every request.

## License

MIT
`;
}
