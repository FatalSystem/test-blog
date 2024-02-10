import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  PrevButton,
  NextButton
} from './ArrowButtons'
import { motion, AnimatePresence } from 'framer-motion'
import { useArrowButtons, useDotButton } from '@hooks'
import { DotButton } from '@components/SliderControls'

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
  } = useArrowButtons(emblaApi)

  const handleText = (index: number): JSX.Element => {
    const textStyle = 'bg-avenir font-thin text-t-off-white text-6xl'
    switch (index) {
      case 0:
        return <AnimatePresence>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className={textStyle} >
                    Up to <strong>30%</strong> of your time on the court is spent <strong>picking up tennis balls</strong>
                </motion.p>
            </AnimatePresence>
      case 1:
        return <AnimatePresence>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className={textStyle} >
                    With <strong>Tennibot</strong>, that number goes down to <strong>almost zero</strong>
                </motion.p>
            </AnimatePresence>
      case 2:
        return <AnimatePresence>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className={textStyle} >
                    This means you could be hitting <strong>hundreds more shots</strong>, every time you practice
                </motion.p>
            </AnimatePresence>
      default:
        return <AnimatePresence>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className={textStyle} >
                    Up to <strong>30%</strong> of your time on the court is spent <strong>picking up tennis balls</strong></motion.p>
            </AnimatePresence>
    }
  }

  const handleImage = (index: number): string => {
    switch (index) {
      case 0:
        // eslint-disable-next-line @typescript-eslint/quotes
        return `bg-[url('../src/assets/front-page/slider/slider_one.webp')]`
      case 1:
        // eslint-disable-next-line @typescript-eslint/quotes
        return `bg-[url('../src/assets/front-page/slider/slider_two.webp')]`
      case 2:
        // eslint-disable-next-line @typescript-eslint/quotes
        return `bg-[url('../src/assets/front-page/slider/slider_three.webp')]`
      default:
        // eslint-disable-next-line @typescript-eslint/quotes
        return `bg-[url('../src/assets/front-page/slider/slider_one.webp')]`
    }
  }

  return (
<div className="bg-t-black">
  <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex touch-pan-y">
      {slides.map((index) => (
        <div className={`${handleImage(index)} bg-cover flex-[0_0_100%] h-[100vh] relative flex items-center justify-center ease-linear duration-500`} key={index}>
        </div>
      ))}
    </div>

    <div className="text-center w-[70%] flex-col absolute inset-x-0 inset-y-[25%] m-auto ">
      {selectedIndex === 0 && handleText(0)}
      {selectedIndex === 1 && handleText(1)}
      {selectedIndex === 2 && handleText(2)}
    </div>

    <div className="flex justify-center items-center mt-10 absolute inset-x-0 inset-y-[30%] m-auto">
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => { onDotButtonClick(index) }}
          className={`bg-t-off-white rounded-full flex items-center mx-[0.75rem] ${index === selectedIndex ? 'size-[1.5rem]' : 'size-[1rem]'} ease-linear duration-500`}
        />
      ))}
    </div>
  </div>

  {selectedIndex !== 0 && <PrevButton onClick={onPrevButtonClick} buttonStlye='absolute bottom-[15%] left-[5%]' disabled={prevBtnDisabled} /> }
  {selectedIndex !== 2 && <NextButton onClick={onNextButtonClick} buttonStlye='absolute bottom-[15%] right-[5%] drop-shadow-2xl' disabled={nextBtnDisabled} />}
</div>
  )
}

export default TSlider
