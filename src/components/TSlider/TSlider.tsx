import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useArrowButtons, useDotButton } from '@hooks'
import { DotButton, NextButton, PrevButton } from '@components/SliderControls'
import { useMediaQuery } from 'usehooks-ts'

interface PropType {
  slides: number[]
  options?: EmblaOptionsType
}

const prevSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
    <circle cx="48" cy="48" r="46" transform="rotate(-180 48 48)" stroke="#F6F7F2" strokeWidth="4"/>
    <path d="M55.2734 66.9092L32.0007 48.0001L55.2734 29.091" stroke="#F6F7F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const nextSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
    <circle cx="48" cy="48" r="46" stroke="#F6F7F2" strokeWidth="4"/>
    <path d="M40.7266 29.0908L63.9993 47.9999L40.7266 66.909" stroke="#F6F7F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TSlider: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const isDesktop = useMediaQuery('(min-width: 950px)')

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useArrowButtons(emblaApi)

  const handleText = (index: number): JSX.Element => {
    const textStyle = 'bg-avenir font-thin text-t-off-white text-pretty text-3xl md:text-6xl'
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

  // TODO: Adjust to correct image frame
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
          <div className='p-10 h-full md:hidden' >
            {selectedIndex === 0 && handleText(0)}
            {selectedIndex === 1 && handleText(1)}
            {selectedIndex === 2 && handleText(2)}
          </div>
        </div>
      ))}
    </div>

    <div className="text-center w-[70%] flex-col absolute inset-x-0 inset-y-[25%] m-auto hidden md:flex ">
      {selectedIndex === 0 && handleText(0)}
      {selectedIndex === 1 && handleText(1)}
      {selectedIndex === 2 && handleText(2)}
    </div>

    <div className="flex justify-center items-center mt-10 absolute inset-x-0 bottom-20 md:inset-y-[35%] md:bottom-20 m-auto">
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => { onDotButtonClick(index) }}
          className={`bg-t-off-white rounded-full flex items-center mx-[0.75rem] ${index === selectedIndex ? 'size-[1.5rem]' : 'size-[1rem]'} ease-linear duration-500`}
        />
      ))}
    </div>
  </div>

  {selectedIndex !== 0 && <PrevButton onClick={onPrevButtonClick} animated svg={isDesktop ? prevSVG : undefined} className='absolute bottom-[10%] left-[8%] md:bottom-[15%] md:left-[5%] drop-shadow-2xl' disabled={prevBtnDisabled} /> }
  {selectedIndex !== 2 && <NextButton onClick={onNextButtonClick} animated svg={isDesktop ? nextSVG : undefined} className='absolute bottom-[10%] right-[8%] md:bottom-[15%] md:right-[5%] drop-shadow-2xl' disabled={nextBtnDisabled} />}
</div>
  )
}

export default TSlider
