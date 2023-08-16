import Carousel from "./Carousel"
import CarouselItem, { ICarouselItem } from "./CarouselItem"
import time from "../../assets/time.svg"
import bbc from "../../assets/bbc.svg"
import latimes from "../../assets/latimes.svg"
import mashable from "../../assets/mashable.svg"
import digitaltrends from "../../assets/digital-trends.svg"

interface ICarouselContainer {
  type: "news" | "benefit"
}

const newsContent = [
  {
    img: time,
    alt: "Time",
    description: `"You can think of it as a Roomba for a tennis court instead of your living room!"`,
  },
  {
    img: bbc,
    alt: "BBC",
    description: `"The Tennibot autonomously patrols the courts and collects the balls that you lobbed, smashed or mis-hit."`,
  },
  {
    img: latimes,
    alt: "LA Times",
    description: `"Every tennis player's dream."`,
  },
  {
    img: mashable,
    alt: "Mashable",
    description: `"You will never have to pick up a tennis ball again."`,
  },
  {
    img: digitaltrends,
    alt: "Digitaltrends",
    description: `"A must-have for any tennis club."`,
  },
]

const benefitContent = [
  {
    description: (
      <p className="max-w-sm font-avenir uppercase px-5 text-xl text-center whitespace-normal text-t-black">
        {" "}
        {/* text-4xl */}
        <strong>20%</strong> OF YOUR TIME ON THE COURT IS SPENT PICKING UP BALLS
      </p>
    ),
  },
  {
    description: (
      <p className=" max-w-xs font-avenir uppercase px-5 text-xl text-center whitespace-normal text-t-black">
        {" "}
        {/* text-4xl */}
        WITH TENNIBOT, THAT NUMBER IS ALMOST <strong>ZERO</strong>
      </p>
    ),
  },
  {
    description: (
      <p className=" max-w-lg font-avenir uppercase px-5 text-xl pb-5 text-center whitespace-normal text-t-black">
        {" "}
        {/* text-3xl */}
        YOU COULD BE HITTING HUNDREDS MORE SHOTS,{" "}
        <strong>EVERY TIME YOU PRACTICE</strong>
      </p>
    ),
  },
]

export default function Container({ type }: ICarouselContainer) {
  const content: ICarouselItem[] =
    type === "news" ? newsContent : benefitContent
  if (content)
    return (
      <Carousel
        theme={type === "news" ? "dark" : "light"}
        callToAction={
          type === "benefit"
            ? { onClick: "/", theme: "dark", text: "How does it work?" }
            : undefined
        }
      >
        {content.map((contentItem) => (
          <CarouselItem
            img={contentItem.img}
            alt={contentItem.alt}
            description={contentItem.description}
            containerStyle={
              type === "benefit"
                ? "inline-flex items-end h-28 w-full justify-center"
                : undefined
            }
          />
        ))}
      </Carousel>
    )
}
