import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { HiOutlineArrowUpRight, HiOutlineLockClosed, HiOutlineTrophy } from 'react-icons/hi2'
import { projects } from '../data/portfolioData'
import { SectionEyebrow } from './WaterfallReveal'
import { useGsapMatchMedia } from '../hooks/useGsap'
import { gsap, ScrollTrigger } from '../lib/gsap'

const SPRING = { type: 'spring', stiffness: 110, damping: 22 }

function ProjectCard({ project, index, layout }) {
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

  const spotlight = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}px ${y}px, rgba(236,72,153,0.16), transparent 55%)`
  )
  const borderGlow = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(180px circle at ${x}px ${y}px, rgba(236,72,153,0.55), transparent 70%)`
  )

  const number = String(index + 1).padStart(2, '0')

  const sizing =
    layout === 'horizontal'
      ? 'w-[78vw] sm:w-[58vw] md:w-[44vw] lg:w-[36vw] xl:w-[32vw] shrink-0 min-h-[60vh]'
      : ''

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -4 }}
      transition={SPRING}
      className={`group relative rounded-[1.5rem] p-px overflow-hidden ${sizing}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: borderGlow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        className="relative h-full rounded-[calc(1.5rem-1px)] p-6 sm:p-7 flex flex-col"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-soft)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 42px -28px rgba(0,0,0,0.55)',
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-4 mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] font-mono text-accent-violet/70 tracking-wider">
              {number}
            </span>
            {project.confidential && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-slate-400"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                <HiOutlineLockClosed className="w-2.5 h-2.5" />
                NDA
              </span>
            )}
          </div>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-accent-violet transition-colors group/link"
              aria-label={`View ${project.title} source code`}
            >
              <span>Code</span>
              <HiOutlineArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-[11px] text-slate-500">Private</span>
          )}
        </div>

        <div className="relative flex-1 flex flex-col">
          <h3 className="font-semibold tracking-tight text-slate-100 mb-1.5 text-xl sm:text-2xl">
            {project.title}
          </h3>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-4">
            {project.subtitle}
          </p>

          <p className="text-slate-300/85 leading-relaxed flex-1 text-sm sm:text-base max-w-[58ch]">
            {project.description}
          </p>

          {project.award && (
            <div
              className="mt-4 inline-flex items-start gap-2 px-3 py-2 rounded-xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(244,63,94,0.10))',
                border: '1px solid rgba(251,191,36,0.35)',
              }}
            >
              <HiOutlineTrophy
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: '#fbbf24' }}
              />
              <span className="text-[11px] font-medium leading-snug" style={{ color: '#fde68a' }}>
                {project.award}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-5 pt-5"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide text-slate-300"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const scope = useGsapMatchMedia(({ conditions }) => {
    const { isDesktop } = conditions
    if (!isDesktop) return

    const track = document.querySelector('[data-projects-track]')
    const section = document.querySelector('[data-projects-section]')
    if (!track || !section) return

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 64)

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 320}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    // progress bar tied to the same trigger
    const bar = section.querySelector('[data-projects-progress]')
    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth + 320}`,
            scrub: true,
          },
        },
      )
    }

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={scope}
      data-projects-section
      className="relative section-padding md:py-0 md:min-h-[100dvh] md:flex md:flex-col md:justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={SPRING}
          className="flex items-end justify-between gap-6 mb-8 md:mb-10"
        >
          <div className="max-w-2xl">
            <SectionEyebrow index={3} label="Nghiên cứu & Xuất bản" />
            <h2 className="section-title text-slate-100">
              Bài viết đã <span className="gradient-text-shine bg-clip-text text-transparent">xuất bản.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mt-4 leading-relaxed">
              Các công trình nghiên cứu khoa học đã được xuất bản tại các NXB và tạp chí uy tín. <span className="hidden md:inline text-slate-500">Kéo để xem thêm →</span>
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2 pb-1">
            <span className="font-mono text-[11px] text-slate-500 tracking-wider">
              {String(projects.length).padStart(2, '0')} projects
            </span>
            <div className="relative h-px w-32 overflow-hidden bg-white/5 rounded-full">
              <div
                data-projects-progress
                className="absolute inset-0 bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-pink origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop: horizontal scroll-hijack track */}
      <div className="hidden md:block">
        <div className="pl-4 sm:pl-6 lg:pl-8">
          <div
            data-projects-track
            className="flex gap-5 will-change-transform pr-[20vw]"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                layout="horizontal"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-2">
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              layout="stack"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
