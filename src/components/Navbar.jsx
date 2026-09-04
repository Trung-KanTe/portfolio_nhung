import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import useTheme from '../hooks/useTheme'
import { useLenis } from '../lib/LenisProvider'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggleTheme } = useTheme()
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (!target) return
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/80 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" onClick={(e) => {
              e.preventDefault()
              if (lenis) lenis.scrollTo(0, { duration: 1.4 })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg transition-all duration-300 group-hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, #db2777 0%, #ec4899 35%, #f43f5e 70%, #22d3ee 100%)',
                backgroundSize: '180% 180%',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px -8px rgba(219,39,119,0.4)',
              }}
            >
              N
            </div>
            <span className="hidden sm:block text-lg font-semibold text-white tracking-tight">
              Nhung
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--aurora-1), var(--aurora-3))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                .
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ name, href }) => (
              <a key={name} href={href} onClick={(e) => handleClick(e, href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === href.slice(1)
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}>
                {name}
                {activeSection === href.slice(1) && (
                  <motion.div layoutId="activeNav"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Chuyển sang Dark' : 'Chuyển sang Light'}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="inline-flex"
              >
                {theme === 'light' ? (
                  <HiOutlineMoon className="w-5 h-5" />
                ) : (
                  <HiOutlineSun className="w-5 h-5" />
                )}
              </motion.span>
            </button>

            {/* Mobile Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ name, href }) => (
                <a key={name} href={href} onClick={(e) => handleClick(e, href)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === href.slice(1)
                      ? 'text-white bg-white/[0.06]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}>
                  {name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
