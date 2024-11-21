import { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { useMediaQuery } from 'usehooks-ts'

interface IProps {
  title: string
  className: string
  videoSource: string
}

export default function PartnerActionVideo ({ title, className, videoSource }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width: 450px)')
  const isTablet = useMediaQuery('(max-width: 768px)')

  const handleHeight = (): string => {
    if (isMobile) {
      return '70%'
    }
    if (isTablet) {
      return '50%'
    }
    return '30%'
  }

  return (
    <>
        <div className={`group rounded-lg relative bg-center bg-cover overflow-hidden ${className}`} >
            <div className="bg-black size-full absolute opacity-0 group-hover:opacity-40 transition-all duration-300 ease-in-out" ></div>
            <button onClick={() => { setIsOpen(true) }} className="lg:h-[40vh] w-full relative flex flex-col justify-center items-center md:h-[30vh] h-[30vh]" >
                <svg xmlns="http://www.w3.org/2000/svg" width="57" height="72" viewBox="0 0 57 72" fill="none" className="fill-t-off-white group-hover:fill-t-green" >
                    <path opacity="0.65" d="M54.5722 31.5497C57.8093 33.722 57.8093 38.278 54.5722 40.4503L9.06586 70.9893C5.25966 73.5437 0 70.9618 0 66.539V5.46099C0 1.03824 5.25965 -1.54367 9.06585 1.01064L54.5722 31.5497Z" />
                    </svg>
                    <p className="font-avenir absolute left-[5%] bottom-[5%]  text-t-off-white uppercase text-lg lg:text-2xl 2xl:text-3xl">{title}</p>
            </button>
        </div>
        <VideoPlayer isOpen={isOpen} videoSource={videoSource} onClose={() => { setIsOpen(false) }} customWidth={handleHeight()} closeButtonStyle="top-[-15%]" />
    </>
  )
}
