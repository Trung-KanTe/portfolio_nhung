import { memo } from 'react'

// ── Wide cascading water sheets — the main "waterfall" feel ──
const SHEETS = [
  { left: '3%',  width: 120, blur: 38, delay: 0,    dur: 10, color: 'rgba(139,92,246,0.20)' },
  { left: '11%', width: 90,  blur: 30, delay: -3,   dur: 12, color: 'rgba(99,102,241,0.16)' },
  { left: '20%', width: 140, blur: 44, delay: -6,   dur: 9,  color: 'rgba(34,211,238,0.15)' },
  { left: '32%', width: 100, blur: 34, delay: -1.5, dur: 11, color: 'rgba(167,139,250,0.20)' },
  { left: '43%', width: 160, blur: 50, delay: -4,   dur: 13, color: 'rgba(217,70,239,0.15)' },
  { left: '55%', width: 110, blur: 36, delay: -2,   dur: 10, color: 'rgba(139,92,246,0.18)' },
  { left: '66%', width: 130, blur: 42, delay: -7,   dur: 12, color: 'rgba(34,211,238,0.16)' },
  { left: '76%', width: 95,  blur: 32, delay: -5,   dur: 9,  color: 'rgba(99,102,241,0.18)' },
  { left: '85%', width: 120, blur: 40, delay: -2.5, dur: 11, color: 'rgba(236,72,153,0.14)' },
  { left: '94%', width: 80,  blur: 28, delay: -6.5, dur: 10, color: 'rgba(167,139,250,0.18)' },
]

// ── Bright sharp sparkle streaks — foreground "splash" highlight ──
const SPARKLES = [
  { left: '8%',  delay: 0,    dur: 6 },
  { left: '17%', delay: -1.5, dur: 7 },
  { left: '26%', delay: -3,   dur: 5.5 },
  { left: '38%', delay: -2,   dur: 6.5 },
  { left: '49%', delay: -4,   dur: 5 },
  { left: '61%', delay: -0.8, dur: 7 },
  { left: '73%', delay: -3.5, dur: 6 },
  { left: '82%', delay: -1.2, dur: 5.5 },
  { left: '90%', delay: -2.8, dur: 6.5 },
]

// ── Snowflakes (drifting down with sway) ──
const SNOWFLAKES = Array.from({ length: 40 }).map((_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = (s) => Math.abs((Math.sin(s) * 10000) % 1)
  const tints = [
    'rgba(255,255,255,0.95)',
    'rgba(255,255,255,0.85)',
    'rgba(255,255,255,0.75)',
    'rgba(226,232,255,0.85)',
    'rgba(199,210,254,0.8)',
  ]
  return {
    left: `${rand(seed + 1) * 100}%`,
    size: 7 + rand(seed + 2) * 9,
    delay: -(rand(seed + 3) * 18),
    dur: 14 + rand(seed + 4) * 14,
    drift: -55 + rand(seed + 5) * 110,
    swayDur: 3.5 + rand(seed + 6) * 3.5,
    color: tints[i % tints.length],
  }
})

function Sheet({ left, width, blur, delay, dur, color }) {
  return (
    <div
      className="absolute top-0 will-change-transform"
      style={{
        left,
        width: `${width}px`,
        height: '85vh',
        background: `linear-gradient(to bottom,
          transparent 0%,
          ${color} 18%,
          ${color} 82%,
          transparent 100%)`,
        filter: `blur(${blur}px)`,
        mixBlendMode: 'screen',
        animation: `waterfallSheet ${dur}s linear ${delay}s infinite`,
      }}
    />
  )
}

function Sparkle({ left, delay, dur }) {
  return (
    <div
      className="absolute top-0 will-change-transform"
      style={{
        left,
        width: '1px',
        height: '32vh',
        background:
          'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
        filter: 'blur(0.4px)',
        animation: `waterfallSheet ${dur}s linear ${delay}s infinite`,
      }}
    />
  )
}

