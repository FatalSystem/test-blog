import { useState } from 'react'
import PartnerActionVideo from './PartnerActionVideo'

const DraggablePartnerAction = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragStartTime, setDragStartTime] = useState(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true)
    setDragStartTime(Date.now())
    setStartX(e.pageX - e.currentTarget.offsetLeft)
    setScrollLeft(e.currentTarget.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - e.currentTarget.offsetLeft
    const walk = (x - startX) // Scroll speed multiplier
    e.currentTarget.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = (): void => {
    setIsDragging(false)
  }
  return (
        <div onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove} className="px-5 flex flex-row gap-5 overflow-x-scroll flex-nowrap [&::-webkit-scrollbar]:hidden justify-between items-center" >
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1055078058" className="bg-[url('/images/partner/partner-drone-fat-thumbnail.png')] lg:min-w-[20%] min-w-[40%] w-full" />
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1055078071" className="bg-[url('/images/partner/partner-drone-top-thumbnail.png')] lg:min-w-[20%] min-w-[40%] w-full" />
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1055078131" className="bg-[url('/images/partner/partner-pickle-glasses-thumbnial.png')] lg:min-w-[20%] min-w-[40%] w-full" />
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1031773084" className="bg-[url('/images/partner/event-thumbnail.png')] lg:min-w-[20%] min-w-[40%] w-full" />
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1031782201" className="bg-[url('/images/partner/pickle-thumbnail.png')] lg:min-w-[20%] min-w-[40%] w-full" />
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1031748865" className="bg-[url('/images/partner/first-person-thumbnail.png')] lg:min-w-[20%] min-w-[40%] w-full" />
            <PartnerActionVideo title="" videoSource="https://player.vimeo.com/video/1031748933" className="bg-[url('/images/partner/third-person-thumbnail.png')] lg:min-w-[20%] min-w-[40%] w-full" />
        </div>
  )
}

export default DraggablePartnerAction
