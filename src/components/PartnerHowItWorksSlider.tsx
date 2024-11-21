import { useState } from "react"

const PartnerHowItWorksSlider = (): JSX.Element => {
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
            className="flex cursor-grab md:flex-row flex-col gap-10 overflow-x-scroll px-5 flex-nowrap [&::-webkit-scrollbar]:hidden" >
            <div className="min-w-[45%] h-[50vh] bg-[url('/images/partner/partner-step-one.webp')] bg-cover bg-center rounded-xl flex flex-col justify-between px-5 py-5" >
                <p className="font-avenirBold text-t-off-white text-3xl" >1.</p>
                <div className="mb-10">
                    <h5 className="font-avenirBold text-t-off-white md:text-3xl text-xl mb-5" >Ready in one minute</h5>
                    <p className="font-pluto text-t-off-white md:text-xl" >Simply attach the station to the net post, turn on the Partner, open the app, and start your drills.</p>
                </div>
            </div>
            <div className="min-w-[45%] h-[50vh] bg-[url('/images/partner/partner-step-two.webp')] bg-cover bg-center rounded-xl flex flex-col justify-between px-5 py-5" >
                <p className="font-avenirBold text-t-off-white text-3xl" >2.</p>
                <div className="mb-10">
                    <h5 className="font-avenirBold text-t-off-white md:text-3xl text-xl mb-5" >Auto-calibrate in seconds</h5>
                    <p className="font-pluto text-t-off-white md:text-xl" >The Station will detect where the Partner is feeding balls and auto-calibrates to ensure precise shots every time.</p>
                </div>
            </div>
            <div className="min-w-[45%] h-[50vh] bg-[url('/images/partner/partner-step-three.webp')] bg-cover bg-center rounded-xl flex flex-col justify-between px-5 py-5" >
                <p className="font-avenirBold text-t-off-white text-3xl" >3.</p>
                <div className="mb-10">
                    <h5 className="font-avenirBold text-t-off-white md:text-3xl text-xl mb-5" >Create your perfect practice</h5>
                    <p className="font-pluto text-t-off-white md:text-xl " >Use the app to create a custom drilling experience so you can practice exactly what you need to.</p>
                </div>
            </div>
        </div>
  )
}

export default PartnerHowItWorksSlider
