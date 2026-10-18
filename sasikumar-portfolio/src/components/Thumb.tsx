import type { Project } from "../data/content";

/** Workstation-themed SVG illustrations: Deep Black, Metallic Silver, Electric Blue, and Fiery Red. */
export default function Thumb({ kind }: { kind: Project["kind"] }) {
  const id = `g-${kind}`;
  return (
    <svg viewBox="0 0 400 220" role="img" aria-label={`${kind} project illustration`} className="h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d2ff" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#ff003c" />
        </linearGradient>

        <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d2ff" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>

        <linearGradient id={`${id}-red`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff003c" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>

        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#040409" />
          <stop offset="100%" stopColor="#0a0c1a" />
        </linearGradient>

        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="220" fill={`url(#${id}-bg)`} />

      {/* Cyber grid lines in Electric Blue */}
      <g stroke="#00d2ff" strokeOpacity=".09">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>

      {/* Project 1: Full-Stack E-Commerce Website */}
      {kind === "shop" && (
        <g>
          {/* Cyber Device / Storefront container */}
          <rect x="44" y="28" width="104" height="164" rx="14" fill="#060814" stroke={`url(#${id})`} strokeWidth="1.8" />
          <rect x="54" y="44" width="84" height="50" rx="8" fill="#0a0e22" stroke="#00d2ff" strokeOpacity="0.5" strokeWidth="1" />
          
          {/* Neon item preview inside device */}
          <circle cx="96" cy="69" r="15" fill="none" stroke="#ff003c" strokeWidth="2" filter={`url(#${id}-glow)`} />
          <path d="M89 69 L94 74 L104 64" fill="none" stroke="#00d2ff" strokeWidth="2.2" strokeLinecap="round" />

          {/* Product text bars */}
          <rect x="54" y="106" width="56" height="6" rx="3" fill="#00d2ff" opacity=".85" />
          <rect x="54" y="118" width="38" height="6" rx="3" fill="#ff003c" opacity=".85" />
          
          {/* Cyber Checkout Button */}
          <rect x="54" y="146" width="84" height="24" rx="6" fill={`url(#${id}-blue)`} />
          <text x="96" y="162" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#030712">CHECKOUT</text>

          {/* Grid of cyber catalog items */}
          <g transform="translate(176 34)">
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${(i % 2) * 102} ${Math.floor(i / 2) * 78})`}>
                <rect width="90" height="68" rx="10" fill="#080b18" stroke={i % 2 === 0 ? "#00d2ff" : "#ff003c"} strokeOpacity=".4" strokeWidth="1.2" />
                <rect x="28" y="12" width="34" height="28" rx="6" fill="none" stroke={i % 2 === 0 ? `url(#${id}-blue)` : `url(#${id}-red)`} strokeWidth="1.5" />
                <rect x="14" y="50" width="46" height="5" rx="2.5" fill="#cbd5e1" opacity=".6" />
              </g>
            ))}
          </g>

          {/* Floating glowing cart badge */}
          <g transform="translate(332 166)">
            <circle r="22" fill={`url(#${id}-red)`} filter={`url(#${id}-glow)`} />
            <path d="M-8 -6h4l3 9h9l3-7h-14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="-1" cy="7.5" r="1.6" fill="#ffffff" />
            <circle cx="8" cy="7.5" r="1.6" fill="#ffffff" />
          </g>
        </g>
      )}

      {/* Project 2: AI-Based Face Recognition Attendance System */}
      {kind === "medicine" && (
        <g>
          {/* AI Face Recognition Biometric Scanner HUD */}
          <g transform="translate(200 110)">
            {/* Outer Target Brackets in Electric Blue */}
            <path d="M-65 -65 L-45 -65 M-65 -65 L-65 -45" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" filter={`url(#${id}-glow)`} />
            <path d="M65 -65 L45 -65 M65 -65 L65 -45" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" filter={`url(#${id}-glow)`} />
            <path d="M-65 65 L-45 65 M-65 65 L-65 45" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" filter={`url(#${id}-glow)`} />
            <path d="M65 65 L45 65 M65 65 L65 45" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" filter={`url(#${id}-glow)`} />

            {/* Stylized Face Contour in Fiery Red */}
            <path
              d="M-30 -25 C-30 -50 30 -50 30 -25 C30 10 20 40 0 50 C-20 40 -30 10 -30 -25 Z"
              fill="#060918"
              stroke="#ff003c"
              strokeWidth="2.2"
              opacity="0.9"
            />

            {/* Biometric Face Mesh Points */}
            <circle cx="-12" cy="-12" r="3.5" fill="#00d2ff" filter={`url(#${id}-glow)`} />
            <circle cx="12" cy="-12" r="3.5" fill="#00d2ff" filter={`url(#${id}-glow)`} />
            <circle cx="0" cy="5" r="2.5" fill="#cbd5e1" />
            <line x1="0" y1="-12" x2="0" y2="5" stroke="#00d2ff" strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="-10" y1="24" x2="10" y2="24" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="-10" cy="24" r="2" fill="#ff003c" />
            <circle cx="10" cy="24" r="2" fill="#ff003c" />

            {/* Horizontal Laser Scanning Line in Fiery Red Glow */}
            <line x1="-70" y1="0" x2="70" y2="0" stroke="#ff003c" strokeWidth="2.5" opacity="0.95" filter={`url(#${id}-glow)`} />

            {/* Status Badges */}
            <g transform="translate(0 78)">
              <rect x="-65" y="0" width="130" height="20" rx="4" fill="#00d2ff" fillOpacity="0.15" stroke="#00d2ff" strokeWidth="1.2" />
              <text x="0" y="14" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#00d2ff">
                90% MATCH · VERIFIED
              </text>
            </g>
          </g>

          <g transform="translate(40 60)" fontFamily="monospace" fontSize="9" fill="#94a3b8">
            <text x="0" y="0" fill="#00d2ff">&gt; OPENCV_FEED</text>
            <text x="0" y="16">&gt; RESOLUTION: 1080P</text>
            <text x="0" y="32" fill="#ff003c">&gt; DB: SQL_SERVER</text>
          </g>

          <g transform="translate(300 60)" fontFamily="monospace" fontSize="9" fill="#94a3b8">
            <text x="0" y="0" fill="#ff003c">&gt; CONFIDENCE: 0.90</text>
            <text x="0" y="16">&gt; LATENCY: 42ms</text>
            <text x="0" y="32" fill="#00d2ff">&gt; ATTEND: RECORDED</text>
          </g>
        </g>
      )}

      {/* Project 3: House Price Prediction */}
      {kind === "house" && (
        <g>
          <path d="M40 176 H360" stroke="#00d2ff" strokeOpacity=".3" strokeDasharray="3 3" />
          
          <g transform="translate(56 74)">
            <path d="M0 42 L52 0 L104 42 V102 H0 Z" fill="#070919" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="40" y="62" width="24" height="40" rx="3" fill="#ff003c" opacity="0.8" />
            <rect x="14" y="52" width="18" height="18" rx="2" fill="#00d2ff" opacity=".7" />
            <rect x="72" y="52" width="18" height="18" rx="2" fill="#00d2ff" opacity=".7" />
          </g>

          <polyline
            points="180,154 215,134 250,140 280,96 315,82 355,42"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${id}-glow)`}
          />

          {[[180, 154], [215, 134], [250, 140], [280, 96], [315, 82], [355, 42]].map(([x, y], idx) => (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="4.5"
              fill="#040409"
              stroke={idx % 2 === 0 ? "#00d2ff" : "#ff003c"}
              strokeWidth="2.2"
            />
          ))}

          <text x="355" y="32" textAnchor="end" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#00d2ff">
            y = f(x) · 85% Acc
          </text>
          <text x="355" y="196" textAnchor="end" fontFamily="monospace" fontSize="10" fill="#ff003c">
            [ AWS FLASK REST API · 99% UPTIME ]
          </text>
        </g>
      )}

      {/* Project 4: Cloud REST API Hub */}
      {kind === "api" && (
        <g>
          {/* Server Nodes & Network Architecture */}
          <g transform="translate(200 110)">
            <circle r="44" fill="#070919" stroke={`url(#${id})`} strokeWidth="2.5" />
            <text x="0" y="4" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#00d2ff">
              REST_API
            </text>
            <text x="0" y="18" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ff003c">
              JWT AUTH
            </text>

            {/* Satellite client nodes */}
            {[-120, 0, 120].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = Math.cos(rad) * 90;
              const y = Math.sin(rad) * 60;
              return (
                <g key={i}>
                  <line x1="0" y1="0" x2={x} y2={y} stroke="#00d2ff" strokeOpacity="0.4" strokeDasharray="3 3" />
                  <circle cx={x} cy={y} r="16" fill="#0b0e22" stroke={i === 1 ? "#00d2ff" : "#ff003c"} strokeWidth="2" />
                  <circle cx={x} cy={y} r="4" fill="#cbd5e1" />
                </g>
              );
            })}
          </g>

          <text x="200" y="200" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#00d2ff">
            [ NODE.JS · EXPRESS · MONGODB ]
          </text>
        </g>
      )}

      {/* Project 5: Computer Vision Analytics */}
      {kind === "vision" && (
        <g>
          <rect x="50" y="35" width="300" height="150" rx="10" fill="#060918" stroke={`url(#${id})`} strokeWidth="1.5" />
          
          <rect x="80" y="60" width="85" height="100" rx="4" fill="none" stroke="#00d2ff" strokeWidth="2" strokeDasharray="4 2" />
          <text x="85" y="74" fontFamily="monospace" fontSize="8" fill="#00d2ff">OBJ_01: 98%</text>

          <rect x="220" y="75" width="100" height="80" rx="4" fill="none" stroke="#ff003c" strokeWidth="2" strokeDasharray="4 2" />
          <text x="225" y="89" fontFamily="monospace" fontSize="8" fill="#ff003c">MOTION: ACTIVE</text>

          <path d="M50 110 H350" stroke="#00d2ff" strokeOpacity="0.3" />
          <path d="M200 35 V185" stroke="#ff003c" strokeOpacity="0.3" />

          <text x="200" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#00d2ff">
            [ 60 FPS REAL-TIME CV PIPELINE ]
          </text>
        </g>
      )}
    </svg>
  );
}
