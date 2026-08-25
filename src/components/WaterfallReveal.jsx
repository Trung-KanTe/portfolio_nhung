import { motion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 110, damping: 22 }

export const waterfallStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const waterfallDrop = {
  hidden: { opacity: 0, y: -36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: SPRING,
  },
}

export function WaterfallContainer({
  children,
  amount = 0.2,
  className = '',
  as = 'div',
  once = true,
  staggerChildren = 0.08,
  delayChildren = 0.05,
}) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Comp>
  )
}

export function WaterfallItem({ children, className = '', as = 'div', custom, style }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp variants={waterfallDrop} className={className} custom={custom} style={style}>
      {children}
    </Comp>
  )
}

export function SectionEyebrow({ index, label }) {
  const num = String(index).padStart(2, '0')
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow-num">/ {num}</span>
      <span className="section-eyebrow-rule" />
      <span className="section-eyebrow-label">{label}</span>
    </div>
  )
}
