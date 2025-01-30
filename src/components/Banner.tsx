import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface IBanner {
  show: boolean
  onClose: () => void
}

export default function Banner ({ show, onClose }: IBanner): JSX.Element {
  const [partnersLeft, setPartnersLeft] = useState(47)

  useEffect(() => {
    const startDate = new Date('2025-01-17')
    const currentDate = new Date()
    const daysDifference = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    // Calculate remaining partners (decrease by 4 per day)
    const remaining = Math.max(0, 47 - (daysDifference * 4))
    setPartnersLeft(remaining)
  }, [])

  return (
    <div className={` bg-t-dark-green font-avenir text-t-off-white flex flex-row items-center drop-shadow-lg transition-all duration-800 ease-in-out overflow-hidden ${show ? 'lg:h-14 h-20' : 'h-0'}`} >
        <a href='/reserve' target='_blank' rel="noreferrer" className='py-3 cursor-pointer ml-auto w-full text-left text-xs mobilem:text-xs mobilel:text-sm mobilel:text-center md:mr-0 sm:mr-20 mr-14 pl-5 2xl:text-lg '>
          Questions? Give us a ring at <a href='tel:251-277-8022' className='text-t-off-white font-avenirBold underline text-nowrap flex-wrap' >251-277-8022</a>
        </a>
        <button className=' absolute z-10 right-[5%]' onClick={onClose} ><X className='size-8' /></button>
    </div>
  )
}
