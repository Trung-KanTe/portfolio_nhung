import { personalInfo } from '../data/portfolioData'
import { HiOutlineMail } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer
      className="relative backdrop-blur-xl"
      style={{
        backgroundColor: 'var(--bg-app-80)',
        borderTop: '1px solid var(--border-soft)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--aurora-1), var(--aurora-3), var(--aurora-2), transparent)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-white transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-soft)',
            }}
          >
            <HiOutlineMail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
