import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface IBanner {
  show: boolean
  onClose: () => void
}

export default function Banner ({ show, onClose }: IBanner): JSX.Element {
  // const [timeRemaining, setTimeRemaining] = useState('')

  // useEffect(() => {
  //   const endDate = new Date('2024-09-28T00:00:00') // September 28, 12:00 AM

  //   const updateCountdown = () => {
  //     const now = new Date()
  //     const difference = endDate.getTime() - now.getTime()

  //     if (difference > 0) {
  //       const hours = Math.floor(difference / (1000 * 60 * 60))
  //       setTimeRemaining(`${hours} hour${hours > 1 ? 's' : ''}`)
  //     } else {
  //       setTimeRemaining('1 hour')
  //       // clearInterval(timer)
  //     }
  //   }

  //   updateCountdown() // Initial call
  //   const timer = setInterval(updateCountdown, 60000) // Update every minute

  //   return () => clearInterval(timer)
  // }, [])

  return (
    <div className={` bg-t-dark-green font-avenirBold text-t-off-white flex flex-row items-center drop-shadow-lg transition-all duration-800 ease-in-out overflow-hidden ${show ? 'lg:h-14 h-20' : 'h-0'}`} >
        <a href='/reserve' rel="noreferrer" className='py-3 cursor-pointer ml-auto w-full text-left text-xs mobilem:text-xs mobilel:text-sm mobilel:text-center md:mr-0 sm:mr-20 mr-14 pl-5 2xl:text-lg '>
          Reserve by Dec.10th and get a mini Partner 3D-printed gift under your Christmas tree!
        </a>
        <button className=' absolute z-10 right-[5%]' onClick={onClose} ><X className='size-8' /></button>
    </div>
  )
}
