import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import tennibotLogo from '@assets/new/tennibot-footer-logo.svg'

const partnerLinks = [
  { label: 'Tennis', href: '/tennis/ball-machine' },
  { label: 'Pickleball', href: '/pickleball/ball-machine' },
  { label: 'Padel', href: '/padel/ball-machine' }
]

const roverLinks = [
  { label: 'Tennis', href: '/tennis/ball-collector' },
  { label: 'Pickleball', href: '/pickleball/ball-collector' },
  { label: 'Padel', href: '/padel/ball-collector' }
]

const howItWorksLinks = [
  { label: 'Tennis', href: '/tennis' },
  { label: 'Pickleball', href: '/pickleball' },
  { label: 'Padel', href: '/padel' }
]

export default function NHeader (): React.JSX.Element {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState<boolean>(false)
  const [howItWorksDropdownOpen, setHowItWorksDropdownOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [showBanner, setShowBanner] = useState<boolean>(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState<boolean>(true) // Product open by default
  const [mobileHowItWorksOpen, setMobileHowItWorksOpen] = useState<boolean>(false)
  const handleMobileOpen = (): void => { setOpen(!open) }

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
              <div className='flex flex-row bg-black px-2 py-1 items-baseline gap-0 rounded-full' >
                <div
                  className='relative'
                  onMouseEnter={(): void => { setProductsDropdownOpen(true) }}
                  onMouseLeave={(): void => { setProductsDropdownOpen(false) }}
                >
                  <a
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
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                            <span className='font-avenir'>The</span> Partner:<br />
                            <p className="text-sm font-avenir opacity-60" >Ball Machine</p>
                        </a>
                        {partnerLinks.map((link, index) => (
                          <>
                            <a
                              key={index}
                              href={link.href}
                              className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                            >
                              {link.label}
                            </a>
                            {/* {index !== partnerLinks.length - 1 && (
                              <hr className='h-[1.5px] rounded-full w-[60%] mx-auto bg-t-off-white opacity-40' />
                            )} */}
                          </>
                        ))}
                        <hr className='h-[1px] rounded-full w-[80%] ml-5 my-3 bg-t-off-white opacity-30' />
                        <a
                        className={'text-lg sm:block rounded-full py-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                            <span className='font-avenir'>The</span> Rover:<br />
                            <p className="text-sm font-avenir opacity-60" >Ball Collector</p>
                        </a>
                        {roverLinks.map((link, index) => (
                          <>
                            <a
                              key={index}
                              href={link.href}
                              className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                            >
                              {link.label}
                            </a>
                            {/* {index !== roverLinks.length - 1 && (
                              <hr className='h-[1.5px] rounded-full w-[60%] mx-auto bg-t-off-white opacity-40' />
                            )} */}
                          </>
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
                        href="/tennis"
                        className={'text-lg sm:block rounded-full py-3 px-5 text-t-off-white hover:text-t-green my-auto font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                            Tennis
                        </a>
                        <a
                        href="/pickleball"
                        className={'text-lg sm:block hover:text-t-green rounded-full py-3 px-5 text-t-off-white my-auto font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                            Pickleball
                        </a>
                        <a
                        href="/padel"
                        className={'text-lg sm:block hover:text-t-green rounded-full py-3 px-5 text-t-off-white my-auto font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                            Padel
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </div>
          </div>
          <div className="relative sm:hidden my-auto flex flex-row">
              <button onClick={handleMobileOpen} aria-label="Main Menu" className="w-12 h-10 ">
                <div className="block w-10  absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                  <span
                    aria-hidden="true"
                    className={`block rounded-md absolute h-[1px] w-10 bg-t-off-white transform transition duration-500 ease-in-out ${
                      open ? 'rotate-45' : '-translate-y-2.5'
                    }`}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={`block absolute rounded-md h-[1px] w-5 bg-t-off-white  transform transition  duration-500  ease-in-out  ${
                      open && 'opacity-0'
                    } `}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={`block absolute rounded-md h-[1px] w-10  bg-t-off-white transform  transition duration-500 ease-in-out ${
                      open ? '-rotate-45' : ' translate-y-2.5'
                    } `}
                  ></span>
                </div>
              </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='absolute top-full left-[10%] w-[80%] mt-[-20px] pt-[40px] h-[600px] overflow-y-scroll pb-2 mx-auto bg-black rounded-b-lg shadow-lg min-w-[200px] z-50'
              >
                {/* Product Section */}
                <div className="mb-4">
                  <button
                    onClick={() => {
                      if (mobileHowItWorksOpen) {
                        setMobileHowItWorksOpen(false)
                      }
                      setMobileProductsOpen(!mobileProductsOpen)
                    }}
                    className={`w-full flex items-center justify-between text-lg rounded-full px-5 py-3 ${mobileProductsOpen ? 'text-t-green' : 'text-t-off-white'} font-avenirBold uppercase transform transition duration-500 ease-in-out text-t-green`}
                  >
                    <span>Products</span>
                    <svg className={`w-5 h-5 transition-all ease-in-out duration-500 ${mobileProductsOpen ? 'rotate-180 text-t-green' : 'text-t-off-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='overflow-hidden'
                      >
                        <div className="pl-4">
                          <a
                          className={'text-lg rounded-full px-5 text-t-off-white font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                              <span className='font-avenir'>The</span> Partner:<br />
                              <p className="text-sm ml-5 font-avenir opacity-60 mb-[-20px]" >Ball Machine</p>
                          </a>
                          {partnerLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.href}
                              className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                            >
                              {link.label}
                            </a>
                          ))}
                          <hr className='h-[1px] rounded-full w-[80%] ml-5 mt-3 mb-5 bg-t-off-white opacity-30' />
                          <a
                          className={'text-lg sm:block rounded-full pt-2 px-5 text-t-off-white my-auto font-avenirBold uppercase transform transition duration-500 ease-in-out'}>
                              <span className='font-avenir'>The</span> Rover:<br />
                              <p className="text-sm font-avenir opacity-60 ml-5 mb-[-20px]" >Ball Collector</p>
                          </a>
                          {roverLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.href}
                              className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <hr className='h-[1px] rounded-full w-[80%] ml-5 mt-3 mb-5 bg-t-off-white opacity-30' />

                {/* How it Works Section */}
                <div>
                  <button
                    onClick={() => {
                      if (mobileProductsOpen) {
                        setMobileProductsOpen(false)
                      }
                      setMobileHowItWorksOpen(!mobileHowItWorksOpen)
                    }}
                    className={`w-full flex items-center justify-between text-lg rounded-full px-5 py-3 ${mobileHowItWorksOpen ? 'text-t-green' : 'text-t-off-white'} font-avenirBold uppercase transform transition duration-500 ease-in-out`}
                  >
                    <span>How it works</span>
                    <svg className={`w-5 h-5 transition-all ease-in-out duration-500 ${mobileHowItWorksOpen ? 'rotate-180 text-t-green' : 'text-t-off-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {mobileHowItWorksOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='overflow-hidden pb-20'
                      >
                        <div>
                          {howItWorksLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.href}
                              className='block pl-10 py-3 text-t-off-white hover:text-t-green hover:bg-black/20 transition-colors duration-200 font-avenirBold uppercase text-sm'
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  )
}
