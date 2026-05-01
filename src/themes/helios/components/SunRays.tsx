export function SunRays({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMaxYMin meet"
    >
      <g transform="translate(240 0)" fill="var(--accent)">
        <path d="M0 0 L0 110 L-30 110 L-60 80 L-95 45 L-120 15 L-120 0 Z" />
        <g transform="rotate(195)">
          <rect x="0" y="-9" width="105" height="18" rx="9" />
        </g>
        <g transform="rotate(212)">
          <rect x="0" y="-10" width="135" height="20" rx="10" />
        </g>
        <g transform="rotate(228)">
          <rect x="0" y="-9" width="100" height="18" rx="9" />
        </g>
        <g transform="rotate(245)">
          <rect x="0" y="-8" width="80" height="16" rx="8" />
        </g>
        <g transform="rotate(260)">
          <rect x="0" y="-7" width="60" height="14" rx="7" />
        </g>
      </g>
    </svg>
  );
}
