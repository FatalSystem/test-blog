import { cn } from '@utils'
import { Children, cloneElement } from 'react'

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  [key: string]: any
}

export default function Marquee ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  ...props
}: MarqueeProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        'flex h-full w-full overflow-hidden [--duration:40s] [--gap:1rem]',
        className
      )}
    >
      <div
        className={cn(
          'flex h-max w-max transform-gpu items-stretch gap-[--gap] p-2',
          {
            '[animation-direction:reverse]': reverse,
            'md:hover:[animation-play-state:paused]': pauseOnHover,
            'animate-marquee-vertical flex-col': vertical,
            'animate-marquee flex-row': !vertical
          }
        )}
      >
        {Children.map(children, (child) => cloneElement(child as JSX.Element))}
        {Children.map(children, (child) => cloneElement(child as JSX.Element))}
        {Children.map(children, (child) => cloneElement(child as JSX.Element))}
      </div>
    </div>
  )
}
