import { useState } from 'react'

const titleStyle = 'text-t-off-white text-left font-avenirBold text-2xl md:text-2xl lg:text-xl xl:text-2xl mb-4'
const itemStyle = 'text-sm md:text-xs xl:text-sm 2xl:text-base'

export default function BuySelection (): JSX.Element {
  // const [isChecked, setIsChecked] = useState<boolean>(false)
  const [selected, setSelected] = useState<number>(1)
  const [viewMore, setViewMore] = useState({ first: false, second: false, third: false })

  const handleNavigation = (product: number): void => {
    if (product === 0) {
      edgetag('tag', 'initiateCheckout', {
        currency: 'USD',
        value: 95,
        checkoutUrl: 'https://store.tennibot.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNDQzMTEyOTExNjY4ODMsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiAxNzE2OTEyMjkxLCAic2VsbGluZ19wbGFuX2dyb3VwX2lkIjogODg2NDQwMDk5fV19&store_id=190268',
        contents: [
          {
            id: '8318017011875',
            quantity: 1,
            item_price: 95,
            title: 'Monthly Plan'
          }
        ]
      })
      window.location.href = 'https://store.tennibot.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNDQzMTEyOTExNjY4ODMsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiAxNzE2OTEyMjkxLCAic2VsbGluZ19wbGFuX2dyb3VwX2lkIjogODg2NDQwMDk5fV19&store_id=190268'
      return
    }

    if (product === 1) {
      edgetag('tag', 'initiateCheckout', {
        currency: 'USD',
        value: 995,
        checkoutUrl: 'https://store.tennibot.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNDQzMTEyNzQ0MjI0MzUsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiAxNzE2ODc5NTIzLCAic2VsbGluZ19wbGFuX2dyb3VwX2lkIjogODg2NDA3MzMxfV19&store_id=190268',
        contents: [
          {
            id: '8318008819875',
            quantity: 1,
            item_price: 995,
            title: 'Annual Plan'
          }
        ]
      })
      window.location.href = 'https://store.tennibot.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNDQzMTEyNzQ0MjI0MzUsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiAxNzE2ODc5NTIzLCAic2VsbGluZ19wbGFuX2dyb3VwX2lkIjogODg2NDA3MzMxfV19&store_id=190268'
      return
    }

    if (product === 2) {
      edgetag('tag', 'initiateCheckout', {
        currency: 'USD',
        value: 2995,
        checkoutUrl: 'https://tennibot.myshopify.com/cart/44311234936995:1?channel=buy_button',
        contents: [
          {
            id: '8317998170275',
            quantity: 1,
            item_price: 2995,
            title: 'One Time Purchase'
          }
        ]
      })
      window.location.href = 'https://tennibot.myshopify.com/cart/44311234936995:1?channel=buy_button'
    }
  }

  return (
    <section className="lg:max-w-[80%] md:max-w-[33rem] max-w-[80%] 2xl:w-[65%] mx-auto md:pt-16 pt-0 pb-20" >
        <div className="flex relative lg:flex-row flex-col lg:gap-0 gap-10 justify-between" >
            <div className="absolute lg:block hidden top-[-15%] w-[50%] border-t-2 border-r-2 border-t-off-white rounded-r-lg h-[30%]" >
                <h2 className="font-avenir uppercase text-t-off-white text-3xl bg-t-off-black pr-3 absolute top-[-15%]" >Rent-to-own</h2>
            </div>
            <div className="absolute lg:block hidden top-[-15%] right-[13%] w-[17%] md:border-t-2 md:border-r-2 md:border-t-off-white rounded-r-lg h-[30%]" >
                <h2 className="font-avenir uppercase text-t-off-white text-nowrap text-3xl bg-t-off-black pr-3 absolute top-[-15%]" >Buy</h2>
            </div>
            <h2 className="lg:hidden font-avenir uppercase text-t-off-white text-3xl mb-[-1.2rem]" >Rent-to-own</h2>
            <button onClick={() => { setSelected(0) }} className={`${selected === 0 ? 'lg:border-t-green' : 'border-t-off-white'} relative flex-[0_0_30%] border-2 lg:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 md:pb-8 lg:pb-5 py-5 flex flex-col lg:justify-start justify-center transition-all duration-300 ease-in-out`} >
                <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-start items-start justify-between w-full" >
                    <h3 className={titleStyle} >$95 / Month</h3>
                    {/* <div className="w-full lg:absolute lg:right-0 tablet:w-[30%] tablet:min-w-20 relative flex flex-row tablet:gap-2 gap-0 tablet:flex-col items-center justify-between mb-5 transition-all duration-300 ease-in-out" >
                        <label className={`tablet:hidden font-plutoLight text-xs ${!isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Annual Plan</label>
                        <Switch checked={isChecked} className='transition-all mx-auto duration-300 ease-in-out' onCheckedChange={() => { setIsChecked(!isChecked) }} />
                        {
                            isChecked && (
                                <motion.div
                                    initial="initial"
                                    animate="animate"
                                    variants={{
                                      initial: {
                                        opacity: 0,
                                        y: 12
                                      },
                                      animate: {
                                        opacity: 1,
                                        y: 0
                                      }
                                    }}
                                    transition={{
                                      duration: 0.4,
                                      delay: 0.1 + 1 * 0.05,
                                      ease: [0.21, 0.47, 0.32, 0.98]
                                    }}
                                    className="flex flex-row gap-1"
                                    >
                                        <label className='hidden tablet:block font-plutoLight text-t-off-white text-xs transition-all duration-300 ease-in-out' >Monthly<br className='hidden lg:block' /> Plan</label>
                                </motion.div>)
                        }
                        {!isChecked && (
                                <motion.div
                                    initial="initial"
                                    animate="animate"
                                    variants={{
                                      initial: {
                                        opacity: 0,
                                        y: 12
                                      },
                                      animate: {
                                        opacity: 1,
                                        y: 0
                                      }
                                    }}
                                    transition={{
                                      duration: 0.4,
                                      delay: 0.1 + 1 * 0.05,
                                      ease: [0.21, 0.47, 0.32, 0.98]
                                    }}
                                    className="flex flex-row gap-1"
                                    >
                                        <label className='hidden tablet:block font-plutoLight text-t-off-white text-xs transition-all duration-300 ease-in-out' >Annual<br className='hidden lg:block' /> Plan</label>
                                </motion.div>
                        )}
                        <label className={`tablet:hidden font-plutoLight  text-xs ${isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Monthly Plan</label>
                    </div> */}
                </div>
                <div className={`flex lg:flex-col md:flex-row flex-col w-full md:w-auto ${viewMore.first ? 'gap-4 md:gap-8' : 'md:gap-8 gap-0'} transition-all ease-in-out duration-500`} >
                  <button onClick={() => {
                    setViewMore({ ...viewMore, first: !viewMore.first })
                  }} className='flex flex-row justify-between items-center w-full md:hidden' >
                    <p className='font-plutoLight text-t-green underline' >{viewMore.first ? 'View less' : 'View more'}</p>
                    <div className={`${viewMore.first ? 'rotate-180' : 'rotate-0'} ml-5 transition-all ease-in-out duration-500`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                            <path d="M27.3144 3.91534C27.7534 3.48564 28 2.90285 28 2.29517C28 1.68748 27.7534 1.10469 27.3144 0.674992C26.8753 0.245296 26.2799 0.00389437 25.659 0.00389438C25.0382 0.00389438 24.4428 0.245296 24.0037 0.674992L14.002 10.4873L4.00023 0.674992C3.7835 0.46111 3.52564 0.291348 3.24154 0.175497C2.95743 0.059646 2.65271 3.02263e-07 2.34493 3.05934e-07C2.03716 3.09604e-07 1.73243 0.0596461 1.44832 0.175497C1.16422 0.291348 0.906366 0.46111 0.689631 0.674992C0.471111 0.887128 0.297665 1.13951 0.1793 1.41759C0.0609379 1.69566 1.93113e-06 1.99392 1.93472e-06 2.29517C1.93831e-06 2.59641 0.0609379 2.89467 0.1793 3.17274C0.297665 3.45082 0.471111 3.7032 0.689631 3.91534L12.3467 15.325C12.5634 15.5389 12.8213 15.7087 13.1054 15.8245C13.3895 15.9404 13.6942 16 14.002 16C14.3098 16 14.6145 15.9404 14.8986 15.8245C15.1827 15.7087 15.4406 15.5389 15.6573 15.325L27.3144 3.91534Z" fill="#F6F7F2"/>
                        </svg>
                    </div>
                  </button>
                  <ul className={`list-disc list-inside text-left flex flex-col gap-4 mt-4 ${viewMore.first ? 'max-h-[1000px] opacity-100 mt-5' : 'md:max-h-[1000px] md:opacity-100  max-h-0 opacity-0 mt-0'} transition-all ease-in-out duration-500`} >
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Cancel anytime</li>
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Own your Tennibot after 4 years</li>
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Comprehensive customer service and <a href="#faq" className='underline' >warranty</a></li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Unlimited Video Recording</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Stat Tracking</li>
                  </ul>
                  <div className='hidden md:block lg:hidden' >
                    <ul className="list-disc list-inside text-left flex flex-col gap-4 mt-4" >
                        <li className={`font-plutoLight lg:hidden text-t-green text-pretty ${itemStyle}`} >Cancel anytime</li>
                        <li className={`font-plutoLight lg:hidden text-t-green text-pretty ${itemStyle}`} >Own your Tennibot after 4 years</li>
                        <li className={`font-plutoLight lg:hidden text-t-green text-pretty ${itemStyle}`} >Comprehensive customer<br /> service and <a href="#faq" className='underline' >warranty</a></li>
                    </ul>
                    <div className="w-full hidden flex-col items-start mt-3 lg:hidden md:flex" >
                      <a onClick={() => {
                        handleNavigation(0)
                      }} target='_blank' className="text-center cursor-pointer  w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-1.5 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green lg:text-t-green lg:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                          Proceed to Checkout
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <a onClick={() => {
                      handleNavigation(0)
                    }} target='_blank' className="text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                        Proceed to Checkout
                    </a>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='hidden lg:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 0 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div>
            </button>

            <button onClick={() => { setSelected(1) }} className={`${selected === 1 ? 'lg:border-t-green' : 'border-t-off-white'} bg-t-off-black relative flex-[0_0_30%] border-2 lg:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 md:pb-8 lg:pb-5 py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <h3 className={`${titleStyle} mb-7 `} >$995 / Year</h3>
                <div className={`flex lg:flex-col md:flex-row flex-col w-full md:w-auto ${viewMore.second ? 'gap-4 md:gap-8' : 'md:gap-8 gap-0'} transition-all ease-in-out duration-500`} >
                  <button onClick={() => {
                    setViewMore({ ...viewMore, second: !viewMore.second })
                  }} className='flex flex-row justify-between items-center w-full md:hidden' >
                    <p className='font-plutoLight text-t-green underline' >{viewMore.second ? 'View less' : 'View more'}</p>
                    <div className={`${viewMore.second ? 'rotate-180' : 'rotate-0'} ml-5 transition-all ease-in-out duration-500`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                            <path d="M27.3144 3.91534C27.7534 3.48564 28 2.90285 28 2.29517C28 1.68748 27.7534 1.10469 27.3144 0.674992C26.8753 0.245296 26.2799 0.00389437 25.659 0.00389438C25.0382 0.00389438 24.4428 0.245296 24.0037 0.674992L14.002 10.4873L4.00023 0.674992C3.7835 0.46111 3.52564 0.291348 3.24154 0.175497C2.95743 0.059646 2.65271 3.02263e-07 2.34493 3.05934e-07C2.03716 3.09604e-07 1.73243 0.0596461 1.44832 0.175497C1.16422 0.291348 0.906366 0.46111 0.689631 0.674992C0.471111 0.887128 0.297665 1.13951 0.1793 1.41759C0.0609379 1.69566 1.93113e-06 1.99392 1.93472e-06 2.29517C1.93831e-06 2.59641 0.0609379 2.89467 0.1793 3.17274C0.297665 3.45082 0.471111 3.7032 0.689631 3.91534L12.3467 15.325C12.5634 15.5389 12.8213 15.7087 13.1054 15.8245C13.3895 15.9404 13.6942 16 14.002 16C14.3098 16 14.6145 15.9404 14.8986 15.8245C15.1827 15.7087 15.4406 15.5389 15.6573 15.325L27.3144 3.91534Z" fill="#F6F7F2"/>
                        </svg>
                    </div>
                  </button>
                  <ul className={`list-disc list-inside text-left flex flex-col gap-4 mt-4 ${viewMore.second ? 'max-h-[1000px] opacity-100 mt-5' : 'md:max-h-[1000px] md:opacity-100  max-h-0 opacity-0 mt-0'} transition-all ease-in-out duration-500`} >
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Cancel anytime</li>
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Own your Tennibot after 4 years</li>
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Comprehensive customer service and <a href="#faq" className='underline' >warranty</a></li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Unlimited Video Recording</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Stat Tracking</li>
                  </ul>
                  <div className='hidden md:block lg:hidden' >
                    <ul className="list-disc list-inside text-left flex flex-col gap-4 " >
                        <li className={`font-plutoLight lg:hidden text-t-green text-pretty ${itemStyle}`} >Cancel anytime</li>
                        <li className={`font-plutoLight lg:hidden text-t-green text-pretty ${itemStyle}`} >Own your Tennibot after 4 years</li>
                        <li className={`font-plutoLight lg:hidden text-t-green text-pretty ${itemStyle}`} >Comprehensive customer<br /> service and <a href="#faq" className='underline' >warranty</a></li>
                    </ul>
                    <div className="w-full hidden flex-col items-start mt-3 lg:hidden md:flex" >
                      <a onClick={() => {
                        handleNavigation(1)
                      }} target='_blank' className="text-center cursor-pointer  w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-1.5 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green lg:text-t-green lg:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                          Proceed to Checkout
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <a onClick={() => {
                      handleNavigation(1)
                    }} target='_blank' className=" text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                        Proceed to Checkout
                    </a>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='hidden lg:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 1 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div>
            </button>

            <h2 className="lg:hidden font-avenir uppercase text-t-off-white text-3xl mb-[-1rem]" >Buy</h2>
            <button onClick={() => { setSelected(2) }} className={`${selected === 2 ? 'lg:border-t-green' : 'border-t-off-white'} bg-t-off-black relative flex-[0_0_30%] border-2 lg:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 pb-8 lg:pb-5 py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <h3 className={`${titleStyle} mb-7 `} >$2,995</h3>
                <div className={`flex lg:flex-col md:flex-row flex-col w-full md:w-auto ${viewMore.third ? 'gap-4 md:gap-8' : 'md:gap-8 gap-0'} transition-all ease-in-out duration-500`} >
                  <button onClick={() => {
                    setViewMore({ ...viewMore, third: !viewMore.third })
                  }} className='flex flex-row justify-between items-center w-full md:hidden' >
                    <p className='font-plutoLight text-t-green underline' >{viewMore.third ? 'View less' : 'View more'}</p>
                    <div className={`${viewMore.third ? 'rotate-180' : 'rotate-0'} ml-5 transition-all ease-in-out duration-500`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                            <path d="M27.3144 3.91534C27.7534 3.48564 28 2.90285 28 2.29517C28 1.68748 27.7534 1.10469 27.3144 0.674992C26.8753 0.245296 26.2799 0.00389437 25.659 0.00389438C25.0382 0.00389438 24.4428 0.245296 24.0037 0.674992L14.002 10.4873L4.00023 0.674992C3.7835 0.46111 3.52564 0.291348 3.24154 0.175497C2.95743 0.059646 2.65271 3.02263e-07 2.34493 3.05934e-07C2.03716 3.09604e-07 1.73243 0.0596461 1.44832 0.175497C1.16422 0.291348 0.906366 0.46111 0.689631 0.674992C0.471111 0.887128 0.297665 1.13951 0.1793 1.41759C0.0609379 1.69566 1.93113e-06 1.99392 1.93472e-06 2.29517C1.93831e-06 2.59641 0.0609379 2.89467 0.1793 3.17274C0.297665 3.45082 0.471111 3.7032 0.689631 3.91534L12.3467 15.325C12.5634 15.5389 12.8213 15.7087 13.1054 15.8245C13.3895 15.9404 13.6942 16 14.002 16C14.3098 16 14.6145 15.9404 14.8986 15.8245C15.1827 15.7087 15.4406 15.5389 15.6573 15.325L27.3144 3.91534Z" fill="#F6F7F2"/>
                        </svg>
                    </div>
                  </button>
                  <ul className={`list-disc list-inside text-left flex flex-col gap-4 mt-4 ${viewMore.third ? 'max-h-[1000px] opacity-100 mt-5' : 'md:max-h-[1000px] md:opacity-100  max-h-0 opacity-0 mt-0'} transition-all ease-in-out duration-500`} >
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >60 day money-back guarantee</li>
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Free shipping in the US</li>
                      <li className={`font-plutoLight list-item md:hidden lg:list-item text-t-green text-pretty ${itemStyle}`} >Comprehensive customer service and <a href="#faq" className='underline' >warranty</a></li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Unlimited Video Recording</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                      <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Stat Tracking</li>
                      <br className='hidden lg:block' />
                  </ul>
                  <div className='hidden md:block lg:hidden' >
                    <ul className="list-disc list-inside text-left flex flex-col gap-4" >
                      <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >60 day money-back guarantee</li>
                      <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Free shipping in the US</li>
                      <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Comprehensive customer<br /> service and <a href="#faq" className='underline' >warranty</a></li>
                    </ul>
                    <div className="w-full hidden flex-col items-start mt-3 lg:hidden md:flex" >
                      <a onClick={() => {
                        handleNavigation(2)
                      }} target='_blank' className="text-center cursor-pointer  w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-1.5 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green lg:text-t-green lg:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                          Proceed to Checkout
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <a onClick={() => {
                      handleNavigation(2)
                    }} target='_blank' className=" text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                        Proceed to Checkout
                    </a>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='hidden lg:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 2 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div>
            </button>
        </div>
        <div className="w-full md:flex flex-col items-center my-20 hidden" >
            <a onClick={() => {
              handleNavigation(selected)
            }} target='_blank' className="sm:mr-3 text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                Proceed to Checkout
            </a>
            <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
        </div>
    </section>
  )
}
