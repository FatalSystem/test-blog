import { TSlider } from './TSlider/TSlider'

const textStyle = 'bg-avenir text-left font-thin text-t-off-white text-pretty text-3xl sm:text-6xl sm:w-[70%] sm:text-center sm:absolute sm:inset-x-0 sm:inset-y-[25%] sm:m-auto'

const slides = [
  {
    content: <p className={textStyle} >Up to <strong>30%</strong> of your time on the court is spent <strong>picking up tennis balls</strong></p>,
    style: `bg-[url('../src/assets/front-page/slider/slider_one.webp')] h-[100vh]`
  },
  {
    content: <p className={textStyle} >With <strong>Tennibot</strong>, that number goes down to <strong>almost zero</strong></p>,
    style: `bg-[url('../src/assets/front-page/slider/slider_two.webp')] h-[100vh]`
  },
  {
    content: <p className={textStyle} >This means you could be hitting <strong>hundreds more shots</strong>, every time you practice</p>,
    style: `bg-[url('../src/assets/front-page/slider/slider_three.webp')] h-[100vh]`
  }

]

export default function FrontPageSlider (): JSX.Element {
  return (
    <TSlider slides={slides} contentContainerStyle="p-10 h-full sm:w-[70%]" />
  )
}
