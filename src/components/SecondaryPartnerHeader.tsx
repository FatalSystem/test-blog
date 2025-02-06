import { useEffect, useState } from 'react'
import tennibotLogo from '../assets/tennibot-logo.svg'
import { Pages } from '@utils'
import { AnimatePresence, motion } from 'framer-motion'
import Banner from './Banner'

const links = [
  { label: 'Home', href: Pages.HOME },
  { label: 'Buy', href: Pages.BUY },
  { label: 'Tennis', href: Pages.TENNIS },
  { label: 'The rover', href: Pages.ROVER },
  { label: 'The station', href: Pages.STATION },
  { label: 'Clubs and Coaches', href: Pages.CLUBS },
  { label: 'Pickleball', href: Pages.PICKLEBALL },
  { label: 'Padel', href: Pages.PADEL },
  { label: 'About us', href: Pages.ABOUT },
  { label: 'FAQs', href: Pages.FAQ }
]
// TODO: Remake with framer motion
export default function PartnerHeader (): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='sticky top-0 z-50'>
      <header className='relative' >
        <AnimatePresence >
          {open && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='absolute h-[100vh] bg-t-off-black rounded-b-lg shadow-lg md:w-fit w-full right-0 top-16 custom-scrollbar overflow-y-scroll'
              >
                <ul className='px-10 flex flex-col pt-10'>
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`text-xl font-avenirBold text-t-off-white uppercase mb-10 transform ${[3, 4, 5].includes(index) ? 'pl-5' : ''} cursor-pointer hover:text-t-green transition duration-${
                        (index + 1) * 100
                      } ${open ? 'opacity-100' : 'opacity-0'} ease-in-out`}
                    >
                      {link.label}
                    </a>
                  ))}
                </ul>
              </motion.nav>
          )}
        </AnimatePresence>
        <div className="bg-[#262424] px-5 py-4 flex flex-row max-h-96 justify-between items-center z-20">
          <a href="/partner" className="align-middle flex z-20">
            <p className="font-avenir text-t-off-white uppercase lg:text-2xl text-md text-center" >The <span className="font-avenirBold" >Partner</span></p>
          </a>
          <div className='flex flex-row gap-14 text-sm text-t-off-white' >
            <a className='cursor-pointer font-avenir' >Overview</a>
            <a className='cursor-pointer font-avenir' >Specs</a>
            <a className='cursor-pointer font-avenir' >How It Works</a>
            <a className='cursor-pointer font-avenir' >Testimonials</a>
            <a className='cursor-pointer font-avenir' >Sports</a>
            <a className='cursor-pointer font-avenir' >Compare</a>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <div className=' flex flex-row gap-16' >
              {/* <a
              href='/reserve'
              className={`text-xl text-t-off-white font-avenirBold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ${open ? 'opacity-0' : 'opacity-100'} ease-in-out`}>
                Reserve
              </a> */}
              <a href={Pages.RESERVE} className={'w-64 tablet:w-52 2xl:w-80 text-md 2xl:text-xl 2xl:py-3 rounded-full py-2 font-avenir uppercase text-t-green border-2 transition duration-300 text-center bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black'}>Reserve now</a>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
