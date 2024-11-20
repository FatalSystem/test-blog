import { TSlider } from './TSlider/TSlider'

const containerStyle = 'font-avenir text-t-off-white flex flex-col size-full justify-center md:justify-start tablet:mt-0 mt-[-15%] sm:pt-[7vh] 2xl:pt-[7%] lg:max-w-[85%] 2xl:max-w-[75%] mx-auto '
const titleStyle = 'uppercase font-avenirBold text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-5'
const h1Style = 'font-avenirBold text-t-off-white lg:text-8xl mobilel:text-7xl mobilem:text-6xl text-5xl uppercase mt-20'
const descriptionStyle = 'font-plutoLight text-t-off-white  2xl:text-xl list-disc list-inside flex flex-col gap-5 mt-5'

const slides = {
  tennis: [
    {
      content: <>
            <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden " >
                <video style={{ boxShadow: 'inset 4px 4px 4px 6px black' }} className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
                    <source src="/videos/tennis-partner.mp4" type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
            <div className="mt-10">
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Tennis</h3>
                <p className="font-pluto text-t-off-white text-sm" >The most human ball machine you have ever practiced with! The Partner detects your movements and moves around the court to ensure a challenging practice for any shot you can think of.</p>
            </div>
        </>,
      style: 'bg-black md:h-[80vh] h-[550px] cc-slider'
    },
    {
      content: <>
        <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden " >
            <video style={{ boxShadow: 'inset 4px 4px 4px 6px black' }} className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
                <source src="/videos/padel-partner.mp4" type="video/mp4" />
                {'Your browser doesn\'t support the video tag.'}
            </video>
        </div>
        <div className="mt-10">
        <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Padel</h3>
        <p className="font-pluto text-t-off-white text-sm" >Perfect your bajada and chiquita with AI-powered drills that adapt to your style, keeping each rally challenging so you stay on your toes every time you step on the court.</p>
        </div>
    </>,
      style: 'bg-black md:h-[80vh] h-[550px] cc-slider'
    },
    {
      content: <>
            <div className="aspect-[16/9] w-[100%] mx-auto bg-cover bg-center rounded-xl overflow-hidden " >
                <video style={{ boxShadow: 'inset 4px 4px 4px 6px black' }} className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center" autoPlay loop muted playsInline>
                    <source src="/videos/pickle-partner.mp4" type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
            <div className="mt-10">
            <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Pickle</h3>
            <p className="font-pluto text-t-off-white text-sm" >Dinks, drives, and third shot drops - Practice any shot you want, anywhere on the court with the most realistic gameplay a ball machine can provide.</p>
            </div>
        </>,
      style: 'bg-black md:h-[80vh] h-[550px] cc-slider'
    }
  ]
}

interface IProps {
  type: 'tennis' | 'padel' | 'pickle'
}

export default function PartnerVideoSlider ({ type }: IProps): JSX.Element {
  return (
    <TSlider
    slides={slides[type]}
    contentContainerStyle="p-10 sm:w-[80%] bg-black h-full m-auto"
    arrowsStyle="lg:bottom-[15%] min-[640px]:bottom-[50%] mobilel:bottom-[5%] bottom-[12%]"
    dotContainerStyle="tablet:hidden mobilel:bottom-[3%] flex gap-7"
    dotContainerDesktopStyle="tablet:flex lg:bottom-[10%] mobilel:bottom-[3%] bottom-[10%] gap-7"
    arrowBreakpoint={1024}
    prevArrowStyle="lg:left-[10%] left-[5%]"
    nextArrowStyle="lg:right-[10%] right-[5%]"
    />
  )
}
