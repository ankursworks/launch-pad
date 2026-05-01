/**
 * Agentic illustration — modern, gradient + glassmorphic foreground only.
 * The SVG is fully transparent; the atmospheric brand-color mesh lives on
 * the parent panel (see IllustrationPanel). Glass cards pick up the panel's
 * coloured haze through their fill-opacity.
 *
 * Layers:
 *   1. Ambient glow behind agent (soft accent halo)
 *   2. Dashed connecting paths to satellites
 *   3. Glass tool nodes (translucent + gradient border + animated pulse)
 *   4. Central agent — radial gradient core, specular highlight, sparkle glyph
 *   5. Floating glass cards (thinking + result) with stroke gradient + top shine
 *   6. Gradient sparkles
 */
export function AgenticIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Ambient glow behind agent */}
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF531F" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#FF531F" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FF531F" stopOpacity="0" />
        </radialGradient>

        {/* Agent core — vermilion → navy */}
        <radialGradient id="agent-core" cx="35%" cy="32%" r="85%">
          <stop offset="0%" stopColor="#FFE2D4" />
          <stop offset="35%" stopColor="#FF8956" />
          <stop offset="70%" stopColor="#FF531F" />
          <stop offset="100%" stopColor="#1C2230" />
        </radialGradient>

        {/* Glass card stroke */}
        <linearGradient id="card-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF531F" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#1C2230" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF531F" stopOpacity="0.55" />
        </linearGradient>

        {/* Top-edge shine for glass surfaces */}
        <linearGradient id="card-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Sparkle */}
        <linearGradient id="sparkle-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB68F" />
          <stop offset="100%" stopColor="#FF531F" />
        </linearGradient>

        {/* Bar chart */}
        <linearGradient id="bar-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#FF531F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF531F" />
        </linearGradient>

        {/* Drop shadow for glass elements */}
        <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.22" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* L1: ambient glow behind agent */}
      <circle cx="400" cy="300" r="240" fill="url(#ai-glow)" />

      {/* L2: connecting dashed paths */}
      <g
        stroke="var(--text)"
        strokeWidth="1.25"
        fill="none"
        opacity="0.32"
        strokeDasharray="2 6"
        strokeLinecap="round"
      >
        <path d="M 400 300 Q 280 200 180 170" />
        <path d="M 400 300 Q 540 200 640 170" />
        <path d="M 400 300 Q 280 420 170 460" />
        <path d="M 400 300 Q 540 420 660 460" />
      </g>

      {/* L3: tool nodes */}
      <ToolNode x={130} y={140} kind="search" />
      <ToolNode x={620} y={140} kind="db" />
      <ToolNode x={120} y={440} kind="code" />
      <ToolNode x={620} y={440} kind="api" />

      {/* L4: central agent */}
      <g transform="translate(400 300)" filter="url(#glass-shadow)">
        <circle r="100" fill="none" stroke="#FF531F" strokeWidth="1" opacity="0.25" />
        <circle r="78" fill="none" stroke="url(#card-stroke)" strokeWidth="1.5" />
        <circle r="56" fill="url(#agent-core)" />
        <circle r="56" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
        {/* Specular highlight */}
        <ellipse cx="-18" cy="-22" rx="20" ry="12" fill="#FFFFFF" opacity="0.32" />
        <ellipse cx="-22" cy="-26" rx="9" ry="5" fill="#FFFFFF" opacity="0.5" />
        {/* Sparkle glyph */}
        <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95">
          <line x1="0" y1="-24" x2="0" y2="24" />
          <line x1="-24" y1="0" x2="24" y2="0" />
        </g>
        <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6">
          <line x1="-16" y1="-16" x2="16" y2="16" />
          <line x1="-16" y1="16" x2="16" y2="-16" />
        </g>
        <circle r="4" fill="#FFFFFF" />
        {/* Label pill */}
        <g transform="translate(0 84)">
          <rect
            x="-34"
            y="-12"
            width="68"
            height="24"
            rx="12"
            fill="#1C2230"
            stroke="url(#card-stroke)"
            strokeWidth="1"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="10"
            fontWeight="600"
            fill="#FFFFFF"
            letterSpacing="2"
          >
            AGENT
          </text>
        </g>
      </g>

      {/* L5: floating glass cards */}
      <ThinkingCard x={40} y={60} />
      <ResultCard x={500} y={420} />

      {/* L6: sparkles */}
      <Sparkle x={90} y={310} size={11} />
      <Sparkle x={720} y={300} size={15} />
      <Sparkle x={350} y={520} size={9} />
      <Sparkle x={460} y={120} size={10} />
      <Sparkle x={250} y={380} size={6} />
    </svg>
  );
}

/* ---------- Sub-components ---------- */

