import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 18,
    mass: 0.4,
  })

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 right-3 z-40 w-[2px] h-screen rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'rgba(167,139,250,0.08)',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY, transformOrigin: 'top' }}
        className="fixed top-0 right-3 z-40 w-[2px] h-screen rounded-full pointer-events-none hidden md:block will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'linear-gradient(to bottom, var(--aurora-1), var(--aurora-3) 45%, var(--aurora-2))',
            boxShadow: '0 0 14px rgba(124,58,237,0.55)',
          }}
        />
      </motion.div>
    </>
  )
}
