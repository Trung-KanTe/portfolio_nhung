import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineDocumentText, HiX } from 'react-icons/hi'
import { HiOutlineTrophy } from 'react-icons/hi2'
import { education, certification, courses, awards } from '../data/portfolioData'
import { WaterfallContainer, WaterfallItem, SectionEyebrow } from './WaterfallReveal'

export default function Education() {
  const [openImage, setOpenImage] = useState(null)

  useEffect(() => {
    if (!openImage) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenImage(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openImage])

  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <WaterfallContainer className="mb-12 max-w-2xl" amount={0.4}>
          <WaterfallItem>
            <SectionEyebrow index={5} label="Học vấn & Chứng chỉ" />
            <h2 className="section-title text-slate-100">
              Nền tảng &{' '}
              <span className="gradient-text-shine bg-clip-text text-transparent">
                phát triển liên tục.
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed mt-4">
              Học vấn, chứng chỉ ngoại ngữ, tin học và các khóa đào tạo
              hỗ trợ sự nghiệp hành chính - nhân sự.
            </p>
          </WaterfallItem>
        </WaterfallContainer>

        <WaterfallContainer
          className="space-y-5"
          amount={0.15}
          staggerChildren={0.1}
        >
          {/* Degree */}
          <WaterfallItem className="glass-card-hover p-6 md:p-7">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-semibold text-slate-100">{education.degree}</p>
              <span className="font-mono text-[10px] text-accent-violet/60 tracking-wider">
                01
              </span>
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, var(--aurora-1), var(--aurora-3))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {education.school}
            </p>
            <p className="text-xs text-slate-400 font-mono mb-4">{education.period}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className="px-3 py-1 rounded-full font-mono"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                  color: 'var(--text-secondary)',
                }}
              >
                GPA · {education.gpa}
              </span>
              <span
                className="px-3 py-1 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(124,58,237,0.18), rgba(217,70,239,0.18))',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text-strong)',
                }}
              >
                {education.honor}
              </span>
            </div>
          </WaterfallItem>

          {/* Awards */}
          {awards && awards.length > 0 && (
            <>
              <WaterfallItem>
                <p className="text-[13px] uppercase tracking-[0.22em] text-slate-400 mt-4 mb-2">
                  Awards & Honors
                </p>
              </WaterfallItem>
              {awards.map((aw, idx) => (
                <WaterfallItem
                  key={aw.name}
                  className="glass-card-hover p-6 md:p-7 flex items-start gap-4"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(251,191,36,0.06), rgba(217,70,239,0.04))',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(251,191,36,0.18), rgba(217,70,239,0.18))',
                      border: '1px solid rgba(251,191,36,0.35)',
                      color: '#fbbf24',
                    }}
                  >
                    <HiOutlineTrophy className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="text-sm font-semibold text-slate-100">{aw.name}</p>
                      <span className="font-mono text-[10px] text-accent-violet/60 tracking-wider">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 mb-2">{aw.date}</p>
                    {aw.detail && (
                      <p className="text-sm text-slate-300 leading-relaxed">{aw.detail}</p>
                    )}
                  </div>
                </WaterfallItem>
              ))}
            </>
          )}

          {/* Language certification */}
          <WaterfallItem className="glass-card-hover p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-slate-100">
                  {certification.name}
                </p>
                <span className="font-mono text-[10px] text-accent-violet/60 tracking-wider">
                  02
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{certification.date}</p>
            </div>
            <p className="text-xs text-slate-300 font-mono">{certification.score}</p>
          </WaterfallItem>

          {/* Courses & Training */}
          {courses.length > 0 && (
            <>
              <WaterfallItem>
                <p className="text-[13px] uppercase tracking-[0.22em] text-slate-400 mt-4 mb-2">
                  Courses & Training
                </p>
              </WaterfallItem>
              {courses.map((course) => (
                <WaterfallItem key={course.name} className="glass-card-hover p-6 md:p-7">
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    {course.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setOpenImage(course)}
                        aria-label={`View ${course.name} certificate`}
                        className="group relative shrink-0 w-full md:w-56 rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet/60 transition-all duration-300"
                        style={{ border: '1px solid var(--border-soft)' }}
                      >
                        <img
                          src={course.imageUrl}
                          alt={course.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-32 md:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute bottom-2 left-2 right-2 inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-white px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/10">
                          <HiOutlineDocumentText className="w-3.5 h-3.5" />
                          View certificate
                        </span>
                      </button>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-100 mb-1">
                        {course.name}
                      </p>
                      <p
                        className="text-sm font-medium mb-1"
                        style={{
                          backgroundImage:
                            'linear-gradient(90deg, var(--aurora-1), var(--aurora-3))',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        {course.issuer}
                      </p>
                      <p className="text-xs text-slate-400 font-mono mb-3">
                        {course.date}
                        {course.duration ? ` · ${course.duration}` : ''}
                      </p>
                      {course.description && (
                        <p className="text-sm text-slate-300 leading-relaxed mb-3">
                          {course.description}
                        </p>
                      )}
                      {course.certificateId && (
                        <p className="text-[13px] text-slate-500 font-mono">
                          ID · {course.certificateId}
                        </p>
                      )}
                    </div>
                  </div>
                </WaterfallItem>
              ))}
            </>
          )}
        </WaterfallContainer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            key="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${openImage.name} certificate`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              key="cert-content"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-3 px-1">
                <div className="min-w-0">
                  <p className="text-sm text-slate-200 font-medium truncate">
                    {openImage.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {openImage.issuer} · {openImage.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenImage(null)}
                  aria-label="Close certificate viewer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet/60 shrink-0"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div
                className="overflow-auto rounded-xl bg-black/40"
                style={{ border: '1px solid var(--border-mid)' }}
              >
                <img
                  src={openImage.imageUrl}
                  alt={openImage.imageAlt}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex justify-end mt-3 px-1">
                <a
                  href={openImage.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-300 hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  Open original in new tab
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
