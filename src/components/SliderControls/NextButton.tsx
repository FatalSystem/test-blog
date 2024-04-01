import React from 'react'
import type { TArrowButton } from './types'
import { AnimatePresence, motion } from 'framer-motion'

const NextButton: React.FC<TArrowButton> = (props) => {
  const { children, svg, animated, ...restProps } = props

  if (animated) {
    return (
      <AnimatePresence>
        <motion.button
          className={`z-10 flex items-center justify-center cursor-pointer w-[4rem] h-[4rem] embla__button--prev ${restProps.className}`}
          type="button"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
          {...restProps}
        >
           {svg ?? (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 19 32" fill="none">
              <path d="M2 2L17 16L2 30" stroke="#F6F7F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
           )}
          {children}
        </motion.button>
    </AnimatePresence>
    )
  }

  return (
    <button
        className="z-10 flex items-center justify-center cursor-pointer size-[4rem] embla__button--next"
        type="button"
        {...restProps}
    >
        {svg ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 19 32" fill="none">
          <path d="M2 2L17 16L2 30" stroke="#F6F7F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        )}
        {children}
    </button>
  )
}

export default NextButton
