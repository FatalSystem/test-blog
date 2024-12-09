import { useState, useRef } from 'react'
import { Volume2, VolumeX, Fullscreen } from 'lucide-react'
import { TSlider } from './TSlider/TSlider'

const containerStyle = 'font-avenir text-t-off-white flex flex-col size-full justify-center md:justify-start tablet:mt-0 mt-[-15%] sm:pt-[7vh] 2xl:pt-[7%] lg:max-w-[85%] 2xl:max-w-[75%] mx-auto '
const titleStyle = 'uppercase font-avenirBold text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-5'
const h1Style = 'font-avenirBold text-t-off-white lg:text-8xl mobilel:text-7xl mobilem:text-6xl text-5xl uppercase mt-20'
const descriptionStyle = 'font-plutoLight text-t-off-white  2xl:text-xl list-disc list-inside flex flex-col gap-5 mt-5'

interface IProps {
  type: 'tennis' | 'padel' | 'pickle'
}

export default function PartnerVideoSlider ({ type }: IProps): JSX.Element {
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [showControls, setShowControls] = useState<boolean>(false)

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

  const slides = {
    tennis: [
      {
        content: <>
              <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative"
                  onClick={() => { setShowControls(true) }}
                  onMouseLeave={() => { setShowControls(false) }}
              >
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
                      style={{ boxShadow: 'inset 4px 4px 4px 6px black' }}
                      className="w-full h-full object-cover bg-cover bg-center"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      onPlay={() => { setIsPlaying(true) }}
                      onPause={() => { setIsPlaying(false) }}
                  >
                      <source src="/videos/tennis-partner.mp4" type="video/mp4" />
                      {'Your browser doesn\'t support the video tag.'}
                  </video>
              </div>
              <div className="mt-10">
                  <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Tennis</h3>
                  <p className="font-pluto text-t-off-white text-sm" >The most human ball machine you have ever practiced with! The Partner detects your movements and moves around the court to ensure a challenging practice for any shot you can think of.</p>
              </div>
          </>,
        style: 'bg-t-off-black md:h-[80vh] h-[550px] cc-slider'
      }
    //   {
    //     content: <>
    //       <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
    //           <div className="absolute bottom-4 right-4 z-10 flex gap-2">
    //               <button
    //                   onClick={(e) => {
    //                     e.stopPropagation();
    //                     setIsPlaying(!isPlaying);
    //                     const video = e.currentTarget.parentElement?.parentElement?.querySelector('video');
    //                     if (video) {
    //                         isPlaying ? video.pause() : video.play();
    //                     }
    //                   }}
    //                   className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    //               >
    //                   {isPlaying ? (
    //                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //                           <rect x="6" y="4" width="4" height="16"/>
    //                           <rect x="14" y="4" width="4" height="16"/>
    //                       </svg>
    //                   ) : (
    //                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //                           <polygon points="5 3 19 12 5 21 5 3"/>
    //                       </svg>
    //                   )}
    //               </button>
    //               <button
    //                   onClick={() => setIsMuted(!isMuted)}
    //                   className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    //               >
    //                   {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    //               </button>
    //               <button
    //                   onClick={(e) => {
    //                     const video = e.currentTarget.parentElement?.parentElement?.querySelector('video')
    //                     if (video) handleFullscreen(video)
    //                   }}
    //                   className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    //               >
    //                   <Fullscreen className="w-4 h-4" />
    //               </button>
    //           </div>
    //           <video
    //               style={{ boxShadow: 'inset 4px 4px 4px 6px black' }}
    //               className="w-full h-full object-cover bg-cover bg-center"
    //               autoPlay
    //               loop
    //               muted={isMuted}
    //               playsInline
    //               onPlay={() => setIsPlaying(true)}
    //               onPause={() => setIsPlaying(false)}
    //           >
    //               <source src="/videos/padel-partner.mp4" type="video/mp4" />
    //               {'Your browser doesn\'t support the video tag.'}
    //           </video>
    //       </div>
    //       <div className="mt-10">
    //       <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Padel</h3>
    //       <p className="font-pluto text-t-off-white text-sm" >Perfect your bajada and chiquita with AI-powered drills that adapt to your style, keeping each rally challenging so you stay on your toes every time you step on the court.</p>
    //       </div>
    //   </>,
    //     style: 'bg-t-off-black md:h-[80vh] h-[550px] cc-slider'
    //   },
    //   {
    //     content: <>
    //           <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
    //               <div className="absolute bottom-4 right-4 z-10 flex gap-2">
    //                   <button
    //                       onClick={(e) => {
    //                         e.stopPropagation();
    //                         setIsPlaying(!isPlaying);
    //                         const video = e.currentTarget.parentElement?.parentElement?.querySelector('video');
    //                         if (video) {
    //                             isPlaying ? video.pause() : video.play();
    //                         }
    //                       }}
    //                       className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    //                   >
    //                       {isPlaying ? (
    //                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //                               <rect x="6" y="4" width="4" height="16"/>
    //                               <rect x="14" y="4" width="4" height="16"/>
    //                           </svg>
    //                       ) : (
    //                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //                               <polygon points="5 3 19 12 5 21 5 3"/>
    //                           </svg>
    //                       )}
    //                   </button>
    //                   <button
    //                       onClick={() => setIsMuted(!isMuted)}
    //                       className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    //                   >
    //                       {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    //                   </button>
    //                   <button
    //                       onClick={(e) => {
    //                         const video = e.currentTarget.parentElement?.parentElement?.querySelector('video')
    //                         if (video) handleFullscreen(video)
    //                       }}
    //                       className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    //                   >
    //                       <Fullscreen className="w-4 h-4" />
    //                   </button>
    //               </div>
    //               <video
    //                   style={{ boxShadow: 'inset 4px 4px 4px 6px black' }}
    //                   className="w-full h-full object-cover bg-cover bg-center"
    //                   autoPlay
    //                   loop
    //                   muted={isMuted}
    //                   playsInline
    //                   onPlay={() => setIsPlaying(true)}
    //                   onPause={() => setIsPlaying(false)}
    //               >
    //                   <source src="/videos/pickle-partner.mp4" type="video/mp4" />
    //                   {'Your browser doesn\'t support the video tag.'}
    //               </video>
    //           </div>
    //           <div className="mt-10">
    //           <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Pickle</h3>
    //           <p className="font-pluto text-t-off-white text-sm" >Dinks, drives, and third shot drops - Practice any shot you want, anywhere on the court with the most realistic gameplay a ball machine can provide.</p>
    //           </div>
    //       </>,
    //     style: 'bg-t-off-black md:h-[80vh] h-[550px] cc-slider'
    //   }
    ]
  }

  return (
    <div className="w-[80%] mx-auto">
              <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative"
                  onClick={() => { setShowControls(true) }}
                  onMouseLeave={() => { setShowControls(false) }}
              >
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
                      <source src="/videos/fast-demo-mobile.mp4" type="video/mp4" />
                      {'Your browser doesn\'t support the video tag.'}
                  </video>
              </div>
              <div className="mt-10">
                  <h3 className="font-avenirBold text-t-off-white text-center text-xl mb-2" >Works with Tennis, Padel and Pickleball</h3>
                  {/* <p className="font-pluto text-t-off-white text-sm" >The most human ball machine you have ever practiced with! The Partner detects your movements and moves around the court to ensure a challenging practice for any shot you can think of.</p> */}
              </div>
          </div>
  )
}
