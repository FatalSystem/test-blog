import { Pages } from '@utils'
import { useMediaQuery } from 'usehooks-ts'

export default function Herot (): JSX.Element {
  const isTablet = useMediaQuery('(max-width: 720px)')

  const videoSource = isTablet ? '/videos/tennibot-preview-tablet.mp4' : '/videos/tennibot-preview.mp4'

  return (
    <section className="h-screen relative overflow-hidden" >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" >
          <video className="w-full h-full object-cover bg-[url('/images/cover-img-mobile.webp')] min-[720px]:bg-[url('/images/cover-img.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
              <source src={videoSource} type="video/mp4" />
              {'Your browser doesn\'t support the video tag.'}
          </video>
      </div>
      <div className="h-screen w-full z-10 absolute left-0 flex flex-col items-center bg-gradient-to-t from-t-video-gradient to-transparent justify-start">
        <h1 className="font-avenirBold uppercase text-center text-pretty text-[2.1rem] px-5 mobilem:text-4xl sm:text-6xl md:text-6xl lg:text-6xl 2xl:text-7xl sm:mt-[20%] min-[850px]:mt-[12.5%] mt-[45%]" >
            Tennis,<br className="min-[850px]:hidden" /> meet robot
        </h1>
        <div className="mt-7 w-[80%] items-center justify-center flex flex-col sm:flex-row gap-5" >
            <button className="sm:mr-3 tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 font-thin rounded-full py-2 font-avenir uppercase border-2 transition duration-300 text-t-off-black bg-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black " >Play video</button>
            <a href={Pages.BUY} className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 font-thin rounded-full py-2 font-avenir uppercase border-2 transition duration-300 text-center text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" /* theme="green" */ >Buy now</a>
        </div>
      </div>
    </section>
  )
}
