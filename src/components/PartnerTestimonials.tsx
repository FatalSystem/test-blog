import { TSlider } from './TSlider/TSlider'
import mark from '@assets/partner/mark.webp'
import sarah from '@assets/partner/sarah.webp'
import james from '@assets/partner/james.webp'
import tyler from '@assets/partner/tyler.webp'

const containerStyle = 'font-avenir text-t-off-white flex flex-col size-full justify-center md:justify-start tablet:mt-0 mt-[-15%] sm:pt-[7vh] 2xl:pt-[7%] lg:max-w-[85%] 2xl:max-w-[75%] mx-auto '
const titleStyle = 'uppercase font-avenirBold text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-5'
const h1Style = 'font-avenirBold text-t-off-white lg:text-8xl mobilel:text-7xl mobilem:text-6xl text-5xl uppercase mt-20'
const descriptionStyle = 'font-plutoLight text-t-off-white  2xl:text-xl list-disc list-inside flex flex-col gap-5 mt-5'

const slides = {
  coaches: [
    // {
    //   content: <div className="flex flex-col select-none justify-center items-center h-full">
    //   <p className="font-avenir text-t-off-white text-sm text-center" >"I’ve played with the Tennibot Partner a few times, and here is my verdict: It’s not just a ball machine; it’s an intelligent training partner that enhances every aspect of my practice. The way it adapts to my movements keeps me challenged and engaged throughout each session. I used to dread solo drills, but now I look forward to practicing. I believe the Tennibot Partner is essential for any serious tennis player."</p>
    //   <div className="mt-5 mx-auto flex sm:flex-row justify-center items-center gap-x-2">
    //     <img src={mark.src} width={40} className="rounded-full border-2 border-t-green" alt="Mark Photo" />
    //     <div className="flex flex-row items-center gap-x-2 uppercase font-avenir text-t-green lg:text-sm text-xs">
    //         <p>Mark Wilson</p> • <p>Competitive Player</p> • <p>Phoenix AZ</p>
    //     </div>
    //   </div>
    //   </div>,
    //   style: 'lg:h-[30vh] md:h-[40vh] h-[40vh] cc-slider'
    // },
    {
      content: <div className="flex flex-col select-none justify-center items-center h-full">
        <p className="font-avenir text-t-off-white text-sm text-center" >"The Tennibot Partner makes every practice feel like a match—its AI really knows how to challenge me!"</p>
        <div className="mt-5 mx-auto flex sm:flex-row justify-center items-center gap-x-2">
          <img src={sarah.src} width={40} className="rounded-full border-2 border-t-green" alt="Mark Photo" />
          <div className="flex max-[490px]:flex-col max-[490px]:items-start flex-row md:flex-col items-center lg:items-center lg:flex-row md:items-start gap-x-2 gap-y-1 uppercase font-avenir text-t-green text-xs">
              <p>Sarah Liu</p><span className="md:hidden lg:block hidden min-[490px]:block" > • </span><p>Competitive Player</p><span className="md:hidden lg:block hidden min-[490px]:block" > • </span><p>Boston MA</p>
          </div>
        </div>
        </div>,
      style: 'md:h-[30vh] h-[40vh]'
    },
    {
      content: <div className="flex flex-col select-none justify-center items-center h-full">
        <p className="font-avenir text-t-off-white text-sm text-center" >"Finally, a ball machine that moves and adapts like a real player. I have been waiting for this invention for years!”</p>
        <div className="mt-5 mx-auto flex sm:flex-row justify-center items-center gap-x-2">
          <img src={james.src} width={40} className="rounded-full border-2 border-t-green" alt="Mark Photo" />
          <div className="flex max-[490px]:flex-col max-[490px]:items-start flex-row md:flex-col items-center lg:items-center lg:flex-row md:items-start gap-x-2 gap-y-1 uppercase font-avenir text-t-green text-xs">
              <p>James Carter</p><span className="md:hidden lg:block hidden min-[490px]:block" > • </span><p>Tennis Coach</p><span className="md:hidden lg:block hidden min-[490px]:block" > • </span><p>Burlingame CA</p>
          </div>
        </div>
        </div>,
      style: 'md:h-[30vh] h-[40vh]'
    },
    {
      content: <div className="flex flex-col select-none justify-center items-center h-full">
        <p className="font-avenir text-t-off-white text-sm text-center" >“My favorite feature about the Tennibot Partner is its ability to adjust to my movements, which keeps me on my toes. It's an amazing training tool!"</p>
        <div className="mt-5 mx-auto flex sm:flex-row justify-center items-center gap-x-2">
          <img src={tyler.src} width={40} className="rounded-full border-2 border-t-green" alt="Mark Photo" />
          <div className="flex max-[490px]:flex-col max-[490px]:items-start flex-row md:flex-col items-center lg:items-center lg:flex-row md:items-start gap-x-2 gap-y-1 uppercase font-avenir text-t-green text-xs">
              <p>Tyler Grant</p><span className="md:hidden lg:block hidden min-[490px]:block" > • </span><p>Recreational Tennis Player</p><span className="md:hidden lg:block hidden min-[490px]:block" > • </span><p>Atlanta GA</p>
          </div>
        </div>
        </div>,
      style: 'md:h-[30vh] h-[40vh] '
    }
  ]
}

interface IProps {
  type: 'coaches' | 'clubs' | 'school'
}

export default function PartnerTestimonials ({ type }: IProps): JSX.Element {
  return (
    <TSlider
    slides={slides[type]}
    contentContainerStyle="p-10 sm:w-[80%] cursor-grab h-full m-auto"
    arrowsStyle="lg:bottom-[15%] min-[640px]:bottom-[50%] bottom-[12%]"
    dotContainerStyle="hidden flex gap-7"
    dotContainerDesktopStyle="hidden lg:bottom-[10%] bottom-[10%] gap-7"
    arrowBreakpoint={1024}
    prevArrowStyle="lg:left-[10%] left-[5%]"
    nextArrowStyle="lg:right-[10%] right-[5%]"
    />
  )
}
