import React from 'react'
import type { TDotButton } from './types'

const DotButton: React.FC<TDotButton> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" aria-label="Dot Button" {...restProps}>
      {children}
    </button>
  )
}

export default DotButton