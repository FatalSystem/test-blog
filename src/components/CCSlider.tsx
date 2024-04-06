import { TSlider } from './TSlider/TSlider'

const containerStyle = 'font-avenir text-t-off-white flex flex-col size-full justify-center md:justify-start tablet:mt-0 mt-[-10%] sm:pt-[7vh] 2xl:pt-5 lg:max-w-[85%] 2xl:max-w-[75%] mx-auto '
const titleStyle = 'uppercase font-avenirBold text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-5'
const h1Style = 'font-avenirBold text-t-off-white lg:text-8xl mobilel:text-7xl mobilem:text-6xl text-5xl uppercase mt-20'
const descriptionStyle = 'font-plutoLight text-t-off-white  2xl:text-xl'

const slides = {
  coaches: [
    {
      content: <h1 className={h1Style} >For<br className="md:hidden" /> coaches</h1>,
      style: "bg-[url('/images/commercial/coaches.webp')] md:h-[60vh] h-[820px]"
    },
    {
      content:
      <div className={containerStyle} >
        <h3 className={titleStyle} >For coaches</h3>
        <p className={descriptionStyle} >
        With Tennibot automating ball collection in the background your students can get up to 30% more practice time. This means more reps, more feedback, and more value. Higher-value lessons translate to higher-paying students.<br /><br />You'll have more energy to coach and the practices will be more enjoyable without the hassle of picking up balls or sweeping courts. Plus, you'll stand out and book more lessons as a coach with the coolest tennis gadget!
        </p>
      </div>,
      style: 'md:h-[60vh] h-[820px]'
    }
  ],
  clubs: [
    {
      content: <h1 className={h1Style} >For<br className="md:hidden" /> clubs</h1>,
      style: "bg-[url('/images/commercial/clubs.webp')] md:h-[60vh] h-[820px]"
    },
    {
      content:
      <div className={containerStyle} >
        <h3 className={titleStyle} >For clubs</h3>
        <p className={descriptionStyle} >
        Dazzle your guests and open up new revenue streams for your club. Tennibot is the perfect addition for guests using a ball machine or as a solo rental device for those practicing their serve or training with their kids.<br/><br/>You'll also save your grounds crew time that would have been spent sweeping clay courts. The Tennibot works tirelessly to automate club court chores and leave guests happy and satisfied. Happy guests are much more likely to renew their memberships as well as refer new players.
        </p>
      </div>,
      style: 'md:h-[60vh] h-[820px]'
    }
  ],
  school: [
    {
      content: <h1 className={h1Style} >For<br className="md:hidden" /> schools</h1>,
      style: "bg-[url('/images/commercial/school.webp')] md:h-[60vh] h-[820px]"
    },
    {
      content:
      <div className={containerStyle} >
        <h3 className={titleStyle} >For schools</h3>
        <p className={descriptionStyle} >
        Gain an edge over other programs by maximizing training time for each athlete. During one-on-one practice sessions, players will be able to hit hundreds more shots per hour compared to training without the Tennibot.<br /><br />Players can hydrate and refresh while coaches give them their feedback instead of wasting valuable time and energy retrieving balls.
        </p>
      </div>,
      style: 'md:h-[60vh] h-[820px]'
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
