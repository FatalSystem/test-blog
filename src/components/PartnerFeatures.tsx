import { useState } from 'react'
import PartnerPopup from './PartnerPopup'
import { X, MoveDiagonal } from 'lucide-react'
import { Pages } from '@utils'

const PartnerFeatures = (): JSX.Element => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [content, setContent] = useState<string>('specs')
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

  const handleContent = (content: string): JSX.Element => {
    switch (content) {
      case 'specs':
        return (
            <>
                <button className='absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className=" md:w-[40rem] w-[80vw] flex md:flex-row flex-col-reverse h-full">
                    <div className="md:w-[50%] w-full h-full bg-[url('/images/partner/partner-specs-2.webp')] bg-cover bg-center">
                    </div>
                    <div className="md:w-[50%] w-full p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Specs</h3>
                        <p className="font-avenir text-t-off-white">
                            <ul className="list-disc list-outside">
                                <li><span className="font-avenirBold md:text-md text-sm">Speed:</span> Up to 70 mph</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Ball capacity:</span> Up to 140 balls</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Battery life:</span> 4-5 hours based on the usage</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Surfaces:</span> Works on all surfaces (Hard, Clay, Grass, Astroturf & Carpet)</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Replaceable battery</span></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </>
        )
      case 'match':
        return (
            <>
                <button className='absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col md:w-[40rem] w-[80vw] h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-2xl sm:text-2xl mb-5">Match My Level</h3>
                        <p className="font-avenir text-t-off-white md:text-md text-sm">
                            The Partner tracks your returns—whether in or out—and adjusts difficulty instantly. Nail your shots? It increases speed and challenge. Miss a few? It slows down to ease you back into rhythm. Perfectly balanced practice every time.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-match-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'portable':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col md:w-[40rem] w-[80vw] h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-2xl sm:text-2xl mb-5">Compact and Portable</h3>
                        <p className="font-avenir text-t-off-white md:text-md text-sm">
                            The Partner is small but mighty. It’s compact so it fits in nearly any type of car - even those itsy bitsy sports cars :) And lightweight to make transportation painless.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-portable-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'human':
        return (
            <>
                <button className='absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col md:w-[40rem] w-[80vw] h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-2xl sm:text-2xl mb-5">Human-like playability</h3>
                        <p className="font-avenir text-t-off-white md:text-md text-sm">
                            The only ball machine that moves around the court like a real person, delivering the most realistic training experience available. It can either run you around the court as if playing a real match or feed balls directly to you so you can practice consistency with one type of shot.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-human-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'follow':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col md:w-[40rem] w-[80vw] h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-2xl sm:text-2xl mb-5">Follow me</h3>
                        <p className="font-avenir text-t-off-white md:text-md text-sm">
                            Oh, and another feature we think you&apos;ll enjoy... The Partner rolls itself! No more lugging your ball machine behind you; simply set it in the &quot;Follow Me&quot; Mode, and The Partner will tag along behind you to walk to the court - Granted, there aren&apos;t any stairs :)
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-follow-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'safety':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col md:w-[40rem] w-[80vw] h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-2xl sm:text-2xl mb-5">Intelligent safety</h3>
                        <p className="font-avenir text-t-off-white md:text-md text-sm">
                            The Partner is equipped with cameras and sensors that detect if you&apos;re standing in front of the machine and will automatically stop launching balls to prevent accidental injury. It&apos;s one of the safest ball machines for both kids and adults.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-safety-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      default:
        return (
            <>
                <button className='absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className=" md:w-[40rem] w-[80vw] flex md:flex-row flex-col-reverse h-full">
                    <div className="md:w-[50%] w-full h-full bg-[url('/images/partner/partner-specs-2.webp')] bg-cover bg-center">
                    </div>
                    <div className="md:w-[50%] w-full p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Specs</h3>
                        <p className="font-avenir text-t-off-white">
                            <ul className="list-disc list-outside">
                                <li><span className="font-avenirBold md:text-md text-sm">Speed:</span> Up to 70 mph</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Ball capacity:</span> Up to 140 balls</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Battery life:</span> 4-5 hours based on the usage</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Surfaces:</span> Works on all surfaces (Hard, Clay, Grass, Astroturf & Carpet)</li>
                                <li><span className="font-avenirBold md:text-md text-sm">Replaceable battery</span></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </>
        )
    }
  }

  const handleCardClick = (contentType: string) => {
    const dragTime = Date.now() - dragStartTime
    if (dragTime < 200) {
      if (contentType === 'specs') {
        window.location.href = '/specs'
        return
      }
      setContent(contentType)
      setShowPopup(true)
    }
  }

  return (
    <>
        <PartnerPopup showPopup={showPopup} onClose={() => { setShowPopup(false) }} >
            {handleContent(content)}
        </PartnerPopup>
        <div
            className="flex rounded-l-xl flex-row gap-10 overflow-x-scroll ml-5 pr-5 flex-nowrap [&::-webkit-scrollbar]:hidden"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <a onClick={() => { handleCardClick('specs') }} className="cursor-pointer relative h-[60vh] min-w-[290px] rounded-xl hover:rounded-3xl flex flex-col justify-end p-10 overflow-hidden transition-all duration-500" >
                <div className="absolute inset-0 bg-[url('/images/partner/partner-specs.webp')] bg-cover bg-center transition-transform duration-500 hover:scale-105" />
                <button
                    onClick={() => { handleCardClick('specs') }}
                    className="bg-black/30 text-white p-2 z-10 absolute backdrop-blur-sm top-[3%] right-[3%] rounded-full hover:bg-black/50"
                >
                    <MoveDiagonal className="w-4 h-4" />
                </button>
                <p className="relative z-10 font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Specs</p>
            </a>
            <a onClick={() => { handleCardClick('match') }} className="cursor-pointer relative h-[60vh] min-w-[290px] rounded-xl hover:rounded-3xl flex flex-col justify-end p-10 overflow-hidden transition-all duration-500" >
                <div className="absolute inset-0 bg-[url('/images/partner/partner-match.webp')] bg-cover bg-center transition-transform duration-500 hover:scale-105" />
                <button
                    onClick={() => { handleCardClick('match') }}
                    className="bg-black/30 text-white p-2 z-10 absolute backdrop-blur-sm top-[3%] right-[3%] rounded-full hover:bg-black/50"
                >
                    <MoveDiagonal className="w-4 h-4" />
                </button>
                <p className="relative z-10 font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Match my level</p>
            </a>
            <a onClick={() => { handleCardClick('portable') }} className="cursor-pointer relative h-[60vh] min-w-[290px] rounded-xl hover:rounded-3xl flex flex-col justify-end p-10 overflow-hidden transition-all duration-500" >
                <div className="absolute inset-0 bg-[url('/images/partner/partner-portable.webp')] bg-cover bg-center transition-transform duration-500 hover:scale-105" />
                <button
                    onClick={() => { handleCardClick('portable') }}
                    className="bg-black/30 text-white p-2 z-10 absolute backdrop-blur-sm top-[3%] right-[3%] rounded-full hover:bg-black/50"
                >
                    <MoveDiagonal className="w-4 h-4" />
                </button>
                <p className="relative z-10 font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Portable</p>
            </a>
            <a onClick={() => { handleCardClick('human') }} className="cursor-pointer relative h-[60vh] min-w-[290px] rounded-xl hover:rounded-3xl flex flex-col justify-end p-10 overflow-hidden transition-all duration-500" >
                <div className="absolute inset-0 bg-[url('/images/partner/partner-human.webp')] bg-cover bg-center transition-transform duration-500 hover:scale-105" />
                <button
                    onClick={() => { handleCardClick('human') }}
                    className="bg-black/30 text-white p-2 z-10 absolute backdrop-blur-sm top-[3%] right-[3%] rounded-full hover:bg-black/50"
                >
                    <MoveDiagonal className="w-4 h-4" />
                </button>
                <p className="relative z-10 font-avenir text-t-off-white uppercase text-2xl mt-[13vh]" >Human-like playability</p>
            </a>
            <a onClick={() => { handleCardClick('follow') }} className="cursor-pointer relative h-[60vh] min-w-[290px] rounded-xl hover:rounded-3xl flex flex-col justify-end p-10 overflow-hidden transition-all duration-500" >
                <div className="absolute inset-0 bg-[url('/images/partner/partner-follow.webp')] bg-cover bg-center transition-transform duration-500 hover:scale-105" />
                <button
                    onClick={() => { handleCardClick('follow') }}
                    className="bg-black/30 text-white p-2 z-10 absolute backdrop-blur-sm top-[3%] right-[3%] rounded-full hover:bg-black/50"
                >
                    <MoveDiagonal className="w-4 h-4" />
                </button>
                <p className="relative z-10 font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Follow me</p>
            </a>
            <a onClick={() => { handleCardClick('safety') }} className="cursor-pointer relative h-[60vh] min-w-[290px] rounded-xl hover:rounded-3xl flex flex-col justify-end p-10 overflow-hidden transition-all duration-500" >
                <div className="absolute inset-0 bg-[url('/images/partner/partner-safety.webp')] bg-cover bg-center transition-transform duration-500 hover:scale-105" />
                <button
                    onClick={() => { handleCardClick('safety') }}
                    className="bg-black/30 text-white p-2 z-10 absolute backdrop-blur-sm top-[3%] right-[3%] rounded-full hover:bg-black/50"
                >
                    <MoveDiagonal className="w-4 h-4" />
                </button>
                <p className="relative z-10 font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Intelligent safety</p>
            </a>
        </div>
    </>
  )
}

export default PartnerFeatures
