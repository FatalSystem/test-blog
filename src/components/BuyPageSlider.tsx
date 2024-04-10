import { TSlider } from './TSlider/TSlider'

const slides = [
  {
    style: "tablet:bg-[url('/images/buy/rovercourt-desktopxl.webp')] bg-[url('/images/buy/rovercourt.webp')] h-[40vh]"
  },
  {
    style: "tablet:bg-[url('/images/buy/stationcourt-desktopxl.webp')] bg-[url('/images/buy/stationcourt.webp')] h-[40vh]"
  },
  {
    style: "tablet:bg-[url('/images/buy/playercourt-desktopxl.webp')] bg-[url('/images/buy/playercourt.webp')] h-[40vh]"
  }

]

export default function BuyPageSlider (): JSX.Element {
  return (
    <TSlider
      slides={slides}
      contentContainerStyle="p-10 h-full sm:w-[70%]"
      // slideShades="bg-gradient-to-b from-[#232320]/[0.2] from-10% via-transparent via-70% to-[#232320]/[0.2] to-90%"
    //   dotContainerStyle="sm:hidden"
    //   dotContainerDesktopStyle="sm:flex bottom-[56vh]"
      arrowsStyle="bottom-[10%]"
        />
  )
}
