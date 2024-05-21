import { TSliderTwo } from './TSliderTwo'

const slides = [
  {
    style: "tablet:bg-[url('/images/buy/rovercourt-desktopxl.webp')] bg-[url('/images/buy/rovercourt.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    style: "tablet:bg-[url('/images/buy/rover-closeup-desktopxl.webp')] bg-[url('/images/buy/rover-closeup.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    style: "tablet:bg-[url('/images/buy/rover-transport-desktopxl.webp')] bg-[url('/images/buy/rover-transport.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    style: "tablet:bg-[url('/images/buy/stationcourt-desktopxl.webp')] bg-[url('/images/buy/stationcourt.webp')] sm:h-[70vh] h-[45vh]"
  },
  {
    style: "tablet:bg-[url('/images/buy/station-closeup-desktopxl.webp')] bg-[url('/images/buy/station-closeup.webp')] sm:h-[70vh] h-[45vh]"
  }

]

export default function BuyPageSlider (): JSX.Element {
  return (
    <TSliderTwo
      slides={slides}
      contentContainerStyle="p-10 h-full sm:w-[70%]"
      // slideShades="bg-gradient-to-b from-[#232320]/[0.2] from-10% via-transparent via-70% to-[#232320]/[0.2] to-90%"
    //   dotContainerStyle="sm:hidden"
    //   dotContainerDesktopStyle="sm:flex bottom-[56vh]"
      arrowsStyle="bottom-[3%]"
        />
  )
}
