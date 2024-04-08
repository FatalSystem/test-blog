import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function NumberTicker ({
  value,
  direction = 'up',
  delay = 0,
  className
}: {
  value: number
  direction?: 'up' | 'down'
  className?: string
  delay?: number // delay in s
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : value - 50)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value)
      }, delay * 1000)
  }, [motionValue, isInView, delay, value, direction])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(
            latest.toFixed(0)
          )
        }
      }),
    [springValue]
  )

  return (
    <span
      className={`font-avenirBold inline-block tabular-nums text-t-off-white xl:text-6xl lg:text-5xl ${className}`}
      ref={ref}
    />
  )
}
