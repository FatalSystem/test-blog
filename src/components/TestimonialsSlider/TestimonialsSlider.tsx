import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useArrowButtons, useDotButton } from '@hooks'
import { DotButton, NextButton, PrevButton } from '@components/SliderControls'
import { useMediaQuery } from 'usehooks-ts'

interface ITestimonialSlide {
  title: string
  author: {
    name: string
    location: string
  }
  url: string
}

interface PropType {
  slides: ITestimonialSlide[]
  options?: EmblaOptionsType
}

const prevSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="115" height="31" viewBox="0 0 115 31" fill="none">
      <path d="M113 15.5L2 15.5M2 15.5L17.5122 1.99999M2 15.5L17.5122 29" stroke="#F6F7F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const nextSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="115" height="31" viewBox="0 0 115 31" fill="none">
    <path d="M2 15.5H113M113 15.5L97.4878 29M113 15.5L97.4878 2" stroke="#F6F7F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const renderItem = (index: number, item: ITestimonialSlide, slidesLength: number): JSX.Element => {
  return (
    <div className={`  flex-[0_0_25%] md:h-[35vh] border rounded-xl flex flex-col md:flex-row | md:flex-[0_0_45%] min-w-0 relative overflow-y-visible ${index === slidesLength - 1 ? 'mr-20' : ''}`} key={index}>
      <div className='bg-t-off-white w-[100%] h-full absolute  rounded-xl bottom-[-1%] md:bottom-[-3%] right-[-2%] z-[1]' />
      {/* eslint-disable-next-line @typescript-eslint/quotes */}
      <div className={`bg-[url('../src/assets/front-page/testimonial_placeholder.webp')] h-[45vh] bg-cover rounded-b-none rounded-t-xl md:rounded-l-xl flex w-full md:w-[40%] md:h-full z-[2]`} />
      <div className='flex flex-col p-5 bg-t-off-black md:w-[60%] rounded-b-xl md:rounded-bl-none md:h-full px-[1.6rem] md:py-8 justify-between md:rounded-r-xl z-[2]' >
        <div className='z-[2]' >
          <h6 className='font-avenir font-bold text-lg uppercase md:normal-case md:text-2xl text-t-off-white text-pretty ' >{item.title}</h6>
          <div className='flex flex-row items-center md:items-start justify-between md:flex-col mt-5 md:mt-0' >
            <p className='font-avenir font-extralight uppercase text-lg text-t-off-white md:mt-5' >{item.author.name}</p>
            <p className='font-avenir font-thin uppercase text-base text-t-off-white italic ' >{item.author.location}</p>
          </div>
        </div>
        <button className='font-avenir underline uppercase cursor-pointer text-t-off-white text-left gap-4 items-center hidden md:flex ' >
          Watch video
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="13" viewBox="0 0 21 13" fill="none">
            <path d="M0 6.5H20M20 6.5L14.1463 12M20 6.5L14.1463 1" stroke="#F6F7F2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

const TestimonialsSlider: React.FC<PropType> = (props) => {
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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-x-hidden overflow-y-visible pb-4" ref={emblaRef}>
        <div className="flex touch-pan-y gap-20">
          {slides.map((item, index) => (
            renderItem(index, item, slides.length)
          ))}
        </div>
      </div>

      <div className="flex items-center md:gap-10 mt-5 ">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} svg={isDesktop ? prevSVG : undefined} />
        {
          !isDesktop && (
            <div className="flex justify-center items-center">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => { onDotButtonClick(index) }}
                  className={`bg-t-off-white rounded-full flex items-center mx-[0.75rem] ${index === selectedIndex ? 'size-[1.5rem]' : 'size-[1rem]'} ease-linear duration-500`}
                />
              ))}
            </div>
          )
        }
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} svg={isDesktop ? nextSVG : undefined} />
      </div>
    </div>
  )
}

export default TestimonialsSlider
