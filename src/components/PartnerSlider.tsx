import { TSliderTwo } from './TSliderTwo'

const slides = [
  {
    style: "bg-[url('/images/partner/founder-2.jpeg')] sm:h-[55vh] h-[45vh]"
  },
  {
    style: "bg-[url('/images/partner/founder.jpg')] sm:h-[55vh] h-[45vh] bg-bottom"
  }
]
// sm:h-[70vh] h-[45vh]
export default function PartnerSlider (): JSX.Element {
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
