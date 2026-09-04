import { memo } from 'react'
import usePerfTier from '../hooks/usePerfTier'

// Reduced from 10 sheets to 6
const SHEETS = [
  { left: '5%',  width: 120, blur: 30, delay: 0,    dur: 10, color: 'rgba(236,72,153,0.13)' },
  { left: '20%', width: 140, blur: 34, delay: -6,   dur: 9,  color: 'rgba(34,211,238,0.10)' },
  { left: '38%', width: 100, blur: 28, delay: -1.5, dur: 11, color: 'rgba(244,114,182,0.13)' },
  { left: '55%', width: 110, blur: 30, delay: -2,   dur: 10, color: 'rgba(236,72,153,0.12)' },
  { left: '72%', width: 130, blur: 34, delay: -7,   dur: 12, color: 'rgba(34,211,238,0.11)' },
  { left: '88%', width: 95,  blur: 26, delay: -5,   dur: 9,  color: 'rgba(244,63,94,0.12)' },
]

// Reduced from 9 sparkles to 5
const SPARKLES = [
  { left: '12%', delay: 0,    dur: 6 },
  { left: '32%', delay: -2,   dur: 7 },
  { left: '52%', delay: -4,   dur: 5.5 },
  { left: '72%', delay: -1.5, dur: 6.5 },
  { left: '88%', delay: -3,   dur: 5 },
]

// Reduced from 40 snowflakes to 10
const SNOWFLAKES = Array.from({ length: 10 }).map((_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = (s) => Math.abs((Math.sin(s) * 10000) % 1)
  const tints = [
    'rgba(255,255,255,0.90)',
    'rgba(255,255,255,0.80)',
    'rgba(226,232,255,0.85)',
  ]
  return {
    left: `${rand(seed + 1) * 100}%`,
    size: 8 + rand(seed + 2) * 7,
    delay: -(rand(seed + 3) * 18),
    dur: 16 + rand(seed + 4) * 12,
    drift: -45 + rand(seed + 5) * 90,
    swayDur: 4 + rand(seed + 6) * 3,
    color: tints[i % tints.length],
  }
})

function Sheet({ left, width, blur, delay, dur, color }) {
  return (
    <div
      className="absolute top-0"
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
        willChange: 'transform',
      }}
    />
  )
}

function Sparkle({ left, delay, dur }) {
  return (
    <div
      className="absolute top-0"
      style={{
        left,
        width: '1px',
        height: '32vh',
        background:
          'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
        filter: 'blur(0.4px)',
        animation: `waterfallSheet ${dur}s linear ${delay}s infinite`,
        willChange: 'transform',
      }}
    />
  )
}

// Simplified snowflake - use CSS circle instead of complex SVG
function Snowflake({ left, size, delay, dur, drift, swayDur, color }) {
  return (
    <div
      className="absolute top-0"
      style={{
        left,
        '--drift': `${drift}px`,
        animation: `snowfall ${dur}s linear ${delay}s infinite`,
        willChange: 'transform',
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 ${size * 0.7}px ${color}`,
          animation: `snowSway ${swayDur}s ease-in-out ${delay / 2}s infinite alternate`,
        }}
      />
    </div>
  )
}

/**
 * Lightweight static gradient used on low-power / reduced-motion devices.
 * No animation, no mix-blend, no per-node blur layers.
 */
function StaticBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(60% 50% at 20% 15%, rgba(219,39,119,0.16), transparent 60%),' +
          'radial-gradient(55% 55% at 85% 30%, rgba(34,211,238,0.10), transparent 60%),' +
          'radial-gradient(ellipse at center, rgba(7,3,24,0.35) 0%, rgba(7,3,24,0.7) 100%)',
      }}
    />
  )
}

function WaterfallBackground() {
  const tier = usePerfTier()

  // On mobile / weak devices / reduced-motion, skip the animated blur+blend
  // layers entirely and show a cheap static gradient instead.
  if (tier !== 'high') return <StaticBackdrop />

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Static aurora blobs - reduced to 2, smaller blur radius */}
      <div
        className="absolute -top-40 -left-32 w-[44vmax] h-[44vmax] rounded-full mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(219,39,119,0.20), transparent 60%)',
          filter: 'blur(80px)',
          animation: 'auroraDrift 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[40vmax] h-[40vmax] rounded-full mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 60%)',
          filter: 'blur(90px)',
          animation: 'auroraDrift 28s ease-in-out -7s infinite',
          willChange: 'transform',
        }}
      />

      {/* Water sheets */}
      <div className="absolute inset-0 mask-fade-y">
        {SHEETS.map((s, i) => (
          <Sheet key={`sheet-${i}`} {...s} />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 mask-fade-y opacity-80">
        {SPARKLES.map((s, i) => (
          <Sparkle key={`sparkle-${i}`} {...s} />
        ))}
      </div>

      {/* Snowflakes */}
      <div className="absolute inset-0">
        {SNOWFLAKES.map((d, i) => (
          <Snowflake key={`snow-${i}`} {...d} />
        ))}
      </div>

      {/* Mist at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(244,114,182,0.18) 0%, rgba(34,211,238,0.08) 30%, transparent 70%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Readability scrim — darkens the whole backdrop so body text stays legible
          against the colorful animated layers. Center is intentionally darker
          than a normal vignette because that is where the content sits. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(6,3,20,0.78) 0%, rgba(6,3,20,0.84) 55%, rgba(6,3,20,0.9) 100%)',
        }}
      />

      {/* Extra flat veil — a uniform darken pass on top of the vignette so the
          bright animated layers never wash out text near the edges either. */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(6, 3, 20, 0.28)' }}
      />
    </div>
  )
}

export default memo(WaterfallBackground)
