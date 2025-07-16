import { useEffect, useState } from 'react'
import { VolumeX, Volume2, Fullscreen } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
import { trackProductViewed } from '@utils'

const PartnerVideoDisplay = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const isMobile = useMediaQuery('(max-width: 500px)')

  const [urlParams, setUrlParams] = useState<URLSearchParams>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search))
    }
  }, [])

  useEffect(() => {
    trackProductViewed({
      // $email: 'email@email.com', // TODO
      // $user_id: 'user_id',
      page_name: '/tennis',
      cart: [{ product_name: 'Rover', price: 2195 }],
      utm_campaign: urlParams?.get('utm_campaign') ?? '',
      utm_source: urlParams?.get('utm_source') ?? '',
      utm_content: urlParams?.get('utm_content') ?? '',
      utm_medium: urlParams?.get('utm_medium') ?? '',
      utm_term: urlParams?.get('utm_term') ?? ''
    })
  }, [])

  const handleVideoSource = (tab: number): string => {
    switch (tab) {
      case 0:
        return 'https://d21pdw38fc8384.cloudfront.net/tennis-partner-desktop.mp4'
      case 1:
        return 'https://d21pdw38fc8384.cloudfront.net/padel-partner.mp4'
      case 2:
        return 'https://d21pdw38fc8384.cloudfront.net/pickle-partner.mp4'
      default:
        return 'https://d21pdw38fc8384.cloudfront.net/tennis-partner-desktop.mp4'
    }
  }

  const handleFullscreen = (videoElement: HTMLVideoElement): void => {
    if (!videoElement) return

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
      console.error('Fullscreen API error:', error)
    }
  }

  return (
    <div className="hidden lg:block" >
        <div className="aspect-[16/9] bg-[url('/images/rapid-demo-thumbnail.webp')] w-[80%] 2xl:w-[65%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
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
                className="w-full h-full object-cover bg-cover bg-center"
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
        {/* {selectedTab === 1 && (
            <div className="bg-[url('/images/partner/padel-partner-thumbnail.webp')] aspect-[16/9] w-[80%] 2xl:w-[65%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
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
                <video className="w-full h-full object-cover bg-cover bg-center" autoPlay loop muted={isMuted} playsInline onPlay={() => { setIsPlaying(true) }} onPause={() => { setIsPlaying(false) }}>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
        )}
        {selectedTab === 2 && (
            <div className="bg-[url('/images/partner/pickle-partner-thumbnial.webp')] aspect-[16/9] w-[80%] 2xl:w-[65%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
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
                <video className="w-full h-full object-cover bg-cover bg-center" autoPlay loop muted={isMuted} playsInline onPlay={() => { setIsPlaying(true) }} onPause={() => { setIsPlaying(false) }}>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
        )} */}
        <div className="w-[80%] 2xl:w-[65%] mx-auto flex flex-row gap-5 pt-10 pb-24" >
            <a onClick={() => { setSelectedTab(0) }} className={`border-t-2 pt-5 cursor-pointer w-[100%] ${selectedTab === 0 ? 'border-t-green' : 'border-transparent opacity-50 hover:opacity-80'} transition-all duration-500 ease-in-out`} >
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Tennis</h3>
                <p className="font-pluto text-t-off-white text-sm" >The most human ball machine you have ever practiced with! The Partner detects your movements and moves around the court to ensure a challenging practice for any shot you can think of.</p>
            </a>
            <a onClick={() => { setSelectedTab(1) }} className={`border-t-2 pt-5 cursor-pointer w-[100%] ${selectedTab === 1 ? 'border-t-green' : 'border-transparent opacity-50 hover:opacity-80'} transition-all duration-500 ease-in-out`} >
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Padel</h3>
                <p className="font-pluto text-t-off-white text-sm" >Perfect your bajada and chiquita with AI-powered drills that adapt to your style, keeping each rally challenging so you stay on your toes every time you step on the court.</p>
            </a>
            <a onClick={() => { setSelectedTab(2) }} className={`border-t-2 pt-5 cursor-pointer w-[100%] ${selectedTab === 2 ? 'border-t-green' : 'border-transparent opacity-50 hover:opacity-80'} transition-all duration-500 ease-in-out`} >
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Pickle</h3>
                <p className="font-pluto text-t-off-white text-sm" >Dinks, drives, and third shot drops - Practice any shot you want, anywhere on the court with the most realistic gameplay a ball machine can provide.</p>
            </a>
        </div>
    </div>
  )
}
export default PartnerVideoDisplay
