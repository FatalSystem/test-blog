import { useArrowButtons, useDotButton } from '@hooks'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, NextButton, PrevButton } from '../SliderControls'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'

export function TSlide ({ selectedIndex, index, className, containerStyle, children }): JSX.Element {
  return (
    <>
      <div className={`${className} bg-cover bg-center flex-[0_0_100%] h-[100vh] relative flex items-center justify-center ease-linear duration-500`}>
        <div className="absolute w-full h-[100%] bg-gradient-to-b from-[#232320]/[0.7] from-10% via-transparent via-70% to-[#232320]/[0.7] to-90%" >
          {
              selectedIndex === index && (
                  <AnimatePresence>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className={containerStyle} >
                          {children}
                      </motion.div>
                  </AnimatePresence>
              )
          }
          </div>
      </div>
    </>
  )
}

const prevSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="46" transform="rotate(-180 48 48)" stroke="#F6F7F2" strokeWidth="4"/>
      <path d="M55.2734 66.9092L32.0007 48.0001L55.2734 29.091" stroke="#F6F7F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const nextSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="46" stroke="#F6F7F2" strokeWidth="4"/>
      <path d="M40.7266 29.0908L63.9993 47.9999L40.7266 66.909" stroke="#F6F7F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export function TSlider ({ slides, contentContainerStyle, dotContainerStyle, arrowsStyle }): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, watchDrag: false })
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
      useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useArrowButtons(emblaApi)

  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <div className="bg-t-black">
        <div className="overflow-hidden" ref={emblaRef} >
            <div className="flex touch-pan-y">
                {slides.map((slide, index) => {
                  return (
                    <TSlide className={`${slide.style}`} key={index} index={index} selectedIndex={selectedIndex} containerStyle={contentContainerStyle} >
                        {slide.content}
                    </TSlide>
                  )
                })}
            </div>
        </div>

        <div className={`flex justify-center items-center mt-10 absolute inset-x-0 bottom-20 sm:inset-y-[35%] sm:bottom-20 m-auto ${dotContainerStyle}`}>
            {scrollSnaps.map((_, index) => (
            <DotButton
                key={index}
                onClick={() => { onDotButtonClick(index) }}
                className={`bg-t-off-white rounded-full flex items-center mx-[0.75rem] shadow-2xl ${index === selectedIndex ? 'size-[1.5rem]' : 'size-[1rem]'} ease-linear duration-500`}
            />
            ))}
        </div>

        {selectedIndex !== 0 && <PrevButton onClick={onPrevButtonClick} animated svg={isDesktop ? prevSVG : undefined} className={`absolute bottom-[10%] z-20 left-[8%] sm:bottom-[15%] sm:left-[5%] drop-shadow-2xl ${arrowsStyle}`} disabled={prevBtnDisabled} /> }
        {selectedIndex !== 2 && <NextButton onClick={onNextButtonClick} animated svg={isDesktop ? nextSVG : undefined} className={`absolute bottom-[10%] z-20 right-[8%] sm:bottom-[15%] sm:right-[5%] drop-shadow-2xl ${arrowsStyle}`} disabled={nextBtnDisabled} />}
    </div>
  )
}
