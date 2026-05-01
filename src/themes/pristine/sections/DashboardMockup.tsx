/**
 * Polished analytics-dashboard mockup used as the hero centerpiece.
 * Replaces the dashboard GIF in the Alignify reference.
 *
 * Pure SVG, all colors driven by Pristine theme tokens — recolors with
 * any theme that ships compatible primary/accent/surface tokens.
 */
export function DashboardMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1100 620"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dm-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="50%" stopColor="var(--text)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="dm-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dm-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dm-bar1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="dm-bar2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F8B483" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F8B483" />
        </linearGradient>

        <filter id="dm-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="14" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dm-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.14" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main app frame */}
      <g filter="url(#dm-shadow)">
        <rect
          x="40"
          y="20"
          width="1020"
          height="580"
          rx="22"
          fill="var(--surface)"
          stroke="url(#dm-stroke)"
          strokeWidth="1.25"
        />
        <rect x="40" y="20" width="1020" height="120" rx="22" fill="url(#dm-shine)" />

        {/* Window controls */}
        <g transform="translate(60 40)">
          <circle cx="0" cy="0" r="5" fill="#FF5F57" />
          <circle cx="16" cy="0" r="5" fill="#FEBC2E" />
          <circle cx="32" cy="0" r="5" fill="#28C840" />
        </g>

        {/* URL bar */}
        <rect
          x="120"
          y="32"
          width="240"
          height="20"
          rx="6"
          fill="color-mix(in srgb, var(--text) 5%, transparent)"
        />
        <text
          x="132"
          y="46"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="9"
          fill="var(--muted)"
        >
          launchpad.app/dashboard
        </text>

        {/* Sidebar */}
        <rect
          x="40"
          y="76"
          width="200"
          height="524"
          fill="color-mix(in srgb, var(--text) 2%, var(--surface))"
        />
        <line
          x1="240"
          y1="76"
          x2="240"
          y2="600"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Sidebar workspace header */}
        <g transform="translate(60 102)">
          <rect width="28" height="28" rx="8" fill="var(--accent)" />
          <text
            x="14"
            y="20"
            textAnchor="middle"
            fontFamily="Inter Tight, sans-serif"
            fontWeight="700"
            fontSize="14"
            fill="#FFFFFF"
          >
            L
          </text>
          <rect x="40" y="6" width="80" height="7" rx="3" fill="var(--text)" opacity="0.85" />
          <rect x="40" y="18" width="48" height="5" rx="2.5" fill="var(--muted)" opacity="0.6" />
        </g>

        {/* Sidebar nav */}
        <g transform="translate(60 162)">
          <SidebarItem y={0} active label />
          <SidebarItem y={32} />
          <SidebarItem y={64} />
          <SidebarItem y={96} />
          <SidebarItem y={128} />
        </g>

        {/* Main content area */}
        <g transform="translate(264 96)">
          {/* Page title */}
          <rect width="200" height="14" rx="6" fill="var(--text)" opacity="0.9" />
          <rect y="22" width="320" height="6" rx="3" fill="var(--muted)" opacity="0.55" />

          {/* CTA button */}
          <g transform="translate(640 -6)">
            <rect
              width="120"
              height="34"
              rx="17"
              fill="var(--accent)"
            />
            <rect
              x="24"
              y="13"
              width="56"
              height="7"
              rx="3"
              fill="#FFFFFF"
              opacity="0.95"
            />
            <circle cx="98" cy="17" r="4" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* KPI cards row */}
          <g transform="translate(0 60)" filter="url(#dm-card-shadow)">
            <KpiCard x={0} value="48.2k" label="Active users" trend="+12.4%" up />
            <KpiCard x={246} value="$24.8k" label="MRR" trend="+8.2%" up />
            <KpiCard x={492} value="2.1%" label="Churn rate" trend="−0.3%" up />
          </g>

          {/* Big chart card */}
          <g transform="translate(0 224)" filter="url(#dm-card-shadow)">
            <rect
              width="492"
              height="252"
              rx="16"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <rect width="492" height="56" rx="16" fill="url(#dm-shine)" />

            {/* Chart header */}
            <g transform="translate(20 26)">
              <rect width="120" height="8" rx="3" fill="var(--text)" opacity="0.85" />
              <rect y="14" width="80" height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
            </g>

            {/* Tab pills */}
            <g transform="translate(360 24)">
              <rect width="48" height="22" rx="11" fill="color-mix(in srgb, var(--accent) 12%, transparent)" />
              <text
                x="24"
                y="15"
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fontWeight="700"
                fill="var(--accent)"
              >
                7D
              </text>
              <rect
                x="56"
                width="48"
                height="22"
                rx="11"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x="80"
                y="15"
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fontWeight="600"
                fill="var(--muted)"
              >
                30D
              </text>
            </g>

            {/* Chart body */}
            <g transform="translate(20 76)">
              {/* Grid lines */}
              <g stroke="var(--border)" strokeWidth="0.75" opacity="0.6">
                <line x1="0" y1="0" x2="452" y2="0" />
                <line x1="0" y1="40" x2="452" y2="40" />
                <line x1="0" y1="80" x2="452" y2="80" />
                <line x1="0" y1="120" x2="452" y2="120" />
                <line x1="0" y1="160" x2="452" y2="160" />
              </g>

              {/* Y labels */}
              <g
                fontFamily="ui-monospace, monospace"
                fontSize="8"
                fill="var(--muted)"
              >
                <text x="-12" y="3" textAnchor="end">50k</text>
                <text x="-12" y="43" textAnchor="end">40k</text>
                <text x="-12" y="83" textAnchor="end">30k</text>
                <text x="-12" y="123" textAnchor="end">20k</text>
                <text x="-12" y="163" textAnchor="end">10k</text>
              </g>

              {/* Area */}
              <path
                d="M 0 130 L 40 110 L 80 120 L 120 80 L 160 90 L 200 60 L 240 70 L 280 40 L 320 50 L 360 25 L 400 35 L 452 12 L 452 160 L 0 160 Z"
                fill="url(#dm-area)"
              />
              {/* Line */}
              <path
                d="M 0 130 L 40 110 L 80 120 L 120 80 L 160 90 L 200 60 L 240 70 L 280 40 L 320 50 L 360 25 L 400 35 L 452 12"
                stroke="url(#dm-line)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Endpoint dot */}
              <circle cx="452" cy="12" r="6" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2.5" />
              {/* Hover popover */}
              <g transform="translate(360 -18)">
                <rect
                  width="92"
                  height="30"
                  rx="6"
                  fill="var(--text)"
                  opacity="0.95"
                />
                <text
                  x="46"
                  y="13"
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize="8"
                  fill="#FFFFFF"
                  opacity="0.7"
                >
                  Apr 27
                </text>
                <text
                  x="46"
                  y="24"
                  textAnchor="middle"
                  fontFamily="Inter Tight, sans-serif"
                  fontSize="11"
                  fontWeight="700"
                  fill="#FFFFFF"
                >
                  48,210
                </text>
              </g>
            </g>
          </g>

          {/* Side card — bar chart breakdown */}
          <g transform="translate(516 224)" filter="url(#dm-card-shadow)">
            <rect
              width="220"
              height="252"
              rx="16"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <rect width="220" height="56" rx="16" fill="url(#dm-shine)" />
            <g transform="translate(20 26)">
              <rect width="100" height="8" rx="3" fill="var(--text)" opacity="0.85" />
              <rect y="14" width="60" height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
            </g>
            {/* Bar chart */}
            <g transform="translate(20 92)">
              <BarRow y={0} w={170} value="Direct" pct={88} />
              <BarRow y={32} w={140} value="Search" pct={72} />
              <BarRow y={64} w={92} value="Social" pct={48} altColor />
              <BarRow y={96} w={62} value="Email" pct={32} altColor />
              <BarRow y={128} w={36} value="Other" pct={18} altColor />
            </g>
          </g>
        </g>
      </g>

      {/* Floating notification card — top right */}
      <g transform="translate(820 90) rotate(3)" filter="url(#dm-card-shadow)">
        <rect
          width="240"
          height="80"
          rx="16"
          fill="var(--surface)"
          stroke="url(#dm-stroke)"
          strokeWidth="1.25"
        />
        <rect width="240" height="40" rx="16" fill="url(#dm-shine)" />
        <g transform="translate(16 18)">
          <circle cx="14" cy="14" r="14" fill="color-mix(in srgb, var(--accent) 14%, transparent)" />
          <path
            d="M 8 14 L 12 18 L 20 10"
            stroke="var(--accent)"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="36" y="6" width="120" height="7" rx="3" fill="var(--text)" opacity="0.85" />
          <rect x="36" y="18" width="160" height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
          <rect x="36" y="28" width="100" height="5" rx="2.5" fill="var(--muted)" opacity="0.45" />
        </g>
      </g>

      {/* Floating user-avatar card — bottom left */}
      <g transform="translate(60 470) rotate(-3)" filter="url(#dm-card-shadow)">
        <rect
          width="220"
          height="74"
          rx="16"
          fill="var(--surface)"
          stroke="url(#dm-stroke)"
          strokeWidth="1.25"
        />
        <rect width="220" height="36" rx="16" fill="url(#dm-shine)" />
        <g transform="translate(16 18)">
          <circle cx="14" cy="14" r="14" fill="#F8B483" />
          <text
            x="14"
            y="19"
            textAnchor="middle"
            fontFamily="Inter Tight, sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#FFFFFF"
          >
            A
          </text>
          <rect x="38" y="6" width="100" height="7" rx="3" fill="var(--text)" opacity="0.85" />
          <rect x="38" y="18" width="140" height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
          {/* Stars */}
          <g transform="translate(38 28)">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} x={i * 12} y={4} size={4.5} />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ---- helpers ---- */

