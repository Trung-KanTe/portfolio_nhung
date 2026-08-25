import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { experiences } from '../data/portfolioData'
import { WaterfallContainer, WaterfallItem, SectionEyebrow } from './WaterfallReveal'
import { useGsapMatchMedia } from '../hooks/useGsap'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Experience() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  })
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  })
  const lineHeight = useTransform(lineProgress, [0, 1], ['0%', '100%'])

  // Sticky-stack: each timeline card pins briefly, the next one
  // glides up and stacks on top with a slight scale + brightness drop.
  const stackScope = useGsapMatchMedia(({ conditions }) => {
    const { isDesktop } = conditions
    if (!isDesktop) return

    const cards = gsap.utils.toArray('[data-exp-card]')
    if (!cards.length) return

    cards.forEach((card, i) => {
      // last card doesn't get dimmed
      if (i === cards.length - 1) return

      gsap.to(card, {
        scale: 0.94,
        y: -36,
        opacity: 0.45,
        filter: 'blur(2px)',
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 18%',
          end: () => `+=${card.offsetHeight * 0.9}`,
          scrub: 0.6,
        },
      })
    })

    return () => ScrollTrigger.refresh()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="max-w-6xl mx-auto">
        <WaterfallContainer className="mb-12 max-w-2xl" amount={0.4}>
          <WaterfallItem>
            <SectionEyebrow index={2} label="Kinh nghiệm" />
            <h2 className="section-title text-slate-100">
              Nơi tôi đã <span className="gradient-text-shine bg-clip-text text-transparent">làm việc.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mt-4">
              Kinh nghiệm thực tế trong lĩnh vực hành chính, nhân sự và pháp lý
              tại các doanh nghiệp.
            </p>
          </WaterfallItem>
        </WaterfallContainer>

        <div ref={stackScope} className="relative pl-14 md:pl-16">
          {/* Static rail */}
          <div className="timeline-line" />
          {/* Animated draw-on-scroll fill */}
          <motion.div
            aria-hidden="true"
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-[2px] origin-top will-change-transform pointer-events-none"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  'linear-gradient(to bottom, var(--aurora-1) 0%, var(--aurora-3) 50%, var(--aurora-2) 100%)',
                boxShadow: '0 0 18px rgba(124,58,237,0.55)',
              }}
            />
          </motion.div>

          <WaterfallContainer
            className="space-y-8 md:space-y-16"
            amount={0.1}
            staggerChildren={0.12}
          >
            {experiences.map((exp, i) => (
              <WaterfallItem key={exp.company} className="relative md:sticky md:top-24" custom={i}>
                <div className="timeline-dot" />

                <div
                  data-exp-card
                  className="glass-card-hover p-6 md:p-7 w-full origin-top will-change-transform"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-medium mt-0.5"
                        style={{
                          backgroundImage:
                            'linear-gradient(90deg, var(--aurora-1), var(--aurora-3))',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-400 font-mono">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  <div className="space-y-5 mt-5">
                    {exp.projects.map((project) => (
                      <div key={project.name}>
                        <p className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                          <span
                            className="inline-block w-1 h-1 rounded-full"
                            style={{ background: 'var(--aurora-3)' }}
                          />
                          {project.name}
                        </p>
                        <ul className="text-sm text-slate-400 space-y-1.5 pl-3">
                          {project.details.map((detail) => (
                            <li
                              key={detail}
                              className="relative leading-relaxed before:absolute before:left-[-10px] before:top-[10px] before:w-[3px] before:h-[3px] before:rounded-full before:bg-accent-violet/50"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-white/[0.06]">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </WaterfallItem>
            ))}
          </WaterfallContainer>
        </div>
      </div>
    </section>
  )
}
