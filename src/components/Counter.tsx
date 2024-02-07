import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTime } from 'framer-motion'

/**
 *
 * @param root0
 * @param root0.value
 */
export default function Counter ({
  value,
  direction = 'up'
}: {
  value: number
  direction?: 'up' | 'down'
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : value - 50)
  const springValue = useSpring(motionValue, {
    damping: 200,
    stiffness: 100
  })

  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value)
    }
  }, [motionValue, isInView])

  useEffect(
    () =>
      springValue.on('change', (latest: number) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(
            latest.toFixed(0)
          )
        }
      }),
    [springValue]
  )

  return <span ref={ref} />
}
