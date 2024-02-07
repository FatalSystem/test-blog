import React, { type ReactElement, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useTimer } from '../../hooks'

interface CarouselProps {
  children: React.ReactNode
  theme?: 'dark' | 'light'
  callToAction?: {
    onClick: string
    theme: 'dark' | 'light'
    text: string
    style?: string
  }
}

export default function Carousel ({
  children,
  theme = 'dark',
  callToAction
}: CarouselProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const updateIndex = (newIndex: number): void => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0
    }
    setActiveIndex(newIndex)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => { updateIndex(activeIndex + 1) },
    onSwipedRight: () => { updateIndex(activeIndex - 1) }
  })

  useTimer({
    key: 'newsAutoscroll',
    type: 'interval',
    activateWhen: theme === 'dark',
    duration: 5000,
    onComplete: () => {
      updateIndex(activeIndex + 1)
    },
    deps: [activeIndex]
  })

  return (
    <div
      {...swipeHandlers}
      className={`bg-${
        theme === 'dark' ? 't-black min-[950px]:hidden' : 't-light-green'
      } overflow-hidden  `}
    >
      <div
        className=" whitespace-nowrap transition transform duration-300"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as ReactElement)
        })}
      </div>
      <div className={`h-fit ${callToAction ? '' : 'mb-14 mt-5'} `}>
        <div className=" flex gap-3  items-center justify-center">
          {React.Children.map(children, (child, index) => {
            return (
              <a
                className={`bg-${
                  theme === 'dark' ? 't-light-green' : 't-black'
                } rounded-full ${
                  index === activeIndex ? 'h-3 w-3' : 'h-2 w-2'
                }`}
                onClick={() => {
                  updateIndex(index)
                }}
              />
            )
          })}
        </div>
      </div>
      {callToAction && (
        <div
          className={`w-full flex justify-center mt-5 mb-16 ${callToAction.style}`}
        >
          <a
            href="/"
            className={`rounded-full px-5 py-2 font-avenir uppercase font-medium border-2 transition duration-300 ${
              callToAction.theme === 'light'
                ? 'text-t-light-green border-t-light-green hover:bg-t-light-green hover:text-t-black '
                : 'text-t-black border-t-black hover:bg-t-black hover:text-t-light-green '
            } `}
          >
            {callToAction.text}
          </a>
        </div>
      )}
    </div>
  )
}
