import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const instance = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.4,
    })
    lenisRef.current = instance
    setLenis(instance)

    // Throttle ScrollTrigger updates to avoid excessive recalculations
    let ticking = false
    instance.on('scroll', () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          ScrollTrigger.update()
          ticking = false
        })
      }
    })

    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(500, 33) // allow lag smoothing to skip frames when behind

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
