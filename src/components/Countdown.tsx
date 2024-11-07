import React, { useState, useEffect } from 'react'

const countdownItem = 'font-plutoBold text-center text-t-off-white text-xl mobilel:w-fit w-[30%]'
const TARGET_DATE = new Date('2024-11-21T02:00:00')

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft() // Initial calculation

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-row justify-center py-5 flex-wrap gap-5 mobilel:w-fit mobilel:py-2 rounded-lg mt-5" >
        <div className={countdownItem} >
            <p>{timeLeft.days}</p>
            <p className="font-plutoLight" >Days</p>
        </div>

        <div className={countdownItem} >
            <p>{timeLeft.hours}</p>
            <p className="font-plutoLight" >Hours</p>
        </div>

        <div className={countdownItem} >
            <p>{timeLeft.minutes}</p>
            <p className="font-plutoLight" >Minutes</p>
        </div>

        <div className={countdownItem} >
            <p>{timeLeft.seconds}</p>
            <p className="font-plutoLight" >Seconds</p>
        </div>
    </div>
  )
}
