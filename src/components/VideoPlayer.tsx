import ReactPlayer from 'react-player'

import videoCover from '@assets/rover/videocover.webp'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function VideoPlayer (): JSX.Element {
  const [hideTitle, setHideTitle] = useState<boolean>(false)
  return (
    <div className='relative z-10' >
        {
            !hideTitle && (
                <AnimatePresence>
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
                     className='font-avenir text-t-off-white uppercase text-3xl absolute bottom-[3%] left-[3%]' >
                        Overview
                    </motion.h2>
                </AnimatePresence>)
        }
        <ReactPlayer
            url="https://player.vimeo.com/video/893993983"
            controls={true}
            width="100%"
            height={videoCover.height - 20}
            light={videoCover.src}
            previewTabIndex={0}
            // onStart={() => { setHideTitle(true) }}
            onBuffer={() => { setHideTitle(true) }}
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
    </div>
  )
}
