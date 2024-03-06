import { useState } from 'react'
import tennibotLogo from '../assets/tennibot-logo.svg'
import { Pages } from '@utils'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { label: 'Home', href: Pages.HOME },
  { label: 'Buy', href: Pages.BUY },
  { label: 'The rover', href: Pages.ROVER },
  { label: 'The station', href: Pages.STATION },
  { label: 'About us', href: Pages.ABOUT },
  { label: 'Clubs and Coaches', href: Pages.CLUBS },
  { label: 'FAQs', href: Pages.FAQ }
]
// TODO: Remake with framer motion
export default function Header (): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = (): void => { setOpen(!open) }

  return (
    <header className='sticky top-0 z-50'>
      <AnimatePresence >
        {open && (
            <motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute md:h-[100vh] h-[70vh] bg-t-off-black rounded-b-lg shadow-lg backdrop-blur-xl md:w-fit w-full right-0 transform top-16 -translate-y-1/4 transition ease-in-out duration-500'
            >
              <ul className='px-10 flex flex-col pt-10'>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-xl text-t-white font-bold uppercase mb-10 transform cursor-pointer hover:text-t-green transition duration-${
                      (index + 1) * 100
                    } ${open ? 'opacity-100' : 'opacity-0'} ease-in-out`}
                  >
                    {link.label}
                  </a>
                ))}r
              </ul>
            </motion.nav>
        )}
      </AnimatePresence>
      <div className="bg-t-off-black px-5 py-4 flex flex-row max-h-96 justify-between z-20">
        <a href="/" className="align-middle flex z-20">
          <img src={tennibotLogo.src} width={40} alt="Tennibot Logo" />
        </a>
        <div className='flex flex-row items-center justify-center'>
          <div className='pr-16 hidden sm:flex flex-row gap-16' >
            <a
            href={Pages.HOME}
            className={`text-xl text-t-white font-bold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ${open ? 'opacity-0' : 'opacity-100'} ease-in-out`}>
              Home
            </a>
            <a
            href={Pages.BUY}
            className={`text-xl text-t-white font-bold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ${open ? 'opacity-0' : 'opacity-100'} ease-in-out`}>
              Buy
            </a>
          </div>
          <div className="relative my-auto flex flex-row">
            <button onClick={handleOpen} className="w-12 h-10 ">
              <div className="block w-10  absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={`block rounded-md absolute h-0.5 w-10 bg-t-white transform transition duration-500 ease-in-out ${
                    open ? 'rotate-45' : '-translate-y-2.5'
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute rounded-md h-0.5 w-10 bg-t-white  transform transition  duration-500  ease-in-out  ${
                    open && 'opacity-0'
                  } `}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute rounded-md h-0.5 w-10  bg-t-white transform  transition duration-500 ease-in-out ${
                    open ? '-rotate-45' : ' translate-y-2.5'
                  } `}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
