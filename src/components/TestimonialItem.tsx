import { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { useMediaQuery } from 'usehooks-ts'

interface IProps {
  className: string
  videoSource: string
  quote: string
  name: string
  location: string
}

export default function TestimonialItem ({ className, quote, name, location, videoSource }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width: 450px)')
  const isTablet = useMediaQuery('(max-width: 768px)')
  const isBigScreen = useMediaQuery('(min-width: 1440px)')
  const handleHeight = (): string => {
    if (isMobile) {
      return '70%'
    }
    if (isTablet) {
      return '50%'
    }
    if (isBigScreen) {
      return '20%'
    }
    return '30%'
  }

  return (
    <>
        <div className="group bg-t-off-black rounded-xl flex border-[1px] border-t-off-white lg:flex-row flex-col justify-between overflow-hidden md:min-h-[250px] md:min-w-[40%] min-w-[80%]" >
            <div className={`${className} bg-cover lg:bg-center lg:w-[80%]`} >
                <button onClick={() => { setIsOpen(true) }} className="w-full relative flex flex-col justify-center items-center lg:h-full md:h-[25vh] h-[35vh]" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 57 72" fill="none" className="fill-t-off-white group-hover:fill-t-green" >
                        <path opacity="0.65" d="M54.5722 31.5497C57.8093 33.722 57.8093 38.278 54.5722 40.4503L9.06586 70.9893C5.25966 73.5437 0 70.9618 0 66.539V5.46099C0 1.03824 5.25965 -1.54367 9.06585 1.01064L54.5722 31.5497Z" />
                        </svg>
                </button>
            </div>
            <div className="p-5 flex flex-col h-full justify-between" >
                <div className="md:mb-5  h-full flex flex-col justify-between" >
                    <p className="font-avenirBold text-t-off-white text-sm md:text-[1rem] text-pretty mb-2" >{quote}</p>
                    <div className="flex mt-5 md:mt-0 md:flex-col flex-row md:justify-start justify-between md:gap-0 gap-5" >
                        <p className="font-avenir uppercase text-t-off-white md:text-md text-sm" >{name}</p>
                        <p className="font-avenir uppercase text-t-off-white text-xs italic" >{location}</p>
                    </div>
                </div>

                <a onClick={() => { setIsOpen(true) }} className="hidden md:flex flex-row gap-2 cursor-pointer items-center" >
                    <p className="font-avenir text-t-off-white text-sm uppercase underline" >Watch video</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 126 57" fill="none">
                        <path d="M2 28.5L123.5 28.5M123.5 28.5L97.3668 2.00001M123.5 28.5L97.3668 55" stroke="#F6F7F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
        <VideoPlayer isOpen={isOpen} videoSource={videoSource} onClose={() => { setIsOpen(false) }} customWidth={handleHeight()} closeButtonStyle="top-[-15%]" />
    </>
  )
}
