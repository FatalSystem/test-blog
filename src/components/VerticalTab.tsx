import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { motion } from 'framer-motion'
import { derivePageMetadata, trackProductViewed } from '@utils'

const tabItemStyle = 'text-nowrap cursor-pointer text-lg pl-4 transition-all duration-200 ease-in'

export default function VerticalTab (): JSX.Element {
//   const isTablet = useMediaQuery('(max-width: 720px)')
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const videoSource = 'https://d21pdw38fc8384.cloudfront.net/ball-collection.mp4'

  const handleVideoSource = (tab: number): string => {
    switch (tab) {
      case 0:
        return 'https://d21pdw38fc8384.cloudfront.net/ball-collection.mp4'
      case 1:
        return 'https://d21pdw38fc8384.cloudfront.net/court-sweeping.mp4'
      case 4:
        return 'https://d21pdw38fc8384.cloudfront.net/stat-tracking.mp4'
      default:
        return 'https://d21pdw38fc8384.cloudfront.net/ball-collection.mp4'
    }
  }

  const [urlParams, setUrlParams] = useState<URLSearchParams>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search))
    }
  }, [])

  useEffect(() => {
    trackProductViewed({
      cart: [{
        brand: 'Tennibot',
        category: 'ROVER',
        product_name: 'Rover and Station',
        price: 2995,
        quantity: 1,
        currency: 'USD'
      }],
      page_type: derivePageMetadata(window.location.pathname).page_type,
      page_slug: derivePageMetadata(window.location.pathname).page_slug,
      page_name: derivePageMetadata(window.location.pathname).page_name,
      utm_campaign: urlParams?.get('utm_campaign') ?? '',
      utm_source: urlParams?.get('utm_source') ?? '',
      utm_content: urlParams?.get('utm_content') ?? '',
      utm_medium: urlParams?.get('utm_medium') ?? '',
      utm_term: urlParams?.get('utm_term') ?? ''
    })
  }, [])

  return (
    <div className='md:flex hidden flex-row mt-20 mb-48' >
        <div className='' >
            <div className='flex flex-col h-full gap-5 justify-between mr-5' >
                <a onClick={() => { setSelectedTab(0) }} className={`${tabItemStyle} ${selectedTab === 0 ? 'font-plutoBold border-l-2 border-t-green' : 'font-plutoLight border-transparent'}`} >
                    Ball Collection
                    <p className={`${selectedTab === 0 ? 'max-h-[1000px] opacity-100 mt-2 z-10' : 'max-h-0 opacity-0 mt-0 overflow-hidden'} text-wrap text-sm mt-1 font-plutoLight transition-all duration-700 ease-in-out`} >The Tennibot collects up to 40 balls a minute on clay or hard courts.</p>
                </a>
                <a onClick={() => { setSelectedTab(1) }} className={`${tabItemStyle} ${selectedTab === 1 ? 'font-plutoBold border-l-2 border-t-green' : 'font-plutoLight border-transparent'}`} >
                    Clay Court Sweeping
                    <p className={`${selectedTab === 1 ? 'max-h-[1000px] opacity-100 mt-2 z-10' : '-z-10 max-h-0 opacity-0 mt-0 overflow-hidden'} text-wrap text-sm mt-1 font-plutoLight transition-all duration-700 ease-in-out`} >With the Sweeper attachment, your courts will be swept effortlessly.</p>
                </a>
                <a onClick={() => { setSelectedTab(2) }} className={`${tabItemStyle} ${selectedTab === 2 ? 'font-plutoBold border-l-2 border-t-green' : 'font-plutoLight border-transparent'}`} >
                    Video Recording
                    <p className={`${selectedTab === 2 ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0 overflow-hidden'} text-wrap text-sm mt-1 font-plutoLight transition-all duration-700 ease-in-out`} >The Station captures those great shots from anywhere on the court.</p>
                </a>
                <a onClick={() => { setSelectedTab(3) }} className={`${tabItemStyle} ${selectedTab === 3 ? 'font-plutoBold border-l-2 border-t-green' : 'font-plutoLight border-transparent'}`} >
                    Real Time Line Judging
                    <p className={`${selectedTab === 3 ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0 overflow-hidden'} text-wrap text-sm mt-1 font-plutoLight transition-all duration-700 ease-in-out`} >No more arguing over line calls. Let the Station do the talking.</p>
                </a>
                <a onClick={() => { setSelectedTab(4) }} className={`${tabItemStyle} ${selectedTab === 4 ? 'font-plutoBold border-l-2 border-t-green' : 'font-plutoLight border-transparent'}`} >
                    Stat Tracking
                    <p className={`${selectedTab === 4 ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0 overflow-hidden'} text-wrap text-sm mt-1 font-plutoLight transition-all duration-700 ease-in-out`} >See a detailed match breakdown and keep track of your progress in the app.</p>
                </a>
            </div>
        </div>
        {
            selectedTab === 0 && (
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0
                  },
                  animate: {
                    opacity: 1
                  }
                }}
                transition={{
                  duration: 1
                }}
             className='w-full rounded-lg overflow-hidden' >
                <video className="w-full h-full object-cover bg-[url('/images/ball-collection-cover.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </motion.div>
            )
        }
        {
            selectedTab === 1 && (
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0
                  },
                  animate: {
                    opacity: 1
                  }
                }}
                transition={{
                  duration: 1
                }}
             className='w-full rounded-lg overflow-hidden' >
                <video className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </motion.div>
            )
        }
        {
            selectedTab === 2 && (
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0
                  },
                  animate: {
                    opacity: 1
                  }
                }}
                transition={{
                  duration: 1
                }}
             className="w-full bg-[url('/images/buy/station-tab.webp')] object-cover bg-cover bg-center rounded-lg overflow-hidden" >
                {/* <div className="w-full h-full object-cover  bg-[url('/images/buy/station-tab.webp')] bg-cover bg-center">
                </div> */}
            </motion.div>
            )
        }
        {
            selectedTab === 3 && (
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0
                  },
                  animate: {
                    opacity: 1
                  }
                }}
                transition={{
                  duration: 1
                }}
             className="w-full bg-[url('/images/buy/line-judge.webp')] object-cover bg-cover bg-center rounded-lg overflow-hidden" >
                {/* <div className="w-full h-full object-cover  bg-[url('/images/buy/station-tab.webp')] bg-cover bg-center">
                </div> */}
            </motion.div>
            )
        }
        {
            selectedTab === 4 && (
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0
                  },
                  animate: {
                    opacity: 1
                  }
                }}
                transition={{
                  duration: 1
                }}
             className='w-full rounded-lg overflow-hidden' >
                <video className="w-full h-full object-cover bg-[url('/images/buy/stat-tracking-cover.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </motion.div>
            )
        }

    </div>
  )
}
