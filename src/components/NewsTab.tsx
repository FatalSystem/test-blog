import React, { useState } from 'react'
import time from '../assets/time.svg'
import bbc from '../assets/bbc.svg'
import latimes from '../assets/latimes.svg'
import mashable from '../assets/mashable.svg'
import digitaltrends from '../assets/digital-trends.svg'
import { useTimer } from '../hooks'
const newsContent = [
  {
    img: time,
    alt: 'Time',
    description: '"You can think of it as a Roomba for a tennis court instead of your living room!"'
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

function NewsTab () {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useTimer({
    key: 'newsAutoscroll',
    type: 'interval',
    activateWhen: true,
    duration: 5000,
    onComplete: () => {
      if (activeIndex === newsContent.length - 1) {
        setActiveIndex(0)
        return
      }
      setActiveIndex(activeIndex + 1)
    },
    deps: [activeIndex]
  })

  return (
    <section className="bg-t-black py-12 hidden flex-col justify-center content-center flex-wrap | min-[950px]:flex">
      <div className="flex mx-auto gap-5 flex-wrap items-baseline | lg:gap-16 ">
        {newsContent.map((item, index) => (
          <a onClick={() => { setActiveIndex(index) }} className="group ">
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
        {newsContent[activeIndex].description}
      </p>
    </section>
  )
}

export default NewsTab
