import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { personalInfo, stats } from '../data/portfolioData'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiOutlineMail, HiOutlineDownload, HiOutlineArrowRight } from 'react-icons/hi'
const SPRING = { type: 'spring', stiffness: 100, damping: 20 }

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SPRING },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

function useTyping(words, { typeSpeed = 80, deleteSpeed = 40, holdMs = 1400 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (!words?.length) return
    const current = words[index % words.length]

    if (phase === 'typing') {
      if (text.length < current.length) {
        const id = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
        return () => clearTimeout(id)
      }
      const id = setTimeout(() => setPhase('deleting'), holdMs)
      return () => clearTimeout(id)
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const id = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
        return () => clearTimeout(id)
      }
      setIndex((i) => i + 1)
      setPhase('typing')
    }
  }, [text, index, phase, words, typeSpeed, deleteSpeed, holdMs])

  return text
}

function MagneticButton({ as = 'a', children, className = '', strength = 18, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set((dx / rect.width) * strength)
    y.set((dy / rect.height) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const Comp = motion[as] ?? motion.a
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}

function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }
  const onLeave = () => { mx.set(-200); my.set(-200) }

  const background = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(380px circle at ${x}px ${y}px, rgba(236,72,153,0.18), transparent 60%)`
  )

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  )
}

const TECH_MARQUEE = [
  'HR Admin', 'Tuyển dụng', 'Hành chính', 'Pháp lý', 'Hợp đồng',
  'Luật Kinh Tế', 'Office Management', 'Onboard', 'Microsoft Office',
  'Quản lý tài sản', 'Truyền thông nội bộ', 'BHXH/BHYT', 'Chấm công',
  'Nghiên cứu khoa học', 'English B2',
]

function MarqueeRow() {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE]
  return (
    <div className="relative overflow-hidden mask-fade-x">
      <motion.div
        className="flex gap-3 whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-medium tracking-wide text-slate-300"
            style={{
              borderColor: 'var(--border-soft)',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <span className="w-1 h-1 rounded-full bg-accent-violet/80" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const typed = useTyping(personalInfo.typingTexts)

  const handleDownloadCV = (e) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = personalInfo.cvUrl
    link.download = personalInfo.cvUrl.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="hero"
      className="relative section-padding pt-24 md:pt-28 min-h-[100dvh] flex items-center"
    >
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 md:gap-16 items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-7"
        >
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-wide text-slate-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-soft)',
              }}
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              Sẵn sàng cho vị trí HR Admin
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.32em] text-accent-violet/90 typing-cursor min-h-[1rem]"
          >
            {typed}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            data-hero-headline
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter leading-[0.95] will-change-transform"
          >
            <span className="block text-slate-100">Vũ Thị Hồng</span>
            <span className="block gradient-text-shine bg-clip-text text-transparent pb-1">
              Nhung.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            data-hero-subline
            className="text-base sm:text-lg text-slate-300/90 max-w-[58ch] leading-relaxed"
          >
            {personalInfo.objective}
          </motion.p>

          <motion.div
            variants={fadeUp}
            data-hero-cta
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <MagneticButton
              href={personalInfo.cvUrl}
              onClick={handleDownloadCV}
              className="btn-primary group/cta"
              download
              whileTap={{ scale: 0.97 }}
            >
              <HiOutlineDownload className="w-4 h-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5" />
              <span>Download CV</span>
              <HiOutlineArrowRight className="w-4 h-4 -ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover/cta:opacity-100 group-hover/cta:translate-x-0" />
            </MagneticButton>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="btn-outline"
              whileTap={{ scale: 0.97 }}
            >
              <HiOutlineMail className="w-4 h-4" />
              <span>Contact via Email</span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            data-hero-socials
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            {[
              { Icon: FaPhoneAlt, label: personalInfo.phone, href: `tel:${personalInfo.phone}`, mono: true, ext: false },
            ].map(({ Icon, label, href, mono, ext }) => (
              <motion.a
                key={label}
                href={href}
                {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="group inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--aurora-1) 0%, var(--aurora-3) 60%, var(--aurora-2) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  <Icon className="w-2.5 h-2.5" />
                </span>
                <span
                  className={`text-xs text-slate-200 group-hover:text-white transition-colors ${
                    mono ? 'font-mono tracking-wide' : 'font-medium'
                  }`}
                >
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            data-hero-stats
            className="relative pt-7"
          >
            {/* Aurora top accent line */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--aurora-1), var(--aurora-3), var(--aurora-2), transparent)',
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((item, i) => {
                const tint = [
                  { dot: 'var(--aurora-4)', glow: 'rgba(190,24,93,0.22)' },
                  { dot: 'var(--aurora-1)', glow: 'rgba(219,39,119,0.22)' },
                  { dot: 'var(--aurora-3)', glow: 'rgba(244,63,94,0.22)' },
                  { dot: 'var(--aurora-2)', glow: 'rgba(34,211,238,0.22)' },
                ][i]
                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3 }}
                    transition={SPRING}
                    className="group relative rounded-2xl p-4 overflow-hidden"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-soft)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${tint.glow}, transparent 75%)`,
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -top-px left-4 right-4 h-px opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${tint.dot}, transparent)`,
                      }}
                    />

                    <div className="relative flex items-center justify-between mb-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: tint.dot,
                          boxShadow: `0 0 10px ${tint.dot}`,
                        }}
                      />
                      <span className="font-mono text-[9px] text-slate-500 tracking-[0.2em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="relative text-3xl sm:text-4xl font-bold tracking-tighter leading-none mb-2 gradient-text-shine bg-clip-text text-transparent">
                      {item.value}
                    </div>

                    <div className="relative text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-tight">
                      {item.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
          data-hero-card
          className="relative will-change-transform"
        >
          <div
            aria-hidden="true"
            data-hero-card-glow
            className="absolute -inset-8 rounded-[2.5rem] opacity-50 blur-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(60% 50% at 30% 30%, rgba(219,39,119,0.45), transparent), radial-gradient(50% 50% at 70% 70%, rgba(244,63,94,0.28), transparent)',
            }}
          />

          <SpotlightCard className="glass-card relative p-7 sm:p-8 rounded-[1.75rem]">
            <div className="absolute inset-0 pointer-events-none rounded-[1.75rem]"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            />

            <div className="relative flex flex-col items-center gap-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-[2px] rounded-[1.6rem] bg-gradient-to-br from-accent-indigo/70 via-accent-violet/60 to-accent-pink/60 pointer-events-none"
                />
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-3xl p-[2px] bg-gradient-to-br from-accent-indigo/80 via-accent-violet/70 to-accent-pink/70">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    width={176}
                    height={176}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full rounded-[1.35rem] object-cover ring-1 ring-white/10"
                  />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-[10px] font-semibold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-300/30 backdrop-blur-sm">
                  Available
                </div>
              </div>

              <div className="text-center space-y-0.5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Based in
                </p>
                <p className="text-sm font-medium text-slate-200">
                  {personalInfo.address}
                </p>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2"
                style={{ borderTop: '1px solid var(--border-soft)' }}
              >
                <div className="px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">
                    Hành chính
                  </p>
                  <p className="font-medium text-slate-200">Văn phòng · Nhân sự · Pháp lý</p>
                </div>
                <div className="px-3 py-3 border-l" style={{ borderColor: 'var(--border-soft)' }}>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">
                    Chuyên ngành
                  </p>
                  <p className="font-medium text-slate-200">Luật Kinh Tế · Tài Chính</p>
                </div>
                <div className="col-span-2 px-3 py-3 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">
                    Định hướng
                  </p>
                  <p className="font-medium text-slate-200 leading-relaxed">
                    Quản lý văn phòng, hỗ trợ tuyển dụng, soạn thảo hợp đồng, nghiên cứu pháp luật.
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, ...SPRING }}
        data-hero-marquee
        className="absolute left-0 right-0 bottom-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <MarqueeRow />
      </motion.div>
    </section>
  )
}
