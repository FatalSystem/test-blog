import { useEffect, useState } from 'react'
import tennibotLogo from '../assets/tennibot-logo.svg'
import { Pages } from '@utils'
import { AnimatePresence, motion } from 'framer-motion'
import Banner from './Banner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './Dropdown'
import { Button } from './Button'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { eventBus } from '../utils/eventBus'

const links = [
  { label: 'Overview', href: 'overview' },
  { label: 'Specs', href: 'specs' },
  { label: 'How It Works', href: 'how-it-works' },
  { label: 'Testimonials', href: 'testimonials' },
  { label: 'Sports', href: 'sports' },
  { label: 'Compare', href: 'compare' }
]
// TODO: Remake with framer motion
export default function PartnerHeader (): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [showBanner, setShowBanner] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = eventBus.subscribe('bannerStateChange', (show: boolean) => {
      setShowBanner(show)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className={`sticky ${showBanner ? 'top-20 lg:top-14' : 'top-0'} z-50`}>
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
          <div className='lg:flex hidden flex-row gap-5 text-sm xl:text-base xl:gap-8 flex-wrap text-t-off-white' >
            {links.map((link, index) => {
              return (
                    <a key={index} onClick={() => {
                      const element = document.getElementById(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }} className='cursor-pointer font-avenir' >{link.label}</a>
              )
            })}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer lg:hidden flex flex-row items-center text-sm text-t-off-white font-avenir border-[1px] border-t-off-white rounded-lg px-4 py-2' >
                Overview
                <ChevronDown size={16} className="text-t-off-white ml-2" />
            </DropdownMenuTrigger >
            <DropdownMenuContent className=' mt-2 bg-[#262424] text-t-off-white' >
                {links.map((link, index) => {
                  return (
                        <DropdownMenuItem key={index} onClick={() => {
                          const element = document.getElementById(link.href)
                          console.log(element)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }} className='cursor-pointer font-avenir' >{link.label}</DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='lg:flex flex-row hidden  items-center justify-center'>
            <div className=' flex flex-row gap-5' >
              {/* <a
              href='/reserve'
              className={`text-xl text-t-off-white font-avenirBold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ${open ? 'opacity-0' : 'opacity-100'} ease-in-out`}>
                Reserve
              </a> */}
              <a href={Pages.RESERVE} className={'w-28 tablet:w-52 2xl:w-80 text-md 2xl:text-xl 2xl:py-3 rounded-full py-2 font-avenir uppercase text-t-green border-2 transition duration-300 text-center bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black'}>Reserve for $499</a>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
