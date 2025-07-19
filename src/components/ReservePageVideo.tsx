import { Fullscreen, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import PartnerTestimonials from './PartnerTestimonials'
import { derivePageMetadata, trackProductViewed } from '@utils'

export default function ReservePageVideo (): JSX.Element {
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const isMobile = useMediaQuery('(max-width: 500px)')

  const handleFullscreen = (videoElement: HTMLVideoElement) => {
    if (!videoElement) return

    // Check if currently in fullscreen
    const isFullscreen = !!(
      document.fullscreenElement ||
      // @ts-expect-error - Vendor prefix properties
      document.webkitFullscreenElement ||
      // @ts-expect-error - Vendor prefix properties
      document.webkitCurrentFullScreenElement ||
      // @ts-expect-error - Vendor prefix properties
      document.mozFullScreenElement ||
      // @ts-expect-error - Vendor prefix properties
      document.msFullscreenElement
    )

    try {
      if (isFullscreen) {
        // Exit fullscreen
        const exitFn = (
          document.exitFullscreen ||
          // @ts-expect-error - Vendor prefix properties
          document.webkitExitFullscreen ||
          // @ts-expect-error - Vendor prefix properties
          document.webkitCancelFullScreen ||
          // @ts-expect-error - Vendor prefix properties
          document.mozCancelFullScreen ||
          // @ts-expect-error - Vendor prefix properties
          document.msExitFullscreen
        ).bind(document)
        exitFn()
      } else {
        // Enter fullscreen
        const requestFn = (
          videoElement.requestFullscreen ||
          // @ts-expect-error - Vendor prefix properties
          videoElement.webkitRequestFullscreen ||
          // @ts-expect-error - Vendor prefix properties
          videoElement.webkitEnterFullscreen ||
          // @ts-expect-error - Vendor prefix properties
          videoElement.mozRequestFullScreen ||
          // @ts-expect-error - Vendor prefix properties
          videoElement.msRequestFullscreen
        ).bind(videoElement)
        requestFn()
      }
    } catch (error) {
      console.error('Error entering or exiting fullscreen:', error)
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
        category: 'PARTNER',
        product_name: 'Partner Reserve',
        price: 2195,
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
    <div className="relative w-full">
      <div className="lg:w-[65%] md:w-[55%] w-[100%] bg-cover md:h-[70vh] h-[60vh] bg-center overflow-hidden relative">
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPlaying(!isPlaying)
                  const video = e.currentTarget.parentElement?.parentElement?.querySelector('video')
                  if (video) {
                    isPlaying ? video.pause() : video.play()
                  }
                }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                {isPlaying
                  ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                    )
                  : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    )}
            </button>
            <button
                onClick={() => { setIsMuted(!isMuted) }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
                onClick={(e) => {
                  const video = e.currentTarget.parentElement?.parentElement?.querySelector('video')
                  if (video) handleFullscreen(video)
                }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                <Fullscreen className="w-4 h-4" />
            </button>
        </div>
        <video
            className="w-full bg-[url('/images/rapid-demo-thumbnail.webp')] h-full object-cover bg-cover bg-center"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onPlay={() => { setIsPlaying(true) }}
            onPause={() => { setIsPlaying(false) }}
        >
            <source src={isMobile ? 'https://d21pdw38fc8384.cloudfront.net/fast-demo-mobile.mp4' : 'https://d21pdw38fc8384.cloudfront.net/fast-demo.mp4'} type="video/mp4" />
            {'Your browser doesn\'t support the video tag.'}
        </video>
      </div>
      <div className="relative lg:w-[65%] md:w-[55%] w-[100%] bg-red-500" >
        <PartnerTestimonials type="coaches" />
      </div>
    </div>
  )
}
