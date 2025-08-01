import React from 'react'
import bbcimg from '@assets/newdesignimages/head/bbc.png'
import timeImg from '@assets/newdesignimages/head/timeVector.png'
import digitalTraends from '@assets/newdesignimages/head/digital-trends.png'
import laTimes from '@assets/newdesignimages/head/latimes.png'
import mashhable from '../assets/newdesignimages/head/mashable.png'

interface VideoHeroProps {
  title: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta: {
    text: string
    href: string
  }
  videoSource?: string
}

export default function VideoHero ({ title, description, primaryCta, secondaryCta, videoSource }: VideoHeroProps): JSX.Element {
  return (
    <section className="h-screen mt-[-110px] relative overflow-hidden" >
        <div className="absolute bg-black/50 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" >
          <video className="w-full h-full object-cover bg-[url('/images/cover-img2.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
              <source src={videoSource} type="video/mp4" />
              {'Your browser doesn\'t support the video tag.'}
          </video>
      </div>
      <div className="h-screen w-full z-10 absolute left-0 flex flex-col items-center bg-gradient-to-t from-t-video-gradient to-transparent justify-start">
        <div className="w-full h-full min-h-screen flex flex-col justify-between">
        <div className="text-center pt-4 mt-36 px-4">
            <h1 className="text-xl uppercase mobilem:text-2xl drop-shadow-lg mobilel:text-3xl font-avenirBold sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 sm:mb-5 leading-tight animate-fade-in-up text-white" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="text-sm drop-shadow-lg font-plutoLight sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed animate-fade-in-up delay-200 text-white max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: description }} />
            <div
            className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up delay-400 max-w-md sm:max-w-none mx-auto"
            >
                <a
                href={primaryCta.href}
                className="w-full sm:w-48 lg:w-64 text-sm sm:text-base lg:text-lg rounded-full py-3 sm:py-2 lg:py-3 font-avenir uppercase border-2 transition duration-300 text-center bg-t-green border-t-green text-t-off-black hover:bg-opacity-90">
                    {primaryCta.text}
                </a>
                <a
                href={secondaryCta.href}
                className="w-full sm:w-48 lg:w-64 text-sm sm:text-base lg:text-lg rounded-full py-3 sm:py-2 lg:py-3 font-avenir uppercase text-t-green border-2 transition duration-300 text-center bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black">
                    {secondaryCta.text}
                </a>
            </div>
        </div>

        {/* <!-- Mobile-only bottom section --> */}
        <div className="sm:hidden px-4 pb-8">
            <div
            className="flex flex-wrap gap-4 justify-center items-center mb-6"
            aria-label="Featured in major publications"
            >
                <img
                    src={timeImg.src}
                    alt="Featured in TIME Magazine"
                    className="h-6 hover:opacity-100 transition-opacity duration-300"
                />
                <img
                    src={bbcimg.src}
                    alt="Featured in BBC News"
                    className="h-6 hover:opacity-100 transition-opacity duration-300"
                />
                <img
                    src={laTimes.src}
                    alt="Featured in Los Angeles Times"
                    className="h-6 hover:opacity-100 transition-opacity duration-300"
                />
                <img
                    src={mashhable.src}
                    alt="Featured in Mashable"
                    className="h-6 hover:opacity-100 transition-opacity duration-300"
                />
                <img
                    src={digitalTraends.src}
                    alt="Featured in Digital Trends"
                    className="h-6 hover:opacity-100 transition-opacity duration-300"
                />
            </div>
            <div
            className="flex flex-col gap-3 justify-center items-center animate-fade-in-up delay-400 max-w-md mx-auto mb-20"
            >
                <a href={primaryCta.href} className="w-full text-sm rounded-full py-3 font-avenir uppercase border-2 transition duration-300 text-center bg-t-green border-t-green text-t-off-black hover:bg-opacity-90">
                    {primaryCta.text}
                </a>
                <a href={secondaryCta.href} className="w-full text-sm rounded-full py-3 font-avenir uppercase text-t-green border-2 transition duration-300 text-center bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black">
                    {secondaryCta.text}
                </a>
            </div>
        </div>

        {/* <!-- Desktop/tablet bottom section (original layout) --> */}
        <div
            className="hidden sm:flex flex-wrap gap-4 sm:gap-4 lg:gap-6 justify-center items-center px-4 mb-8 sm:mb-20 lg:mb-24 xl:mb-34"
            aria-label="Featured in major publications"
        >
            <img
            src={timeImg.src}
            alt="Featured in TIME Magazine"
            className="h-6 hover:opacity-100 transition-opacity duration-300"
            />
            <img
            src={bbcimg.src}
            alt="Featured in BBC News"
            className="h-6 hover:opacity-100 transition-opacity duration-300"
            />
            <img
            src={laTimes.src}
            alt="Featured in Los Angeles Times"
            className="h-6 hover:opacity-100 transition-opacity duration-300"
            />
            <img
            src={mashhable.src}
            alt="Featured in Mashable"
            className="h-6 hover:opacity-100 transition-opacity duration-300"
            />
            <img
            src={digitalTraends.src}
            alt="Featured in Digital Trends"
            className="h-6 hover:opacity-100 transition-opacity duration-300"
            />
        </div>
    </div>
      </div>
    </section>
  )
}