function SidebarItem({
  y,
  active,
  label,
}: {
  y: number;
  active?: boolean;
  label?: boolean;
}) {
  return (
    <g transform={`translate(0 ${y})`}>
      {active && (
        <rect
          x="-8"
          width="172"
          height="24"
          rx="8"
          fill="color-mix(in srgb, var(--accent) 8%, transparent)"
        />
      )}
      <rect width="14" height="14" rx="3" fill={active ? 'var(--accent)' : 'var(--muted)'} opacity={active ? 1 : 0.5} />
      <rect
        x="22"
        y="4"
        width={label ? 100 : 80}
        height="6"
        rx="3"
        fill={active ? 'var(--text)' : 'var(--muted)'}
        opacity={active ? 0.9 : 0.55}
      />
    </g>
  );
}

function KpiCard({
  x,
  value,
  label,
  trend,
  up,
}: {
  x: number;
  value: string;
  label: string;
  trend: string;
  up: boolean;
}) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect
        width="220"
        height="140"
        rx="16"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <rect width="220" height="56" rx="16" fill="url(#dm-shine)" />
      <g transform="translate(20 26)">
        <text
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="600"
          fill="var(--muted)"
          letterSpacing="1.5"
        >
          {label.toUpperCase()}
        </text>
      </g>
      <text
        x="20"
        y="78"
        fontFamily="Inter Tight, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="var(--text)"
        letterSpacing="-1"
      >
        {value}
      </text>
      <g transform="translate(20 96)">
        <rect
          width="64"
          height="22"
          rx="11"
          fill={up ? 'color-mix(in srgb, #0E9384 14%, transparent)' : 'color-mix(in srgb, #BE123C 14%, transparent)'}
        />
        <text
          x="32"
          y="15"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          fill={up ? '#0E9384' : '#BE123C'}
        >
          {up ? '▲ ' : '▼ '}
          {trend}
        </text>
      </g>
    </g>
  );
}

function BarRow({
  y,
  w,
  value,
  pct,
  altColor,
}: {
  y: number;
  w: number;
  value: string;
  pct: number;
  altColor?: boolean;
}) {
  return (
    <g transform={`translate(0 ${y})`}>
      <rect width="60" height="6" rx="3" y="9" fill="var(--text)" opacity="0.85" />
      <rect
        x="0"
        y="20"
        width="180"
        height="4"
        rx="2"
        fill="color-mix(in srgb, var(--text) 6%, transparent)"
      />
      <rect
        x="0"
        y="20"
        width={w}
        height="4"
        rx="2"
        fill={altColor ? 'url(#dm-bar2)' : 'url(#dm-bar1)'}
      />
      <text
        x="190"
        y="14"
        fontFamily="ui-monospace, monospace"
        fontSize="8"
        fontWeight="600"
        fill="var(--muted)"
      >
        {pct}%
      </text>
    </g>
  );
}

function Star({ x, y, size }: { x: number; y: number; size: number }) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? size : size / 2.4;
    const px = x + r * Math.cos(angle);
    const py = y + r * Math.sin(angle);
    points.push(`${px.toFixed(2)},${py.toFixed(2)}`);
  }
  return <polygon points={points.join(' ')} fill="#F8B483" />;
}
