import Carousel from './Carousel'
import CarouselItem, { type ICarouselItem } from './CarouselItem'
import time from '@assets/front-page/news/time.svg'
import bbc from '@assets/front-page/news/bbc.svg'
import latimes from '@assets/front-page/news/latimes.svg'
import mashable from '@assets/front-page/news/mashable.svg'
import digitaltrends from '@assets/front-page/news/digital-trends.svg'

interface ICarouselContainer {
  type: 'news' | 'benefits' | 'testimonials'
}

const newsContent = [
  {
    img: time,
    alt: 'Time',
    description: '"You can think of it as a Roomba for a tennis court instead of your living room!"'
  },
  {
    img: bbc,
    alt: 'BBC',
    description: '"The Tennibot autonomously patrols the courts and collects the balls that you lobbed, smashed or mis-hit."'
  },
  {
    img: latimes,
    alt: 'LA Times',
    description: '"Every tennis player\'s dream."'
  },
  {
    img: mashable,
    alt: 'Mashable',
    description: '"You will never have to pick up a tennis ball again."'
  },
  {
    img: digitaltrends,
    alt: 'Digitaltrends',
    description: '"A must-have for any tennis club."'
  }
]

export default function Container ({ type }: ICarouselContainer): JSX.Element | undefined {
  const handleCarouselContainer = (): ICarouselItem[] => {
    switch (type) {
      case 'news':
        return newsContent
      default:
        return newsContent
    }
  }
  const content: ICarouselItem[] = handleCarouselContainer()
  if (content) {
    return (
      <Carousel
        theme='dark'
      >
        {content.map((contentItem, key) => (
          <CarouselItem
            key={key}
            img={contentItem.img}
            alt={contentItem.alt}
            description={contentItem.description}
          />
        ))}
      </Carousel>
    )
  }
  return undefined
}
