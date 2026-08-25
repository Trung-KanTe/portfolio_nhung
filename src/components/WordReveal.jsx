import { useRef } from 'react'
import { useGsapMatchMedia } from '../hooks/useGsap'
import { gsap } from '../lib/gsap'

export default function WordReveal({ text, className = '', as: As = 'p', start = 'top 80%', end = 'top 35%' }) {
  const wordsRef = useRef([])

  const scope = useGsapMatchMedia(({ conditions }) => {
    const { isAny } = conditions
    if (!isAny) return
    const words = wordsRef.current.filter(Boolean)
    if (!words.length) return

    gsap.fromTo(
      words,
      { opacity: 0.18, y: 8 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: {
          trigger: scope.current,
          start,
          end,
          scrub: 1.2,
        },
      },
    )
  }, [text])

  wordsRef.current = []
  const tokens = text.split(/(\s+)/)

  return (
    <As ref={scope} className={className}>
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={`s-${i}`}>{tok}</span>
        ) : (
          <span
            key={`w-${i}`}
            ref={(el) => (wordsRef.current[i] = el)}
            className="inline-block"
          >
            {tok}
          </span>
        ),
      )}
    </As>
  )
}
