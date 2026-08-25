/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050310',
          900: '#070318',
          800: '#0c0726',
          700: '#160e3a',
          600: '#1f1454',
        },
        accent: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#22d3ee',
          fuchsia: '#d946ef',
          rose: '#fb7185',
          amber: '#fbbf24',
        },
        aurora: {
          1: '#7c3aed',
          2: '#06b6d4',
          3: '#d946ef',
          4: '#4f46e5',
          5: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'typing-cursor': 'blink 1s step-end infinite',
        'aurora-drift': 'auroraDrift 22s ease-in-out infinite',
        'shimmer': 'shimmer 2.6s linear infinite',
        'waterfall-slow': 'waterfall 18s linear infinite',
        'waterfall-mid':  'waterfall 14s linear infinite',
        'waterfall-fast': 'waterfall 11s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.6)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        auroraDrift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.7' },
          '33%':      { transform: 'translate3d(40px,30px,0) scale(1.08)', opacity: '0.85' },
          '66%':      { transform: 'translate3d(-30px,60px,0) scale(0.94)', opacity: '0.6' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        waterfall: {
          '0%':   { transform: 'translateY(-110%)', opacity: '0' },
          '12%':  { opacity: '1' },
          '88%':  { opacity: '1' },
          '100%': { transform: 'translateY(110%)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora':
          'linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #d946ef 55%, #ec4899 75%, #22d3ee 100%)',
        'aurora-soft':
          'linear-gradient(135deg, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.6) 35%, rgba(217,70,239,0.5) 65%, rgba(34,211,238,0.5) 100%)',
      },
    },
  },
  plugins: [],
}
