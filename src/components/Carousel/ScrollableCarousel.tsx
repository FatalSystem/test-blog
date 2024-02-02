import { useEffect, useRef } from "react"
import { useHorizontalScroll } from "../../hooks"
import ballCollection from "../../assets/front-page/ball-collection.jpg"
import courtSweeping from "../../assets/front-page/court-sweeping.jpg"
import lineJudge from "../../assets/front-page/line-judge.jpg"

export default function ScrollableCarousel() {
  const lastElRef = useRef<HTMLElement>(null)
  const { carouselRef, containerRef } = useHorizontalScroll(lastElRef.current)

  /* useEffect(() => {
    const html = document.getElementsByTagName("html")[0]
    console.log(html.dataset.isScrollingUp)
  }, []) */

  return (
    <div ref={containerRef}>
      <div className="bg-t-light-green">
        <img
          src={ballCollection.src}
          alt="Rover collecting balls near a fence"
        />
        <img src={courtSweeping.src} alt="Rover sweeping a court" />
        <img src={lineJudge.src} alt="Station" />
      </div>
      <div
        ref={carouselRef}
        className=" h-60 overflow-x-auto whitespace-nowrap "
      >
        <div className="bg-t-red h-full whitespace-nowrap w-screen inline-block ">
          <h1>Hello</h1>
        </div>
        <div className="bg-t-blue h-full whitespace-nowrap w-screen inline-block ">
          <h1>Hello 2 </h1>
        </div>
        <div
          ref={lastElRef}
          className="bg-t-green h-full whitespace-nowrap w-screen inline-block "
          id="lastOne"
        >
          <h1>Hello 3</h1>
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  )
}
