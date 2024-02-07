import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './ArrowButtons'

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

const renderItem = (index: number, item: ITestimonialSlide, slidesLength: number): JSX.Element => {
  return (
    <div className={` h-[35vh] border rounded-xl flex flex-row | flex-[0_0_45%] min-w-0 relative overflow-y-visible ${index === slidesLength - 1 ? 'mr-20' : ''}`} key={index}>
      <div className='bg-t-off-white w-[100%] h-full absolute  rounded-xl bottom-[-3%] right-[-2%] z-[1]' />
      {/* eslint-disable-next-line @typescript-eslint/quotes */}
      <div className={`bg-[url('../src/assets/front-page/testimonial_placeholder.webp')] bg-cover rounded-l-xl flex w-[40%] h-full z-[2]`} />
      <div className='flex flex-col bg-t-off-black w-[60%] h-full px-[1.6rem] py-14 justify-between rounded-r-xl z-[2]' >
        <div className='z-[2]' >
          <h6 className='font-avenir font-bold text-3xl text-t-off-white text-pretty ' >{item.title}</h6>
          <p className='font-avenir font-extralight uppercase text-lg text-t-off-white mt-5' >{item.author.name}</p>
          <p className='font-avenir font-thin uppercase text-base text-t-off-white italic ' >{item.author.location}</p>
        </div>
        <button className='font-avenir underline uppercase cursor-pointer text-t-off-white text-left flex gap-4 items-center' >
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

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-x-hidden overflow-y-visible pb-4" ref={emblaRef}>
        <div className="flex touch-pan-y gap-20">
          {slides.map((item, index) => (
            renderItem(index, item, slides.length)
          ))}
        </div>
      </div>

      <div className="flex items-center gap-10 mt-5 ">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default TestimonialsSlider
