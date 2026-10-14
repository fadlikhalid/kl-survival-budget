const STARS = [
  [34, 18], [78, 40], [120, 14], [168, 34], [236, 12], [300, 28],
  [352, 10], [410, 22], [452, 52], [520, 16], [540, 44], [90, 66],
]

// Lit windows on the two towers: [x, y] on a 6px grid.
const WINDOWS = [
  [338, 78], [350, 78], [338, 94], [350, 100], [344, 112], [356, 112],
  [388, 82], [400, 82], [388, 100], [400, 94], [394, 112], [406, 106],
  [338, 126], [356, 120], [388, 124], [406, 124],
]

function Skyline() {
  return (
    <svg
      className="skyline"
      viewBox="0 0 560 150"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <g fill="#fff6dc">
        {STARS.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={index % 3 === 0 ? 1.6 : 1}
            opacity={index % 2 === 0 ? 0.9 : 0.5}
            className={index % 4 === 0 ? 'twinkle' : undefined}
          />
        ))}
      </g>

      <circle cx="486" cy="40" r="17" fill="#ffd23f" />
      <circle cx="480" cy="34" r="3.5" fill="#f1b51f" />
      <circle cx="492" cy="46" r="2.5" fill="#f1b51f" />

      {/* far buildings */}
      <g fill="#0f4a4a">
        <rect x="0" y="104" width="38" height="46" />
        <rect x="38" y="90" width="28" height="60" />
        <rect x="66" y="112" width="40" height="38" />
        <rect x="438" y="96" width="30" height="54" />
        <rect x="468" y="108" width="40" height="42" />
        <rect x="508" y="86" width="26" height="64" />
        <rect x="534" y="100" width="26" height="50" />
      </g>

      {/* KL Tower */}
      <g fill="#0a3433">
        <rect x="213" y="22" width="2.4" height="44" />
        <rect x="208" y="66" width="12.4" height="8" rx="4" />
        <path d="M204 76h20.4l-4 12h-12.4z" />
        <path d="M209.4 88h9.6l1.6 62h-12.8z" />
      </g>

      {/* Petronas Towers */}
      <g fill="#082a29">
        <g id="tower-a">
          <rect x="330" y="104" width="38" height="46" />
          <rect x="334" y="82" width="30" height="22" />
          <rect x="338" y="64" width="22" height="18" />
          <rect x="342" y="48" width="14" height="16" />
          <path d="M349 18l5 30h-10z" />
        </g>
        <use href="#tower-a" x="48" />
        <rect x="368" y="114" width="10" height="6" />
      </g>
      <g fill="#ffd23f" opacity="0.85">
        {WINDOWS.map(([x, y], index) => (
          <rect key={index} x={x} y={y} width="3" height="4" />
        ))}
      </g>

      {/* front row */}
      <g fill="#041f1e">
        <rect x="0" y="128" width="64" height="22" />
        <rect x="96" y="120" width="40" height="30" />
        <rect x="136" y="132" width="56" height="18" />
        <rect x="244" y="124" width="52" height="26" />
        <rect x="296" y="134" width="40" height="16" />
        <rect x="430" y="126" width="62" height="24" />
        <rect x="492" y="134" width="68" height="16" />
      </g>
    </svg>
  )
}

export default Skyline
