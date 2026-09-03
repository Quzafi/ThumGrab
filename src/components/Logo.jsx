// Brand mark for ThumbGrab — a thumbnail frame with a download arrow.
// The mark uses YouTube's signature red so it stays consistent with the UI.
export default function Logo({ size = 40, className = '', title = 'ThumbGrab logo' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect x="3" y="3" width="42" height="42" rx="13" fill="#FF0000" />
      <rect x="3" y="3" width="42" height="42" rx="13" fill="#FFFFFF" fillOpacity="0.06" />
      {/* thumbnail frame */}
      <rect
        x="11"
        y="12.5"
        width="26"
        height="19"
        rx="4.5"
        stroke="#FFFFFF"
        strokeOpacity="0.9"
        strokeWidth="2.4"
      />
      {/* download arrow */}
      <path
        d="M24 16.5v8.4"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M20.4 21.6 24 25.4l3.6-3.8"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* base tray */}
      <path
        d="M17 35.5h14"
        stroke="#FFFFFF"
        strokeOpacity="0.9"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
