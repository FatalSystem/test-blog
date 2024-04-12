import { cn } from '@utils'

function Skeleton ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-400 opacity-30', className)}
      {...props}
    />
  )
}

export { Skeleton }
