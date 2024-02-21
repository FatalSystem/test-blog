import React, { useState, useEffect, useCallback } from 'react'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './BuyImageGalleryThumbnail'
// import imageByIndex from './imageByIndex'

interface PropType {
  slides: number[]
  options?: EmblaOptionsType
}

const BuyImageGallery: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y ml-[-1rem] ">
          {slides.map((item, index) => (
            <div className="flex-[0_0_100%] min-w-0 pl-[1rem] relative" key={index}>
              <img
                className="block rounded-md w-full object-cover"
                src={item.img.src}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 ">
        <div className="overflow-hidden rounded-lg" ref={emblaThumbsRef}>
          <div className="flex flex-row ml-[-0.8rem]">
            {slides.map((item, index) => (
              <Thumb
                onClick={() => { onThumbClick(index) }}
                selected={index === selectedIndex}
                alt={item.alt}
                imgSrc={item.img.src}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyImageGallery
