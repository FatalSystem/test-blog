import { useState } from 'react'
import { TSliderTwo } from './TSliderTwo'

const slides = [
  {
    content: <video className="w-full h-full object-cover bg-[url('/images/cover-img-mobile.webp')] min-[720px]:bg-[url('/images/cover-img.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
    <source src='/videos/ball-collection.mp4' type="video/mp4" />
    {'Your browser doesn\'t support the video tag.'}
</video>,
    style: "tablet:bg-[url('/images/buy/rovercourt-desktopxl.webp')] bg-[url('/images/buy/rovercourt.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    content: <video className="w-full h-full object-cover bg-[url('/images/cover-img-mobile.webp')] min-[720px]:bg-[url('/images/cover-img.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
    <source src='/videos/court-sweeping.mp4' type="video/mp4" />
    {'Your browser doesn\'t support the video tag.'}
</video>,
    style: "tablet:bg-[url('/images/buy/rover-closeup-desktopxl.webp')] bg-[url('/images/buy/rover-closeup.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    style: "bg-[url('/images/buy/station-tab.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    style: "bg-[url('/images/buy/line-judge.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    content: <video className="w-full h-full object-cover bg-[url('/images/cover-img-mobile.webp')] min-[720px]:bg-[url('/images/cover-img.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
    <source src='/videos/stat-tracking.mp4' type="video/mp4" />
    {'Your browser doesn\'t support the video tag.'}
</video>,
    style: "tablet:bg-[url('/images/buy/station-closeup-desktopxl.webp')] bg-[url('/images/buy/station-closeup.webp')] sm:h-[70vh] h-[45vh]"
  }

]

export default function SecondBuyPageSlider (): JSX.Element {
  const [selected, setSelected] = useState<number>(0)

  const onIndexChangeCb = (index: number) => {
    setSelected(index)
  }

  const handleContent = (index: number) => {
    switch (index) {
      case 0:
        return {
          title: 'Ball collection',
          description: 'The Tennibot collects up to 40 balls a minute on clay or hard courts.'
        }
      case 1:
        return {
          title: 'Clay Court Sweeping',
          description: 'With the Sweeper attachment, your courts will be swept effortlessly.'
        }
      case 2:
        return {
          title: 'Video Recording',
          description: 'The Station captures those great shots from anywhere on the court.'
        }
      case 3:
        return {
          title: 'Real Time Line Judging',
          description: 'No more arguing over line calls. Let the Station do the talking.'
        }
      case 4:
        return {
          title: 'Stat Tracking',
          description: 'See a detailed match breakdown and keep track of your progress in the app.'
        }
      default:
        return {
          title: 'Ball collection',
          description: 'The Tennibot collects up to 40 balls a minute on clay or hard courts.'
        }
    }
  }

  return (
    <div className='mb-20'>
      <div className="relative text-t-off-white rounded-none overflow-hidden md:hidden" >
        <TSliderTwo
          slides={slides}
          contentContainerStyle="h-full "
          arrowsStyle="bottom-[3%]"
          onIndexChangeCb={onIndexChangeCb}
          />
      </div>
        <div className='py-10 w-[80%] mx-auto'>
          <h5 className='font-avenirBold uppercase text-lg text-center text-pretty text-t-off-white' >{handleContent(selected).title}</h5>
          <p className='font-plutoLight text-t-off-white text-center text-pretty' >{handleContent(selected).description}</p>
        </div>
    </div>
  )
}
