/**
 * Helios dashboard mockup — sidebar with icons, header with Add Task / timer,
 * 4 KPI cards with mini area charts, Users + Time tracker panels below.
 *
 * Matches the Syntro reference; all colors driven by Helios theme tokens
 * so it re-skins with any accent.
 */
export function DashboardMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1100 540"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hd-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="50%" stopColor="var(--text)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="hd-area-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E9384" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0E9384" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hd-area-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <filter id="hd-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="14" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.14" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* App frame */}
      <g filter="url(#hd-shadow)">
        <rect
          x="20"
          y="20"
          width="1060"
          height="500"
          rx="20"
          fill="var(--surface)"
          stroke="url(#hd-stroke)"
          strokeWidth="1.25"
        />

        {/* Top bar with traffic dots + spacer + add task + timer + bell */}
        <g transform="translate(40 38)">
          <circle cx="0" cy="0" r="5" fill="var(--accent)" />
          <rect x="14" y="-6" width="22" height="12" rx="3" fill="var(--text)" opacity="0.07" />
        </g>
        <g transform="translate(720 28)">
          {/* Add Task pill */}
          <rect width="98" height="28" rx="14" fill="var(--text)" />
          <text x="49" y="18" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#FFFFFF">
            + Add Task
          </text>
          {/* Timer pill */}
          <g transform="translate(108 0)">
            <rect width="90" height="28" rx="14" fill="var(--text)" opacity="0.08" />
            <text x="45" y="18" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="600" fill="var(--text)">
              00:00:00
            </text>
          </g>
          {/* Play button */}
          <g transform="translate(208 0)">
            <circle cx="14" cy="14" r="14" fill="var(--accent)" />
            <path d="M 11 9 L 19 14 L 11 19 Z" fill="#FFFFFF" />
          </g>
          {/* Bell */}
          <g transform="translate(248 6)" stroke="var(--text)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 4 8 a 5 5 0 0 1 10 0 v 4 l 2 3 H 2 l 2 -3 z" />
            <path d="M 7 18 a 2 2 0 0 0 4 0" />
          </g>
        </g>

        {/* Sidebar */}
        <rect x="20" y="68" width="84" height="452" fill="color-mix(in srgb, var(--text) 2%, var(--surface))" />
        <line x1="104" y1="68" x2="104" y2="520" stroke="var(--border)" strokeWidth="1" />

        {/* Sidebar icons */}
        <g transform="translate(62 100)" stroke="var(--text)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Logo at top */}
          <g transform="translate(0 0)" stroke="none" fill="var(--accent)">
            {[0, 45, 90, 135].map((angle, i) => (
              <rect key={i} x="-1.5" y="-9" width="3" height="18" rx="1.5" transform={`rotate(${angle})`} />
            ))}
            <circle r="2.5" fill="var(--surface)" />
          </g>

          {/* Active item highlight */}
          <rect x="-16" y="38" width="32" height="32" rx="8" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="none" />

          {/* Stack of icons */}
          {/* Home */}
          <g transform="translate(0 54)">
            <path d="M -7 1 L 0 -6 L 7 1 V 7 H -7 Z" stroke="var(--accent)" />
          </g>
          {/* Folder */}
          <g transform="translate(0 90)" opacity="0.5">
            <path d="M -7 -3 H -2 L 0 -1 H 7 V 5 H -7 Z" />
          </g>
          {/* Calendar */}
          <g transform="translate(0 126)" opacity="0.5">
            <rect x="-7" y="-5" width="14" height="12" rx="1.5" />
            <line x1="-4" y1="-7" x2="-4" y2="-3" />
            <line x1="4" y1="-7" x2="4" y2="-3" />
          </g>
          {/* People */}
          <g transform="translate(0 162)" opacity="0.5">
            <circle cx="0" cy="-3" r="3" />
            <path d="M -6 6 a 6 6 0 0 1 12 0" />
          </g>
          {/* Settings */}
          <g transform="translate(0 198)" opacity="0.5">
            <circle cx="0" cy="0" r="3" />
            <path d="M 0 -7 v 2 M 0 5 v 2 M 7 0 h -2 M -5 0 h -2" />
          </g>
          {/* Bottom: doc */}
          <g transform="translate(0 360)" opacity="0.5">
            <rect x="-6" y="-7" width="12" height="14" rx="1.5" />
            <line x1="-3" y1="-3" x2="3" y2="-3" />
            <line x1="-3" y1="0" x2="3" y2="0" />
            <line x1="-3" y1="3" x2="1" y2="3" />
          </g>
        </g>

        {/* Main content area */}
        <g transform="translate(124 78)">
          {/* Page title */}
          <text fontFamily="var(--font-display-family)" fontSize="22" fontWeight="400" fill="var(--text)" letterSpacing="-0.5" y="20">
            Dashboard
          </text>

          {/* Top-right pills */}
          <g transform="translate(820 0)">
            <rect width="36" height="28" rx="8" fill="none" stroke="var(--border)" strokeWidth="1" />
            <line x1="14" y1="14" x2="22" y2="14" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="10" x2="18" y2="18" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g transform="translate(866 0)">
            <rect width="100" height="28" rx="8" fill="none" stroke="var(--border)" strokeWidth="1" />
            <text x="50" y="18" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500" fill="var(--text)">
              📅 This Week
            </text>
          </g>

          {/* KPI cards */}
          <g transform="translate(0 56)">
            <KpiCard x={0} title="Profits" value="76%" delta="+9%" caption="from last week" up />
            <KpiCard x={236} title="Completed" value="12" delta="-3%" caption="from last week" up={false} />
            <KpiCard x={472} title="Rate" value="$80" delta="+2%" caption="from last week" up />
            <KpiCard x={708} title="Grow" value="12" delta="-1%" caption="from last week" up={false} />
          </g>

          {/* Bottom panels: Users + Time tracker */}
          <g transform="translate(0 248)">
            {/* Users panel */}
            <rect width="492" height="172" rx="14" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
            <g transform="translate(20 24)">
              <text fontFamily="var(--font-display-family)" fontSize="16" fontWeight="400" fill="var(--text)">
                Users
              </text>
              <g transform="translate(60 -10)">
                <rect width="22" height="18" rx="9" fill="color-mix(in srgb, var(--accent) 12%, transparent)" />
                <text x="11" y="12" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="var(--accent)">
                  16
                </text>
              </g>
            </g>
            {/* Action chips */}
            <g transform="translate(338 18)">
              <rect width="52" height="24" rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
              <text x="26" y="16" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="500" fill="var(--text)">
                ↓ Export
              </text>
            </g>
            <g transform="translate(396 18)">
              <rect width="76" height="24" rx="12" fill="var(--accent)" />
              <text x="38" y="16" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#FFFFFF">
                + Add user
              </text>
            </g>

            {/* Avatar list rows */}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(20 ${64 + i * 32})`}>
                <circle cx="14" cy="14" r="14" fill={['#F8B483', '#C4BDAD', '#FF9871'][i]} />
                <text x="14" y="18" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#FFFFFF">
                  {['A', 'M', 'R'][i]}
                </text>
                <rect x="36" y="9" width="100" height="6" rx="3" fill="var(--text)" opacity="0.85" />
                <rect x="36" y="20" width="60" height="4" rx="2" fill="var(--muted)" opacity="0.5" />
                <rect x="320" y="11" width="50" height="4" rx="2" fill="var(--muted)" opacity="0.5" />
                <rect x="400" y="11" width="60" height="4" rx="2" fill="var(--muted)" opacity="0.5" />
              </g>
            ))}

            {/* Time tracker panel */}
            <g transform="translate(508 0)">
              <rect width="448" height="172" rx="14" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
              <text x="20" y="36" fontFamily="var(--font-display-family)" fontSize="16" fontWeight="400" fill="var(--text)">
                Time tracker
              </text>
              {/* Pause button */}
              <g transform="translate(404 18)">
                <circle cx="12" cy="12" r="12" fill="var(--text)" opacity="0.07" />
                <rect x="9" y="8" width="2.5" height="8" rx="0.5" fill="var(--text)" />
                <rect x="13.5" y="8" width="2.5" height="8" rx="0.5" fill="var(--text)" />
              </g>
              {/* Big timer */}
              <text x="20" y="92" fontFamily="var(--font-display-family)" fontSize="42" fontWeight="400" fill="var(--text)" letterSpacing="-1.5">
                01:24:36
              </text>
              {/* Project label + bar */}
              <text x="20" y="118" fontFamily="Inter, sans-serif" fontSize="11" fill="var(--muted)">
                Working on · Helios v2 launch
              </text>
              <rect x="20" y="130" width="408" height="6" rx="3" fill="color-mix(in srgb, var(--text) 6%, transparent)" />
              <rect x="20" y="130" width="280" height="6" rx="3" fill="var(--accent)" />
              <text x="20" y="156" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="600" fill="var(--muted)">
                68% · 3h 12m left
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function KpiCard({
  x,
  title,
  value,
  delta,
  caption,
  up,
}: {
  x: number;
  title: string;
  value: string;
  delta: string;
  caption: string;
  up: boolean;
}) {
  // Mini area chart paths — sparser/longer for KPI cards
  const path = up
    ? 'M 0 36 L 18 32 L 36 28 L 54 22 L 72 18 L 90 12 L 108 16 L 126 8 L 144 14 L 160 6'
    : 'M 0 14 L 18 10 L 36 18 L 54 12 L 72 22 L 90 18 L 108 28 L 126 24 L 144 32 L 160 30';
  const areaPath = up
    ? 'M 0 36 L 18 32 L 36 28 L 54 22 L 72 18 L 90 12 L 108 16 L 126 8 L 144 14 L 160 6 L 160 44 L 0 44 Z'
    : 'M 0 14 L 18 10 L 36 18 L 54 12 L 72 22 L 90 18 L 108 28 L 126 24 L 144 32 L 160 30 L 160 44 L 0 44 Z';

  return (
    <g transform={`translate(${x} 0)`}>
      <rect width="220" height="180" rx="14" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
      <text x="20" y="32" fontFamily="Inter, sans-serif" fontSize="13" fill="var(--muted)">
        {title}
      </text>
      <text
        x="20"
        y="78"
        fontFamily="var(--font-display-family)"
        fontSize="40"
        fontWeight="400"
        fill="var(--text)"
        letterSpacing="-1.5"
      >
        {value}
      </text>
      {/* Delta + caption */}
      <g transform="translate(20 96)">
        <rect
          width="36"
          height="20"
          rx="10"
          fill={up ? 'color-mix(in srgb, #0E9384 14%, transparent)' : 'color-mix(in srgb, var(--accent) 14%, transparent)'}
        />
        <text
          x="18"
          y="14"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          fill={up ? '#0E9384' : 'var(--accent)'}
        >
          {delta}
        </text>
        <text
          x="42"
          y="14"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fill="var(--muted)"
        >
          {caption}
        </text>
      </g>
      {/* Mini chart */}
      <g transform="translate(30 124)">
        <path d={areaPath} fill={up ? 'url(#hd-area-up)' : 'url(#hd-area-down)'} />
        <path
          d={path}
          stroke={up ? '#0E9384' : 'var(--accent)'}
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}
