import Carousel from "./Carousel"
import CarouselItem, { ICarouselItem } from "./CarouselItem"
import time from "../../assets/time.svg"
import bbc from "../../assets/bbc.svg"
import latimes from "../../assets/latimes.svg"
import mashable from "../../assets/mashable.svg"
import digitaltrends from "../../assets/digital-trends.svg"

interface ICarouselContainer {
  type: "news" | "benefits" | "testimonials"
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
      <p className="max-w-xs font-avenir uppercase px-5 text-xl whitespace-normal  text-center text-t-black ">
        <strong>20%</strong> OF YOUR TIME ON THE COURT IS SPENT PICKING UP BALLS
      </p>
    ),
  },
  {
    description: (
      <p className=" max-w-xs font-avenir uppercase px-5 text-xl text-center whitespace-normal text-t-black">
        WITH TENNIBOT, THAT NUMBER IS ALMOST <strong>ZERO</strong>
      </p>
    ),
  },
  {
    description: (
      <p className=" max-w-lg font-avenir uppercase px-5 text-xl pb-5 text-center whitespace-normal text-t-black">
        YOU COULD BE HITTING HUNDREDS MORE SHOTS,{" "}
        <strong>EVERY TIME YOU PRACTICE</strong>
      </p>
    ),
  },
]

const testimonialContent = [
  {
    description: (
      <p className=" max-w-xs font-avenir uppercase px-5 text-xl text-center whitespace-normal text-t-black">
        "I think every tennis coach should have one of these."
      </p>
    ),
  },
  {
    description: (
      <p className=" max-w-xs font-avenir uppercase px-5 text-xl text-center whitespace-normal text-t-black">
        "I think every tennis coach should have one of these."
      </p>
    ),
  },
  {
    description: (
      <p className=" max-w-xs font-avenir uppercase px-5 text-xl text-center whitespace-normal text-t-black">
        "I think every tennis coach should have one of these."
      </p>
    ),
  },
]

export default function Container({ type }: ICarouselContainer) {
  const handleCarouselContainer = (): ICarouselItem[] => {
    switch (type) {
      case "news":
        return newsContent
      case "benefits":
        return benefitContent
      case "testimonials":
        return testimonialContent
    }
  }
  const content: ICarouselItem[] = handleCarouselContainer()
  if (content)
    return (
      <Carousel
        theme={type === "news" ? "dark" : "light"}
        callToAction={
          type === "benefits"
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
              type === "benefits"
                ? "inline-flex items-end h-28 w-full justify-center"
                : undefined
            }
          />
        ))}
      </Carousel>
    )
}
