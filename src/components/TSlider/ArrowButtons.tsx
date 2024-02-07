import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from 'react'
import { type EmblaCarouselType } from 'embla-carousel'
import { motion, AnimatePresence } from "framer-motion"

interface UsePrevNextButtonsType {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

  type PropType = { buttonStlye: string } & PropsWithChildren<
  React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  >
  >

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, buttonStlye, ...restOfProps } = props

  return (
    <AnimatePresence>
      <motion.button
        className={`z-10 flex items-center justify-center cursor-pointer w-[4rem] h-[4rem] embla__button--prev ${buttonStlye}`}
        type="button"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
        {...restOfProps}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="46" transform="rotate(-180 48 48)" stroke="#F6F7F2" stroke-width="4"/>
          <path d="M55.2734 66.9092L32.0007 48.0001L55.2734 29.091" stroke="#F6F7F2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {children}
      </motion.button>
    </AnimatePresence>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, buttonStlye, ...restOfProps } = props

  return (
    <AnimatePresence>
      <motion.button
        className={`z-10 flex items-center justify-center cursor-pointer w-[4rem] h-[4rem] embla__button--next ${buttonStlye}`}
        type="button"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
        {...restOfProps}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="46" stroke="#F6F7F2" stroke-width="4"/>
          <path d="M40.7266 29.0908L63.9993 47.9999L40.7266 66.909" stroke="#F6F7F2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {children}
      </motion.button>
    </AnimatePresence>
  )
}
