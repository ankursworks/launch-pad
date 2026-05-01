/**
 * Pristine illustration — a clean analytics-dashboard mockup.
 * Replaces the warm agentic art of Helios with a "data product" feel:
 * line chart, KPI cards, geometric grid, electric-blue accents.
 */
export function PristineHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pristine-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3758F9" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#111928" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3758F9" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="pristine-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3758F9" />
          <stop offset="100%" stopColor="#5A75FF" />
        </linearGradient>
        <linearGradient id="pristine-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3758F9" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3758F9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pristine-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="pristine-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
          <feOffset dx="0" dy="8" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.14" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main analytics card */}
      <g transform="translate(140 130)" filter="url(#pristine-shadow)">
        {/* Card body */}
        <rect
          width="500"
          height="320"
          rx="20"
          fill="var(--surface)"
          stroke="url(#pristine-stroke)"
          strokeWidth="1.25"
        />
        <rect width="500" height="160" rx="20" fill="url(#pristine-shine)" />

        {/* Header */}
        <g transform="translate(28 28)">
          <rect width="160" height="10" rx="5" fill="var(--text)" opacity="0.85" />
          <rect y="20" width="100" height="6" rx="3" fill="var(--muted)" opacity="0.6" />
        </g>
        {/* Header pill */}
        <g transform="translate(420 28)">
          <rect
            width="52"
            height="22"
            rx="11"
            fill="#3758F9"
            fillOpacity="0.12"
            stroke="#3758F9"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <text
            x="26"
            y="15"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#3758F9"
            letterSpacing="0.5"
          >
            LIVE
          </text>
        </g>

        {/* Big number */}
        <g transform="translate(28 80)">
          <text
            fontFamily="Inter Tight, sans-serif"
            fontSize="42"
            fontWeight="700"
            fill="var(--text)"
            letterSpacing="-1"
          >
            48.2k
          </text>
          <g transform="translate(140 -22)">
            <rect
              width="72"
              height="22"
              rx="11"
              fill="#0E9384"
              fillOpacity="0.12"
            />
            <text
              x="36"
              y="15"
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="10"
              fontWeight="700"
              fill="#0E9384"
              letterSpacing="0.5"
            >
              ▲ +12.4%
            </text>
          </g>
          <text
            x="0"
            y="22"
            fontFamily="Inter Tight, sans-serif"
            fontSize="13"
            fill="var(--muted)"
          >
            Active users · last 30 days
          </text>
        </g>

        {/* Chart area */}
        <g transform="translate(28 168)">
          {/* Grid lines */}
          <g stroke="var(--border)" strokeWidth="0.75" opacity="0.6">
            <line x1="0" y1="0" x2="444" y2="0" />
            <line x1="0" y1="32" x2="444" y2="32" />
            <line x1="0" y1="64" x2="444" y2="64" />
            <line x1="0" y1="96" x2="444" y2="96" />
            <line x1="0" y1="128" x2="444" y2="128" />
          </g>

          {/* Area under line */}
          <path
            d="M 0 100 L 40 80 L 80 95 L 120 60 L 160 70 L 200 40 L 240 50 L 280 28 L 320 38 L 360 18 L 400 30 L 444 12 L 444 128 L 0 128 Z"
            fill="url(#pristine-area)"
          />
          {/* Line */}
          <path
            d="M 0 100 L 40 80 L 80 95 L 120 60 L 160 70 L 200 40 L 240 50 L 280 28 L 320 38 L 360 18 L 400 30 L 444 12"
            stroke="url(#pristine-line)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Endpoint dot */}
          <circle cx="444" cy="12" r="6" fill="#3758F9" stroke="var(--surface)" strokeWidth="2.5" />

          {/* X-axis labels */}
          <g
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="var(--muted)"
          >
            <text x="0" y="148">M</text>
            <text x="74" y="148">T</text>
            <text x="148" y="148">W</text>
            <text x="222" y="148">T</text>
            <text x="296" y="148">F</text>
            <text x="370" y="148">S</text>
            <text x="438" y="148">S</text>
          </g>
        </g>
      </g>

      {/* Floating KPI card — top left */}
      <g transform="translate(40 70) rotate(-3)" filter="url(#pristine-shadow)">
        <rect
          width="180"
          height="84"
          rx="14"
          fill="var(--surface)"
          stroke="url(#pristine-stroke)"
          strokeWidth="1.25"
        />
        <rect width="180" height="42" rx="14" fill="url(#pristine-shine)" />
        <g transform="translate(16 18)">
          <rect width="90" height="6" rx="3" fill="var(--muted)" opacity="0.6" />
        </g>
        <text
          x="16"
          y="56"
          fontFamily="Inter Tight, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="var(--text)"
          letterSpacing="-0.5"
        >
          $24.8k
        </text>
        <g transform="translate(116 36)">
          <rect width="48" height="20" rx="10" fill="#0E9384" fillOpacity="0.12" />
          <text
            x="24"
            y="14"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#0E9384"
          >
            +8.2%
          </text>
        </g>
      </g>

      {/* Floating mini-chart card — bottom right */}
      <g transform="translate(540 460) rotate(3)" filter="url(#pristine-shadow)">
        <rect
          width="220"
          height="100"
          rx="14"
          fill="var(--surface)"
          stroke="url(#pristine-stroke)"
          strokeWidth="1.25"
        />
        <rect width="220" height="50" rx="14" fill="url(#pristine-shine)" />
        <g transform="translate(16 18)">
          <rect width="84" height="7" rx="3.5" fill="var(--text)" opacity="0.85" />
          <rect y="14" width="60" height="5" rx="2.5" fill="var(--muted)" opacity="0.6" />
        </g>
        {/* Bar mini-chart */}
        <g transform="translate(16 56)">
          <rect x="0" y="20" width="14" height="20" rx="3" fill="var(--text)" opacity="0.18" />
          <rect x="20" y="14" width="14" height="26" rx="3" fill="var(--text)" opacity="0.28" />
          <rect x="40" y="6" width="14" height="34" rx="3" fill="#3758F9" opacity="0.55" />
          <rect x="60" y="14" width="14" height="26" rx="3" fill="#3758F9" opacity="0.78" />
          <rect x="80" y="0" width="14" height="40" rx="3" fill="#3758F9" />
          <rect x="100" y="6" width="14" height="34" rx="3" fill="#3758F9" opacity="0.78" />
        </g>
        {/* Pill */}
        <g transform="translate(140 64)">
          <rect width="64" height="22" rx="11" fill="#E3EBFF" />
          <text
            x="32"
            y="15"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#3758F9"
            letterSpacing="0.5"
          >
            REPORT
          </text>
        </g>
      </g>

      {/* Decorative geometric marks */}
      <g opacity="0.7">
        <circle cx="700" cy="120" r="6" fill="#3758F9" />
        <circle cx="700" cy="120" r="14" fill="none" stroke="#3758F9" strokeOpacity="0.3" strokeWidth="1.5" />
      </g>
      <g opacity="0.5">
        <rect x="80" y="510" width="8" height="8" rx="1.5" fill="#0E9384" transform="rotate(45 84 514)" />
      </g>
      <g opacity="0.6">
        <rect x="380" y="540" width="40" height="3" rx="1.5" fill="#3758F9" />
        <rect x="380" y="548" width="24" height="3" rx="1.5" fill="#3758F9" opacity="0.5" />
      </g>
    </svg>
  );
}