// 6-arm crystal snowflake. Uses SVG so it scales perfectly at any size
// and stays crisp without raster artifacts.
const SNOWFLAKE_AXES = [0, 60, 120]
const SNOWFLAKE_TIPS = [0, 60, 120, 180, 240, 300]

function SnowflakeCrystal({ size, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-10 -10 20 20"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <g
        stroke={color}
        strokeLinecap="round"
        fill="none"
      >
        {/* 3 crossing axes = 6 arms */}
        {SNOWFLAKE_AXES.map((a) => (
          <line
            key={`axis-${a}`}
            x1="0" y1="-9" x2="0" y2="9"
            strokeWidth="1.5"
            transform={`rotate(${a})`}
          />
        ))}
        {/* V-tips on each arm (visible at larger sizes) */}
        {SNOWFLAKE_TIPS.map((a) => (
          <g key={`tip-${a}`} transform={`rotate(${a})`}>
            <line x1="0" y1="-7" x2="-1.7" y2="-5.3" strokeWidth="1.2" />
            <line x1="0" y1="-7" x2="1.7" y2="-5.3" strokeWidth="1.2" />
          </g>
        ))}
        {/* Tiny inner hexagon for crystal centerpiece */}
        <polygon
          points="0,-2.2 1.905,-1.1 1.905,1.1 0,2.2 -1.905,1.1 -1.905,-1.1"
          fill={color}
          stroke="none"
          opacity="0.55"
        />
      </g>
    </svg>
  )
}

function Snowflake({ left, size, delay, dur, drift, swayDur, color }) {
  // Glow color: extract rgba alpha → soften for drop-shadow
  const glow = color.replace(/[\d.]+\)$/, '0.55)')
  return (
    <div
      className="absolute top-0 will-change-transform"
      style={{
        left,
        '--drift': `${drift}px`,
        animation: `snowfall ${dur}s linear ${delay}s infinite`,
      }}
    >
      <div
        className="will-change-transform"
        style={{
          filter: `drop-shadow(0 0 ${size * 0.9}px ${glow})`,
          animation: `snowSway ${swayDur}s ease-in-out ${delay / 2}s infinite alternate`,
        }}
      >
        <SnowflakeCrystal size={size} color={color} />
      </div>
    </div>
  )
}

function WaterfallBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Static aurora atmosphere (drifting blobs - depth) */}
      <div
        className="absolute -top-40 -left-32 w-[44vmax] h-[44vmax] rounded-full mix-blend-screen will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.28), transparent 60%)',
          filter: 'blur(110px)',
          animation: 'auroraDrift 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[40vmax] h-[40vmax] rounded-full mix-blend-screen will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.20), transparent 60%)',
          filter: 'blur(120px)',
          animation: 'auroraDrift 28s ease-in-out -7s infinite',
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[42vmax] h-[42vmax] rounded-full mix-blend-screen will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(217,70,239,0.18), transparent 60%)',
          filter: 'blur(120px)',
          animation: 'auroraDrift 26s ease-in-out -3s infinite',
        }}
      />

      {/* MAIN: Wide cascading water sheets */}
      <div className="absolute inset-0 mask-fade-y">
        {SHEETS.map((s, i) => (
          <Sheet key={`sheet-${i}`} {...s} />
        ))}
      </div>

      {/* Sharp white sparkles (water highlight catching light) */}
      <div className="absolute inset-0 mask-fade-y opacity-80">
        {SPARKLES.map((s, i) => (
          <Sparkle key={`sparkle-${i}`} {...s} />
        ))}
      </div>

      {/* Falling snowflakes */}
      <div className="absolute inset-0">
        {SNOWFLAKES.map((d, i) => (
          <Snowflake key={`snow-${i}`} {...d} />
        ))}
      </div>

      {/* Mist at the bottom — water hits the floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(167,139,250,0.18) 0%, rgba(34,211,238,0.08) 30%, transparent 70%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Vignette + center darkening to ground content readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(7,3,24,0.35) 0%, rgba(7,3,24,0.55) 60%, rgba(7,3,24,0.75) 100%)',
        }}
      />
    </div>
  )
}

export default memo(WaterfallBackground)
