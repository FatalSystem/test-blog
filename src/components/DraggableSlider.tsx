import { useState } from 'react'

const DraggableSlider = ({ children, className }: { children: React.ReactNode, className?: string }): JSX.Element => {
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
        onMouseMove={handleMouseMove}
        className={`px-5 cursor-grab flex flex-row overflow-x-scroll flex-nowrap [&::-webkit-scrollbar]:hidden ${className}`} >
            {children}
        </div>
  )
}

export default DraggableSlider
