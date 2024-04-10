import { TSlider } from './TSlider/TSlider'

const slides = [
  {
    // content: <p className={textStyle} >Up to <strong>30%</strong> of your time on the court is spent <strong>picking up tennis balls</strong></p>,
    style: "xl:bg-[url('/images/about/slideonedesktopxl.webp')] min-[800px]:bg-center min-[900px]:bg-[url('/images/about/slideonedesktop.webp')] tablet:bg-left tablet:bg-[url('/images/about/slideonetablet.webp')] bg-[url('/images/about/slideone.webp')] tablet:h-[90vh] mobilem:h-[92vh] h-[70vh] bg-bottom"
  },
  {
    // content: <p className={textStyle} >With <strong>Tennibot</strong>, that number goes down to <strong>almost zero</strong></p>,
    style: "lg:bg-[url('/images/about/slidetwodesktopxl.webp')] tablet:bg-[25%] min-[550px]:bg-[url('/images/about/slidetwotablet.webp')] tablet:bg-[url('/images/about/slidetwomobilexl.webp')]  bg-[url('/images/about/slidetwo.webp')] tablet:h-[90vh] mobilem:h-[92vh] h-[70vh]"
  },
  {
    content: <div className='md:max-w-[800px] min-[1440px]:max-w-[950px]  lg:ml-auto lg:mr-[5%] md:mx-auto drop-shadow-2xl' >
      <h2 className='font-avenirBold  text-pretty uppercase text-2xl mobilem:text-3xl sm:text-5xl lg:text-6xl min-[1440px]:text-7xl drop-shadow-2xl' >Small but mighty team</h2>
      <p className='font-plutoLight text-md text-pretty mt-3 mb-16 sm:mb-[15%] lg:text-lg min-[1440px]:text-xl drop-shadow-2xl ' >Tennibot is a robotics startup that builds autonomous robots for sports. We focus on creating the best tennis experience for players & coaches around the world. Our team is made up of nerdy engineers, meticulous designers, and "lazy" tennis players.</p>
    </div>,
    style: "xl:bg-[url('/images/about/slidethreedesktopxl.webp')] lg:bg-[url('/images/about/slidethreedesktop.webp')] tablet:bg-[url('/images/about/slidethreetablet.webp')] bg-[url('/images/about/slidethree.webp')] tablet:h-[90vh] mobilem:h-[92vh] h-[70vh] bg-bottom"
  }

]

export default function AboutSlider (): JSX.Element {
  return (
    <TSlider slides={slides} contentContainerStyle="p-10 h-full flex flex-col lg:items-end justify-end" dotContainerStyle="xl:hidden 2xl:flex" dotContainerDesktopStyle="xl:flex 2xl:hidden bottom-[5%]" arrowsStyle="xl:bottom-[15%] 2xl:bottom-[5%] bottom-[5%]" slideShades="bg-gradient-to-b from-[#232320]/[0.2] from-10% via-transparent via-70% to-[#232320]/[0.2] to-90%" />
  )
}
