import { useEffect, useState } from 'react'

/**
 * Detects a rough performance tier for the current device so heavy visual
 * effects (three.js terrain, large blur layers) can be scaled down or disabled.
 *
 * Returns one of:
 *   'high'   — desktop / capable device: full effects
 *   'low'    — mobile, few CPU cores, or coarse pointer: reduced effects
 *   'off'    — user prefers reduced motion: no continuous effects
 *
 * SSR-safe: returns 'high' until mounted, then re-evaluates on the client.
 */
export default function usePerfTier() {
  const [tier, setTier] = useState('high')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const evaluate = () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReduced) return 'off'

      // Coarse pointer usually means touch/mobile.
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches
      const narrow = window.matchMedia('(max-width: 768px)').matches
      const cores = navigator.hardwareConcurrency || 8
      const lowMemory =
        typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4

      if (coarsePointer || narrow || cores <= 4 || lowMemory) return 'low'
      return 'high'
    }

    setTier(evaluate())

    const mqs = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(max-width: 768px)'),
    ]
    const handler = () => setTier(evaluate())
    mqs.forEach((mq) => mq.addEventListener?.('change', handler))
    return () => mqs.forEach((mq) => mq.removeEventListener?.('change', handler))
  }, [])

  return tier
}
