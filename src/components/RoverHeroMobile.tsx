import { TSlider } from './TSlider/TSlider'

const slides = [
  {
    content: <div className='flex flex-row font-avenirBold text-t-off-white justify-center items-start w-52'><p className='text-7xl font-black mr-1 ' >1</p> <p className='font-avenirBold mobilem:text-2xl text-xl font-bold uppercase ' >Roll onto<br/> the court</p></div>,
    style: "bg-[url('/images/rover/roverstepone.webp')] tablet:h-[100vh] h-[85vh]"
  },
  {
    content: <div className='flex flex-row font-avenirBold text-t-off-white justify-center items-start w-52 '><p className='text-7xl font-black mr-3' >2</p> <p className='font-avenirBold mobilem:text-2xl text-xl font-bold uppercase ' >Place the<br/> station</p></div>,
    style: "bg-[url('/images/rover/station.webp')] tablet:h-[100vh] h-[85vh]"
  },
  {
    content: <div className='flex flex-row font-avenirBold text-t-off-white justify-center items-start w-52 '><p className='text-7xl font-black mr-3' >3</p> <p className='font-avenirBold mobilem:text-2xl text-xl font-bold uppercase ' >Focus on<br/> your game</p></div>,
    style: "bg-[url('/images/rover/game.webp')] tablet:h-[100vh] h-[85vh] "
  }

]

export default function RoverHeroMobile (): JSX.Element {
  return (
    <TSlider 
      slides={slides}
      contentContainerStyle='absolute bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'
      arrowsStyle="bottom-[10%]"
    />
  )
}
