import { type LegacyRef, useEffect, useRef } from 'react'

export default function useHorizontalScroll (lastElement: HTMLElement | null) {
  const carouselRef = useRef<LegacyRef<HTMLDivElement>>()
  const containerRef = useRef<LegacyRef<HTMLDivElement>>()
  useEffect(() => {
    const carousel = carouselRef.current
    const container = containerRef.current
    const html = document.getElementsByTagName('html')[0]

    if (carousel && container) {
      const containerOnWheel = (e: WheelEvent) => {
        if (
          window.scrollY > window.innerHeight - 100 &&
          window.scrollY < window.innerHeight + carousel.clientHeight
        ) {
          //   console.log(e.deltaY)
          if (e.deltaY > 0) {
            // console.log("scrolling down")
            if (
              carousel.scrollLeft + e.deltaY >
              carousel.scrollWidth - carousel.clientWidth
            ) {
              carousel.scrollTo({
                bottom: carousel.nextElementSibling
              })
              return
            }
            e.preventDefault()
            carousel.scrollTo({
              left: carousel.scrollLeft + e.deltaY
            })
            return
          }
          if (e.deltaY < 0) {
            if (carousel.scrollLeft + e.deltaY <= 0) {
              html.scrollTo({
                top: scrollY + e.deltaY
              })
              return
            }
            e.preventDefault()
            carousel.scrollTo({
              left: carousel.scrollLeft + e.deltaY
            })
          }
        }
      }

      //   carousel.addEventListener("wheel", containerOnWheel, { passive: false })
      //   container.addEventListener("wheel", containerOnWheel)
      html.addEventListener('wheel', containerOnWheel, { passive: false })

      return () => {
        // carousel.removeEventListener("wheel", onWheel)
        // container.removeEventListener("wheel", containerOnWheel)
        html.removeEventListener('wheel', containerOnWheel)
        // window.removeEventListener("onwheel", () => {})
      }
    }
  }, [])
  return {
    carouselRef,
    containerRef
  }
}
