import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useGsap(setup, deps = []) {
  const scopeRef = useRef(null)

  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const ctx = gsap.context(setup, scopeRef.current)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}

export function useGsapMatchMedia(setup, deps = []) {
  const scopeRef = useRef(null)

  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
          isAny: '(prefers-reduced-motion: no-preference)',
        },
        (context) => setup(context, mm),
      )
    }, scopeRef.current)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}
