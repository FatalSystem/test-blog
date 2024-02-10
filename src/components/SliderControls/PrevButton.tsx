import React from 'react'
import type { TArrowButton } from './types'

const PrevButton: React.FC<TArrowButton> = (props) => {
  const { children, svg, ...restProps } = props

  return (
    <button
      className="z-10 flex items-center justify-center cursor-pointer size-[4rem] embla__button--prev"
      type="button"
      {...restProps}
    >
        {svg ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="32" viewBox="0 0 19 32" fill="none">
            <path d="M17 30L2 16L17 2" stroke="#F6F7F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        )}
        {children}
    </button>
  )
}

export default PrevButton
