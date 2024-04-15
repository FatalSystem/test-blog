import * as React from 'react'

import { cn } from '@utils'
import type { CSSProperties } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, style, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          '',
          className
        )}
        style={style}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
