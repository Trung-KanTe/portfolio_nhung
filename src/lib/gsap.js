import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined' && !gsap.core.globals().__portfolioInit) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out' })
  ScrollTrigger.config({ ignoreMobileResize: true })
  gsap.core.globals('__portfolioInit', true)
}

export { gsap, ScrollTrigger }
