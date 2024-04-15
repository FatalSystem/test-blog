import ReactPlayer from 'react-player'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'

interface IProps {
  isOpen: boolean
  onClose: () => void
  videoSource: string
}

export default function VideoPlayer ({ isOpen, onClose, videoSource }: IProps): JSX.Element {
  const isMobile = useMediaQuery('(max-width: 450px)')

  return (
    <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-t-off-black bg-opacity-80 z-50 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, width: '7rem' }}
                animate={{ opacity: 1, width: isMobile ? '100%' : '80%' } }
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}
                className="relative bg-transparent min-[450px]:bg-t-off-white p-1 lg:min-h-[40vh] min-h-[20vh]  min-w-28 rounded-lg mx-auto transition-all duration-300 ease-in-out">
                <button aria-label="Close video popup" onClick={onClose} className="z-10 absolute min-[450px]:top-[2%] top-[-30%] right-[2%] p-4">
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
                    // url="https://player.vimeo.com/video/932265258"
                    url={videoSource}
                    controls={true}
                    width="100%"
                    height="100%"
                    previewTabIndex={0}
                    style={{ borderRadius: '0.5rem' }}
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
  )
}
