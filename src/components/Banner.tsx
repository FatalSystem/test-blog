import { X } from 'lucide-react'

interface IBanner {
  show: boolean
  onClose: () => void
}

export default function Banner ({ show, onClose }: IBanner): JSX.Element {
  return (
    <div className={` bg-t-dark-green font-avenirBold text-t-off-white flex flex-row items-center drop-shadow-lg transition-all duration-800 ease-in-out overflow-hidden ${show ? 'lg:h-14 h-16' : 'h-0'}`} >
        <a href='https://tally.so/r/w2PgKp' target='_blank' rel="noreferrer" className='py-3 cursor-pointer ml-auto w-full text-left text-xs mobilem:text-sm mobilel:text-base mobilel:text-center sm:mr-0 mr-14 pl-5 2xl:text-lg '>
            Take a <span className='underline text-t-green' >quick survey</span> to get a free Wristband!
        </a>
        <button className=' absolute z-10 right-[5%]' onClick={onClose} ><X className='size-8' /></button>
    </div>
  )
}
