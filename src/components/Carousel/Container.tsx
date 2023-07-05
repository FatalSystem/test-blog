import Carousel from "./Carousel"
import CarouselItem from "./CarouselItem"
import time from "../../assets/time.svg"
import bbc from "../../assets/bbc.svg"
import latimes from "../../assets/latimes.svg"
import mashable from "../../assets/mashable.svg"
import digitaltrends from "../../assets/digital-trends.svg"

export default function Container() {
  return (
    <Carousel>
      <CarouselItem
        img={time}
        alt="Time"
        description={`"You can think of it as a Roomba for a tennis court instead of your living room!"`}
      />
      <CarouselItem
        img={bbc}
        alt="BBC"
        description={`"The Tennibot autonomously patrols the courts and collects the balls that you lobbed, smashed or mis-hit."`}
      />
      <CarouselItem
        img={latimes}
        alt="LA Times"
        description={`"Every tennis player's dream."`}
      />
      <CarouselItem
        img={mashable}
        alt="Mashable"
        description={`"You will never have to pick up a tennis ball again."`}
      />
      <CarouselItem
        img={digitaltrends}
        alt="Digitaltrends"
        description={`"A must-have for any tennis club."`}
      />
    </Carousel>
  )
}

/* <CarouselItem>
        <div>
          <img src={bbc} alt="BBC" className=" max-w-sm max-h-11 " />
          <p className="  ">
            You can think of it as a Roomba for a tennis court instead of your
            living room!
          </p>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div>
          <img src={latimes} alt="LA Times" className=" max-w-sm max-h-11" />
          <p className="  ">
            You can think of it as a Roomba for a tennis court instead of your
            living room!
          </p>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div>
          <img src={mashable} alt="Mashable" className=" max-w-sm max-h-11" />
          <p className="  ">
            You can think of it as a Roomba for a tennis court instead of your
            living room!
          </p>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div>
          <img
            src={digitaltrends}
            alt="Mashable"
            className=" max-w-sm max-h-11"
          />
          <p className="  ">
            You can think of it as a Roomba for a tennis court instead of your
            living room!
          </p>
        </div>
      </CarouselItem> */
