import React, { useState } from 'react'
import time from '@assets/front-page/news/time.svg'
import bbc from '@assets/front-page/news/bbc.svg'
import latimes from '@assets/front-page/news/latimes.svg'
import mashable from '@assets/front-page/news/mashable.svg'
import digitaltrends from '@assets/front-page/news//digital-trends.svg'
import { useArrowButtons, useDotButton, useTimer } from '@hooks'
import type { ImageMetadata } from 'astro'
import { useMediaQuery } from 'usehooks-ts'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, NextButton, PrevButton } from '@components/SliderControls'

interface IMediaQuotesContent {
  img: ImageMetadata
  alt: string
  description: string
}

const mediaQuotesContent: IMediaQuotesContent[] = [
  {
    img: time,
    alt: 'Time',
    description: '"You can think of it as a Roomba for a tennis court!"'
  },
  {
    img: bbc,
    alt: 'BBC',
    description: '"The Tennibot autonomously patrols the courts and collects the balls that you lobbed, smashed or mis-hit."'
  },
  {
    img: latimes,
    alt: 'LA Times',
    description: '"Every tennis player\'s dream."'
  },
  {
    img: mashable,
    alt: 'Mashable',
    description: '"You will never have to pick up a tennis ball again."'
  },
  {
    img: digitaltrends,
    alt: 'Digitaltrends',
    description: '"A must-have for any tennis club."'
  }
]

const MediaQuotesDesktop: React.FC = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useTimer({
    key: 'mediaQuotesAutoscroll',
    type: 'interval',
    activateWhen: true,
    duration: 5000,
    onComplete: () => {
      if (activeIndex === mediaQuotesContent.length - 1) {
        setActiveIndex(0)
        return
      }
      setActiveIndex(activeIndex + 1)
    },
    deps: [activeIndex]
  })

  return (
    <section className="bg-t-off-black py-12 hidden flex-col justify-center content-center flex-wrap | min-[950px]:flex">
      <div className="flex mx-auto gap-5 flex-wrap items-baseline | lg:gap-16 ">
        {mediaQuotesContent.map((item, index) => (
          <a key={index} onClick={() => { setActiveIndex(index) }} className="group ">
            <img
              src={item.img.src}
              width={item.img.width - 80}
              height={item.img.height - 80}
              alt={item.alt}
              className={`${
                activeIndex === index ? 'opacity-100' : 'opacity-60'
              } group-hover:opacity-100 transform  duration-300`}
            />
            <hr
              className={`h-0.5 bg-t-white mx-auto mt-2 rounded-full ${
                activeIndex === index ? 'opacity-100 w-full' : 'opacity-0 w-0'
              } group-hover:opacity-100 group-hover:w-full transform duration-300 `}
            />
          </a>
        ))}
      </div>
      <p
        className={'font-avenir uppercase text-lg text-center  text-t-white mx-auto mt-10 transform duration-300 '}
      >
        {mediaQuotesContent?.[activeIndex]?.description}
      </p>
    </section>
  )
}

const renderItem = (index: number, item: IMediaQuotesContent): JSX.Element => {
  return (
    <div className={'flex-[0_0_100%] h-[30vh] w-full relative flex items-center justify-center'} key={index}>
      <div className='flex flex-col justify-center h-full w-[80%]' >
        <img src={item.img.src} className='max-h-[20%]' />
        <p className={'font-avenir text-xl text-center text-pretty font-black text-t-off-white mx-auto mt-10'}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

const MediaQuotesMobile: React.FC = (): JSX.Element => {
  const slides = mediaQuotesContent
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useArrowButtons(emblaApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  useTimer({
    key: 'mediaQuotesMobileAutoscroll',
    type: 'interval',
    activateWhen: true,
    duration: 5000,
    onComplete: () => {
      emblaApi?.scrollNext()
    },
    deps: [emblaApi]
  })

  return (
    <section className="relative ">
      <div className="bg-t-black">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y pt-5">
          {slides.map((item, index) => (
            renderItem(index, item)
          ))}
          </div>
        </div>

        <div className="flex items-center justify-center pb-10">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="flex justify-center items-center mx-[3%] ">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => { onDotButtonClick(index) }}
                className={`bg-t-off-white rounded-full flex items-center mx-[0.75rem] ${index === selectedIndex ? 'size-[1.5rem]' : 'size-[1rem]'} ease-linear duration-500`}
              />
            ))}
          </div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

function MediaQuotes (): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 950px)')

  if (isDesktop) { return <MediaQuotesDesktop /> }

  return (
    <MediaQuotesMobile />
  )
}

export default MediaQuotes
