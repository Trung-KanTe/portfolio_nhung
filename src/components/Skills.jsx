import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { skillCategories } from '../data/portfolioData'
import { WaterfallContainer, WaterfallItem, SectionEyebrow } from './WaterfallReveal'

const SPANS = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-12',
]

function SkillCard({ category, index }) {
  const Icon = category.icon
  const ref = useRef(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  const onLeave = () => { mx.set(-200); my.set(-200) }

  const spotlight = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x}px ${y}px, rgba(236,72,153,0.16), transparent 55%)`
  )

  return (
    <WaterfallItem className={`${SPANS[index] ?? 'md:col-span-4'}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 110, damping: 22 }}
        className="group relative h-full glass-card-hover p-6 overflow-hidden rounded-[1.25rem]"
      >
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(219,39,119,0.18), rgba(244,63,94,0.18))',
                border: '1px solid var(--border-soft)',
                color: 'var(--aurora-1)',
              }}
            >
              {Icon && <Icon size={18} />}
            </div>
            <h3 className="text-sm font-semibold text-slate-100">{category.title}</h3>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-accent-violet/60">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="relative flex flex-wrap gap-1.5">
          {category.skills.map((skill) => {
            const SkillIcon = skill.icon
            return (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-slate-200 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                {SkillIcon && (
                  <SkillIcon size={12} style={{ color: 'var(--aurora-1)' }} />
                )}
                <span>{skill.name}</span>
              </span>
            )
          })}
        </div>
      </motion.div>
    </WaterfallItem>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding cv-auto">
      <div className="max-w-7xl mx-auto">
        <WaterfallContainer className="mb-12 max-w-2xl" amount={0.4}>
          <WaterfallItem>
            <SectionEyebrow index={4} label="Kỹ năng" />
            <h2 className="section-title text-slate-100">
              Năng lực <span className="gradient-text-shine bg-clip-text text-transparent">chuyên môn.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mt-4">
              Các kỹ năng hành chính, nhân sự, pháp lý và nghiên cứu mà tôi sử dụng
              hàng ngày trong công việc.
            </p>
          </WaterfallItem>
        </WaterfallContainer>

        <WaterfallContainer
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(180px,auto)]"
          amount={0.1}
          staggerChildren={0.07}
        >
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </WaterfallContainer>
      </div>
    </section>
  )
}
