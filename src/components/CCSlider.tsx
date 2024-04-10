import { TSlider } from './TSlider/TSlider'

const containerStyle = 'font-avenir text-t-off-white flex flex-col size-full justify-center md:justify-start tablet:mt-0 mt-[-15%] sm:pt-[7vh] 2xl:pt-[7%] lg:max-w-[85%] 2xl:max-w-[75%] mx-auto '
const titleStyle = 'uppercase font-avenirBold text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-5'
const h1Style = 'font-avenirBold text-t-off-white lg:text-8xl mobilel:text-7xl mobilem:text-6xl text-5xl uppercase mt-20'
const descriptionStyle = 'font-plutoLight text-t-off-white  2xl:text-xl list-disc list-inside flex flex-col gap-5 mt-5'

const slides = {
  coaches: [
    {
      content: <h1 className={h1Style} >For<br className="md:hidden" /> coaches</h1>,
      style: "bg-[url('/images/commercial/coaches.webp')] md:h-[60vh] h-[770px] cc-slider"
    },
    {
      content:
      <div className={containerStyle} >
        <h3 className={titleStyle} >For coaches</h3>
        <ul className={descriptionStyle} >
          <li>
            Automate ball collection and give your students up to 30% more practice time
          </li>
          <li>
            More practice time means more reps, more feedback, and more value for your students
          </li>
          <li>
            Save your energy and make practices more enjoyable without the hassle of picking up balls
          </li>
          <li>
            Stand out and book more lessons as the coach with the coolest gadget in tennis
          </li>
        </ul>
      </div>,
      style: 'cc-slider md:h-[60vh] h-[770px] '
    }
  ],
  clubs: [
    {
      content: <h1 className={h1Style} >For<br className="md:hidden" /> clubs</h1>,
      style: "bg-[url('/images/commercial/clubs.webp')] md:h-[60vh] h-[770px] cc-slider"
    },
    {
      content:
      <div className={containerStyle} >
        <h3 className={titleStyle} >For clubs</h3>
        <ul className={descriptionStyle} >
          <li>
            Delight your members by providing the best new technology in tennis
          </li>
          <li>
            Save your grounds-crew time that would have been spent sweeping clay courts
          </li>
          <li>
            The Tennibot is a perfect rental for those practicing their serve, training with their kids, or using a ball machine
          </li>
        </ul>
      </div>,
      style: 'md:h-[60vh] h-[770px] cc-slider'
    }
  ],
  school: [
    {
      content: <h1 className={h1Style} >For<br className="md:hidden" /> schools</h1>,
      style: "bg-[url('/images/commercial/school.webp')] md:h-[60vh] h-[770px] cc-slider "
    },
    {
      content:
      <div className={containerStyle} >
        <h3 className={titleStyle} >For schools</h3>
        <ul className={descriptionStyle} >
          <li>
            Gain an edge over other tennis programs, train more effectively, and beat your rivals
          </li>
          <li>
            Players can hit hundreds more shots per hour during one on one practice sessions
          </li>
          <li>
            Use the time saved by not picking up balls to hydrate, recover, and learn
          </li>
        </ul>
      </div>,
      style: 'md:h-[60vh] h-[770px] cc-slider'
    }
  ]
}

interface IProps {
  type: 'coaches' | 'clubs' | 'school'
}

export default function CCSlider ({ type }: IProps): JSX.Element {
  return (
    <TSlider 
    slides={slides[type]}
    contentContainerStyle="p-10 sm:w-[80%] h-full m-auto"
    arrowsStyle="lg:bottom-[15%] min-[640px]:bottom-[50%] bottom-[12%]"
    dotContainerStyle="tablet:hidden flex gap-7"
    dotContainerDesktopStyle="tablet:flex lg:bottom-[10%] bottom-[10%] gap-7"
    arrowBreakpoint={1024}
    prevArrowStyle="lg:left-[10%] left-[5%]"
    nextArrowStyle="lg:right-[10%] right-[5%]"
    />
  )
}