function ToolNode({
  x,
  y,
  kind,
}: {
  x: number;
  y: number;
  kind: 'search' | 'db' | 'code' | 'api';
}) {
  return (
    <g transform={`translate(${x} ${y})`} filter="url(#glass-shadow)">
      <rect
        x="-28"
        y="-28"
        width="56"
        height="56"
        rx="16"
        fill="var(--surface)"
        fillOpacity="0.78"
        stroke="url(#card-stroke)"
        strokeWidth="1.25"
      />
      <rect
        x="-28"
        y="-28"
        width="56"
        height="28"
        rx="16"
        fill="url(#card-shine)"
        opacity="0.9"
      />
      <g
        stroke="var(--text)"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === 'search' && (
          <>
            <circle cx="-3" cy="-3" r="9" />
            <line x1="4" y1="4" x2="10" y2="10" />
          </>
        )}
        {kind === 'db' && (
          <>
            <ellipse cx="0" cy="-9" rx="11" ry="3.5" />
            <path d="M -11 -9 V 9 Q -11 12.5 0 12.5 Q 11 12.5 11 9 V -9" />
            <path d="M -11 0 Q -11 3.5 0 3.5 Q 11 3.5 11 0" />
          </>
        )}
        {kind === 'code' && (
          <>
            <polyline points="-5,-7 -12,0 -5,7" />
            <polyline points="5,-7 12,0 5,7" />
            <line x1="2" y1="-9" x2="-2" y2="9" />
          </>
        )}
        {kind === 'api' && (
          <>
            <circle cx="0" cy="0" r="11" />
            <ellipse cx="0" cy="0" rx="5" ry="11" />
            <line x1="-11" y1="0" x2="11" y2="0" />
          </>
        )}
      </g>
      <circle cx="20" cy="-20" r="3.5" fill="#FF531F" />
      <circle cx="20" cy="-20" r="6" fill="#FF531F" opacity="0.3">
        <animate attributeName="r" values="4;9;4" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function ThinkingCard({ x, y }: { x: number; y: number }) {
  const W = 240;
  const H = 116;
  return (
    <g transform={`translate(${x} ${y}) rotate(-4)`} filter="url(#glass-shadow)">
      <rect
        width={W}
        height={H}
        rx="18"
        fill="var(--surface)"
        fillOpacity="0.72"
        stroke="url(#card-stroke)"
        strokeWidth="1.25"
      />
      <rect width={W} height={H / 2} rx="18" fill="url(#card-shine)" opacity="0.95" />
      <g transform="translate(20 22)">
        <circle r="8" fill="#FF531F" />
        <g stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <line x1="-3" y1="0" x2="2" y2="0" />
          <line x1="2" y1="0" x2="2" y2="-4" />
        </g>
      </g>
      <rect x="38" y="16" width="84" height="7" rx="3.5" fill="var(--text)" opacity="0.9" />
      <rect x="38" y="27" width="56" height="5" rx="2.5" fill="var(--muted)" opacity="0.6" />
      <line
        x1="16"
        y1="48"
        x2={W - 16}
        y2="48"
        stroke="var(--text)"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <rect x="20" y="60" width={W - 40} height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
      <rect x="20" y="74" width={W - 70} height="5" rx="2.5" fill="var(--muted)" opacity="0.5" />
      <rect x="20" y="88" width={W - 100} height="5" rx="2.5" fill="var(--muted)" opacity="0.4" />
      <g transform={`translate(${W - 24} ${H - 22})`}>
        <circle r="6" fill="#FF531F" opacity="0.25">
          <animate attributeName="r" values="4;11;4" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.45;0;0.45" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle r="3.5" fill="#FF531F" />
      </g>
    </g>
  );
}

function ResultCard({ x, y }: { x: number; y: number }) {
  const W = 260;
  const H = 124;
  return (
    <g transform={`translate(${x} ${y}) rotate(3)`} filter="url(#glass-shadow)">
      <rect
        width={W}
        height={H}
        rx="18"
        fill="var(--surface)"
        fillOpacity="0.74"
        stroke="url(#card-stroke)"
        strokeWidth="1.25"
      />
      <rect width={W} height={H / 2} rx="18" fill="url(#card-shine)" opacity="0.95" />
      <g transform="translate(24 26)">
        <circle r="11" fill="#FF531F" />
        <path
          d="M -5 0 L -1 4 L 6 -4"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <rect x="46" y="20" width="124" height="7" rx="3.5" fill="var(--text)" opacity="0.9" />
      <rect x="46" y="31" width="80" height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
      <line
        x1="16"
        y1="54"
        x2={W - 16}
        y2="54"
        stroke="var(--text)"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <g transform="translate(22 68)">
        <rect x="0" y="22" width="11" height="22" rx="3" fill="var(--text)" opacity="0.22" />
        <rect x="15" y="14" width="11" height="30" rx="3" fill="var(--text)" opacity="0.32" />
        <rect x="30" y="6" width="11" height="38" rx="3" fill="url(#bar-grad)" opacity="0.85" />
        <rect x="45" y="14" width="11" height="30" rx="3" fill="url(#bar-grad)" opacity="0.95" />
        <rect x="60" y="0" width="11" height="44" rx="3" fill="url(#bar-grad)" />
      </g>
      <g transform="translate(118 76)">
        <rect
          width="50"
          height="22"
          rx="11"
          fill="#FF531F"
          fillOpacity="0.14"
          stroke="#FF531F"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x="25"
          y="15"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#FF531F"
          letterSpacing="1"
        >
          DONE
        </text>
      </g>
      <g transform="translate(176 76)">
        <rect
          width="70"
          height="22"
          rx="11"
          fill="var(--text)"
          fillOpacity="0.07"
          stroke="var(--text)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <text
          x="35"
          y="15"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          fill="var(--text)"
          letterSpacing="1"
        >
          +3 STEPS
        </text>
      </g>
    </g>
  );
}

function Sparkle({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size;
  const t = size * 0.32;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M 0 ${-s} L ${t} ${-t} L ${s} 0 L ${t} ${t} L 0 ${s} L ${-t} ${t} L ${-s} 0 L ${-t} ${-t} Z`}
        fill="url(#sparkle-grad)"
      />
      <circle r={size * 0.15} fill="#FFFFFF" opacity="0.85" />
    </g>
  );
}
