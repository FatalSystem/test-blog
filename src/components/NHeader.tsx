import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import tennibotLogo from '@assets/new/tennibot-footer-logo.svg'

const productLinks = [
  { label: 'Tennis', href: '/tennis' },
  { label: 'Pickleball', href: '/pickleball' },
  { label: 'Padel', href: '/station' }
]

const howItWorksLinks = [
  { label: 'Ball Machine', href: '/getting-started' },
  { label: 'Ball Collector', href: '/setup-guide' }
]

export default function NHeader (): React.JSX.Element {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState<boolean>(false)
  const [howItWorksDropdownOpen, setHowItWorksDropdownOpen] = useState<boolean>(false)

  const [showBanner, setShowBanner] = useState<boolean>(false)

  const closeBanner = (): void => {
    window.localStorage.setItem('showShippingBanner', 'false')
    setShowBanner(false)
  }

  const shouldShow = (): void => {
    if (window.localStorage.getItem('showShippingBanner') === null && window.location.pathname === '/') {
      setShowBanner(true)
    }
  }

  useEffect(() => {
    shouldShow()
  }, [])
  return (
    <div className='sticky top-5 z-50'>
      <header className='relative' >

        <div className="bg-black max-w-7xl w-[95%] rounded-full mx-auto mt-5 px-5 py-4 flex flex-row max-h-96 justify-between z-20">
          <a href="/" className="align-middle flex z-20">
            <img src={tennibotLogo.src} width={150} alt="Tennibot Logo" />
          </a>
          <div className='flex flex-row items-center justify-center'>
              <div className='hidden sm:flex flex-row bg-t-off-black px-2 py-1 items-baseline gap-0 rounded-full' >
                <div
                  className='relative'
                  onMouseEnter={(): void => { setProductsDropdownOpen(true) }}
                  onMouseLeave={(): void => { setProductsDropdownOpen(false) }}
                >
                  <a
                    href='/partner'
                    className='text-lg hidden sm:block text-t-off-white rounded-full py-2 px-5 my-auto font-avenirBold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ease-in-out'
                  >
                    Products
                  </a>

                  <AnimatePresence>
                    {productsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='absolute top-full left-0 mt-2 bg-black rounded-lg shadow-lg py-2 min-w-[200px] z-50'
                      >
                        <a
                        href='/tennis'
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform cursor-pointer  transition duration-500 ease-in-out'}>
                            <span className='font-avenir'>The</span> Partner
                        </a>
                        {productLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                          >
                            {link.label}
                          </a>
                        ))}
                        <a
                        href='/tennis'
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform cursor-pointer  transition duration-500 ease-in-out'}>
                            <span className='font-avenir'>The</span> Rover
                        </a>
                        {productLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                          >
                            {link.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className='relative'
                  onMouseEnter={(): void => { setHowItWorksDropdownOpen(true) }}
                  onMouseLeave={(): void => { setHowItWorksDropdownOpen(false) }}
                >
                  <a
                    href='/how-it-works'
                    className='text-lg hidden sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform cursor-pointer hover:text-t-green transition duration-500 ease-in-out'
                  >
                    How it works
                  </a>

                  <AnimatePresence>
                    {howItWorksDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='absolute top-full left-0 mt-2 bg-black rounded-lg shadow-lg py-2 min-w-[200px] z-50'
                      >
                        <a
                        href='/tennis'
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform cursor-pointer  transition duration-500 ease-in-out'}>
                            Tennis
                        </a>
                        {howItWorksLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                          >
                            {link.label}
                          </a>
                        ))}
                        <a
                        href='/tennis'
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform cursor-pointer  transition duration-500 ease-in-out'}>
                            Pickleball
                        </a>
                        {howItWorksLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                          >
                            {link.label}
                          </a>
                        ))}
                        <a
                        href='/tennis'
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform cursor-pointer  transition duration-500 ease-in-out'}>
                            Padel
                        </a>
                        {howItWorksLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                          >
                            {link.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
