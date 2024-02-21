import { useArrowButtons, useDotButton } from '@hooks'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton } from './SliderControls'
import { useMediaQuery } from 'usehooks-ts'

const reviewStyle = 'font-avenir text-pretty'
const customerStyle = 'font-avenir text-pretty italic mt-3'
const containerStyle = 'grid grid-cols-2 gap-8'

const slidesMobile = [
  {
    content: <div>
        <p className={reviewStyle} >Wow, with your product, I can teach 6 to 8 hours a day now if I want to because it's picking up the balls for me! I think every tennis coach should have one of these.</p>
        <p className={customerStyle} >Danny K.</p>
        </div>,
    style: ''
  },
  {
    content: <div>
        <p className={reviewStyle} >Great machine! Thank you! I am loving my Tennibot!</p>
        <p className={customerStyle} >Bob F.</p>
        </div>,
    style: ''
  },
  {
    content: <div>
        <p className={reviewStyle} >My back feels better just looking at it!!</p>
        <p className={customerStyle} >Rhonda S.</p>
        </div>,
    style: ''
  },
  {
    content: <div>
        <p className={reviewStyle} >In my one on one lessons, the Tennibot saves me at least 10 minutes in that hour. If I was using the ball machine on my own, that would probably save me a good 15 minutes in an hour.</p>
        <p className={customerStyle} >Mitch H.</p>
        </div>,
    style: ''
  },
  {
    content: <div>
        <p className={reviewStyle} >It worked well! My kids love it! It was super light and easy to move around.</p>
        <p className={customerStyle} >Mike D.</p>
        </div>,
    style: ''
  },
  {
    content: <div>
        <p className={reviewStyle} >It’s picking up the balls great, I love the new ultrasonic sensors.</p>
        <p className={customerStyle} >Binu M.</p>
        </div>,
    style: ''
  }

]

const slidesDesktop = [
  {
    content:
    <div className={containerStyle} >
      <div>
        <p className={reviewStyle} >Wow, with your product, I can teach 6 to 8 hours a day now if I want to because it's picking up the balls for me! I think every tennis coach should have one of these.</p>
        <p className={customerStyle} >Danny K.</p>
      </div>
      <div>
        <p className={reviewStyle} >Great machine! Thank you! I am loving my Tennibot!</p>
        <p className={customerStyle} >Bob F.</p>
      </div>
    </div>,
    style: ''
  },
  {
    content:
    <div className={containerStyle} >
      <div>
        <p className={reviewStyle} >My back feels better just looking at it!!</p>
        <p className={customerStyle} >Rhonda S.</p>
      </div>
      <div>
        <p className={reviewStyle} >In my one on one lessons, the Tennibot saves me at least 10 minutes in that hour. If I was using the ball machine on my own, that would probably save me a good 15 minutes in an hour.</p>
        <p className={customerStyle} >Mitch H.</p>
      </div>
    </div>,
    style: ''
  },
  {
    content:
    <div className={containerStyle} >
      <div>
        <p className={reviewStyle} >It worked well! My kids love it! It was super light and easy to move around.</p>
        <p className={customerStyle} >Mike D.</p>
      </div>
      <div>
        <p className={reviewStyle} >It’s picking up the balls great, I love the new ultrasonic sensors.</p>
        <p className={customerStyle} >Binu M.</p>
      </div>
    </div>,
    style: ''
  }
]

export function TSlide ({ selectedIndex, index, className, containerStyle, children }): JSX.Element {
  return (
    <div className={`${className} bg-cover bg-center flex-[0_0_100%] relative flex items-center justify-center`}>
        <div className="w-[75%] h-[100%]" >
            {children}
        </div>
    </div>
  )
}

export function TSlider ({ contentContainerStyle, slides, arrowsStyle }): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false })
  const { selectedIndex } =
      useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useArrowButtons(emblaApi)

  return (
    <div className="bg-t-off-black">
        <div className="overflow-hidden" ref={emblaRef} >
            <div className="flex touch-pan-y">
                {slides.map((slide, index) => {
                  return (
                    <TSlide className={`${slide.style}`} key={index} index={index} selectedIndex={selectedIndex} containerStyle={contentContainerStyle} >
                        {slide.content}
                    </TSlide>
                  )
                })}
            </div>
        </div>

        <PrevButton onClick={onPrevButtonClick} animated className={`absolute inset-y-[50%] z-20 left-[3%] sm:bottom-[15%] drop-shadow-2xl ${arrowsStyle}`} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} animated className={`absolute inset-y-[50%] z-20 right-[3%] sm:bottom-[15%] drop-shadow-2xl ${arrowsStyle}`} disabled={nextBtnDisabled} />
    </div>
  )
}

export function CustomerReviews (): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  
  return (
    <TSlider slides={isDesktop ? slidesDesktop : slidesMobile} />
  )
}
