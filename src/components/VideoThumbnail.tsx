import { wait } from '@utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import ReactPlayer from 'react-player'

interface IProps {
  title: string
  className: string
  videoSource: string
}

export default function VideoThumbnail ({ title, className, videoSource }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [buffering, setBuffering] = useState<boolean>(true)

  return (
    <>
        <div className={`group rounded-lg relative bg-center bg-cover overflow-hidden ${className}`} >
            <div className="bg-black size-full absolute opacity-0 group-hover:opacity-40 transition-all duration-300 ease-in-out" ></div>
            <button onClick={() => { setIsOpen(true) }} className="lg:h-[50vh] w-full relative flex flex-col justify-center items-center md:h-[30vh] h-[30vh]" >
                <svg xmlns="http://www.w3.org/2000/svg" width="57" height="72" viewBox="0 0 57 72" fill="none" className="fill-t-off-white group-hover:fill-t-green" >
                    <path opacity="0.65" d="M54.5722 31.5497C57.8093 33.722 57.8093 38.278 54.5722 40.4503L9.06586 70.9893C5.25966 73.5437 0 70.9618 0 66.539V5.46099C0 1.03824 5.25965 -1.54367 9.06585 1.01064L54.5722 31.5497Z" />
                    </svg>
                    <p className="font-avenir absolute left-[5%] bottom-[5%]  text-t-off-white uppercase text-lg lg:text-2xl 2xl:text-3xl">{title}</p>
            </button>
        </div>
        <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-t-off-black bg-opacity-80 z-50 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, width: '7rem' }}
                animate={{ opacity: 1, width: '80%' } }
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}
                className="relative bg-t-off-white p-1 lg:min-h-[40vh] min-h-[20vh]  min-w-28 rounded-lg mx-auto transition-all duration-300 ease-in-out">
                <button onClick={() => { setIsOpen(false) }} className="z-10 absolute top-[2%] right-[2%] p-4">
                  <div className="relative flex flex-row w-12 h-10 ">
                    <div className="block w-10  absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                      <span
                        aria-hidden="true"
                        className="block rounded-md absolute h-0.5 w-10 bg-t-off-white transform transition duration-500 ease-in-out rotate-45"
                      ></span>
                      <span
                        aria-hidden="true"
                        className="block absolute rounded-md h-0.5 w-10 bg-t-off-white  transform transition  duration-500  ease-in-out opacity-0"
                      ></span>
                      <span
                        aria-hidden="true"
                        className="block absolute rounded-md h-0.5 w-10  bg-t-off-white transform  transition duration-500 ease-in-out -rotate-45"
                      ></span>
                    </div>
                  </div>
              </button>
                {/* <video src={videoSource} controls autoPlay className="w-full rounded-lg"></video> */}
                <ReactPlayer
                    url="https://player.vimeo.com/video/932265258"
                    controls={true}
                    width="100%"
                    height="100%"
                    previewTabIndex={0}
                    // onBufferEnd={() => { setBuffering(false) }}
                    // onStart={() => { setBuffering(true) }}?
                    // onBuffer={() => { setBuffering(false) }}
                    config={{
                      vimeo: {
                        playerOptions: {
                          vimeo_logo: false,
                          colors: ['00000000', 'C0F20C', 'FFFFFF', '000000'],
                          responsive: true,
                          autoplay: true
                        }
                      }
                    }}
                />

              </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
