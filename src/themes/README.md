# Themes

Each theme is a self-contained module that owns its visual language end-to-end:
tokens, components, layouts, pages, and assets. App routes are thin
re-exports from `themes/active`.

## Layout

```
themes/
├── active/          # one-line barrel — change to swap active theme
│   └── index.ts     # `export * from '../helios'`
├── helios/          # editorial · cream + vermilion · Fraunces/Inter
│   ├── tokens.ts
│   ├── components/  # Button, Card, Input, Modal (Radix), Header, Sidebar, ...
│   ├── layouts/     # AuthLayout, AppLayout
│   ├── pages/       # Home, Login, Signup, Dashboard, Profile, StyleGuide
│   ├── assets/
│   └── index.ts
├── brutalist/       # (planned)
└── lumen/           # (planned)
```

## Theme contract

Every theme's `index.ts` must re-export this set of named symbols:

| Group       | Names                                                        |
| ----------- | ------------------------------------------------------------ |
| Components  | `Button` `Card` `Input` `Modal` `Header` `Sidebar` `ThemeSwitcher` |
| Layouts     | `AuthLayout` `AppLayout`                                     |
| Pages       | `Home` `Login` `Signup` `Dashboard` `Profile` `StyleGuide`   |
| Tokens      | `theme` (`ThemeMeta`), `tokens` (`{ light, dark }`)          |

App routes (`src/app/...`) import from `@/themes/active` — they don't know
which theme is loaded.

## Adding a new theme

1. Copy `helios/` to `<name>/` and rebuild it. Same export contract.
2. Add `'<name>'` to the `ThemeName` union in `src/core/theme/types.ts`.
3. To activate it, change one line in `themes/active/index.ts`:
   ```ts
   export * from '../<name>';
   ```

## Removing themes (forking)

After choosing a theme, delete the others:

```bash
# keep only Helios
rm -rf src/themes/{brutalist,lumen}
```

Then make sure `themes/active/index.ts` points at the kept theme.

## Why theme-as-module?

A theme isn't just colors — it's a visual language including layout choices,
component shapes, and asset style. Tokens-only theming forces every theme to
share the same component skeletons. This architecture lets each theme make
its own structural calls (e.g., the Helios sign-in is two-column with
sun-rays art; another theme might be single-column minimalist) while routing,
auth, and routing stay shared in `src/core`.
