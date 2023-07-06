import React, { useState } from "react"
import { useSwipeable } from "react-swipeable"

interface CarouselProps {
  children: React.ReactNode
}

export default function Carousel({ children }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  // const [paused, setPaused] = useState<boolean>(false)

  const updateIndex = (newIndex: number) => {
    console.log("updating", newIndex)
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0
    }
    setActiveIndex(newIndex)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  })

  return (
    <div {...swipeHandlers} className=" bg-t-black overflow-hidden">
      <div
        className=" whitespace-nowrap   transition transform duration-300 "
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child)
        })}
      </div>
      <div className=" h-10  mt-5">
        <div className=" flex gap-3  items-center justify-center">
          {React.Children.map(children, (child, index) => {
            return (
              <a
                className={`bg-t-light-green rounded-full ${
                  index === activeIndex ? "h-3 w-3" : "h-2 w-2"
                }`}
                onClick={() => {
                  updateIndex(index)
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
