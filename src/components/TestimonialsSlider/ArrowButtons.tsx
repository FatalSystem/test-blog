import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from 'react'
import { type EmblaCarouselType } from 'embla-carousel'

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

  type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  >
  >

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
      <button
        className="z-10 flex items-center justify-center cursor-pointer size-[4rem] embla__button--prev"
        type="button"
        {...restProps}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="115" height="31" viewBox="0 0 115 31" fill="none">
          <path d="M113 15.5L2 15.5M2 15.5L17.5122 1.99999M2 15.5L17.5122 29" stroke="#F6F7F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {children}
      </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
      <button
        className="z-10 flex items-center justify-center cursor-pointer size-[4rem] embla__button--next"
        type="button"
        {...restProps}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="115" height="31" viewBox="0 0 115 31" fill="none">
          <path d="M2 15.5H113M113 15.5L97.4878 29M113 15.5L97.4878 2" stroke="#F6F7F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {children}
      </button>
  )
}
