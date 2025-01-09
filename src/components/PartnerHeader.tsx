import { useEffect, useState } from 'react'
import tennibotLogo from '../assets/tennibot-logo.svg'
import { Pages } from '@utils'
import { AnimatePresence, motion } from 'framer-motion'
import Banner from './Banner'
import mixpanel from 'mixpanel-browser'
import { useMixpanel } from '@hooks'

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
  const { initialize, trackEvent } = useMixpanel()
  const [open, setOpen] = useState<boolean>(false)
  // const handleOpen = (): void => { setOpen(!open) }

  const [showBanner, setShowBanner] = useState<boolean>(false)

  const closeBanner = (): void => {
    window.localStorage.setItem('showTCBanner', 'false')
    setShowBanner(false)
  }

  const shouldShow = (): void => {
    if (window.localStorage.getItem('showTCBanner') === null && window.location.pathname === '/partner/') {
      setShowBanner(true)
    }
  }

  useEffect(() => {
    shouldShow()
    initialize()
  }, [])

  return (
    <div className='sticky top-0 z-50'>
      <Banner show={showBanner} onClose={closeBanner} />
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
        <div className="bg-t-off-black px-5 py-4 flex flex-row max-h-96 justify-between z-20">
          <a href="/" className="align-middle flex z-20">
            <img src={tennibotLogo.src} width={40} alt="Tennibot Logo" />
          </a>
          <div className='flex flex-row items-center justify-center'>
            <div className=' flex flex-row gap-16' >
              <a
              onClick={() => {
                trackEvent('Home to reserve')
                window.location.href = '/reserve'
              }}
              className={`text-xl text-t-off-white font-avenirBold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ${open ? 'opacity-0' : 'opacity-100'} ease-in-out`}>
                Reserve
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
