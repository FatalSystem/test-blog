import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './DotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './ArrowButtons'
// import imageByIndex from './imageByIndex'

interface PropType {
  slides: number[]
  options?: EmblaOptionsType
}

const TSlider: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((index) => (
            <div className="flex-[0_0_100%] relative" key={index}>
              <img
                className="block object-cover w-full h-100vh"
                src={'../src/assets/front-page/slider/slider_one.webp'}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center absolute top-1/2 translate-y-1/2 left-[1.6rem]">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="z-[1] bottom-[1.6rem] absolute left-0 right-0 flex justify-center items-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => { onDotButtonClick(index) }}
            className={'w-[2.4rem] h-[2.4rem] flex items-center mr-[0.75rem] ml-[0.75rem'.concat(
              index === selectedIndex ? '' : ''
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default TSlider
