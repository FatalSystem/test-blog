import { TSlider } from './TSlider/TSlider'

const textStyle = 'font-avenir text-left mt-[30%] text-t-off-white text-pretty text-3xl xl:text-5xl sm:text-4xl sm:w-[100%] sm:text-center sm:absolute sm:inset-x-0 sm:inset-y-[25%] sm:m-auto'

const slides = [
  {
    content: <p className={textStyle} >Up to <strong className='font-avenirBold' >30%</strong> of your time on the court<br className='hidden sm:block' /> is spent <strong className='font-avenirBold'>picking up tennis balls</strong></p>,
    style: "tablet:bg-[url('/images/slider/slider_one.webp')] bg-[url('/images/slider/slider_onemobile.webp')] bg-top tablet:h-[100vh] h-screen"
  },
  {
    content: <p className={textStyle} >With <strong className='font-avenirBold'>Tennibot</strong>, that number<br className='hidden sm:block' /> goes down to <strong className='font-avenirBold'>almost zero</strong></p>,
    style: "tablet:bg-[url('/images/slider/slider_two.webp')] bg-[url('/images/slider/slider_twomobile.webp')] bg-top tablet:h-[100vh] h-screen"
  },
  {
    content: <p className={textStyle} >This means you could be hitting<br className='hidden sm:block' /> <strong className='font-avenirBold'>hundreds more shots</strong>, every time you practice</p>,
    style: "tablet:bg-[url('/images/slider/slider_three.webp')] bg-[url('/images/slider/slider_threemobile.webp')] bg-top tablet:h-[100vh] h-screen"
  }

]

export default function FrontPageSlider (): JSX.Element {
  return (
    <TSlider
      slides={slides}
      contentContainerStyle="p-10 h-full sm:w-[70%]"
      // slideShades="bg-gradient-to-b from-[#232320]/[0.2] from-10% via-transparent via-70% to-[#232320]/[0.2] to-90%"
      dotContainerStyle="sm:hidden"
      dotContainerDesktopStyle="sm:flex bottom-[56vh]"
      arrowsStyle="bottom-[10%]"
       />
  )
}
