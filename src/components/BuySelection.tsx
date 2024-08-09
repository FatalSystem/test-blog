import { motion } from 'framer-motion'
import { useState } from 'react'
import { Switch } from './Switch'

const titleStyle = 'text-t-off-white text-left font-avenirBold text-2xl md:text-2xl lg:text-xl xl:text-2xl'
const itemStyle = 'mobilem:text-sm text-xs md:text-sm xl:text-sm 2xl:text-base'

export const tabs = [
  { label: 'Rent-to-own' },
  { label: 'Buy' }
]

export default function BuySelection (): JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [selected, setSelected] = useState<number>(0)
  // const [viewMore, setViewMore] = useState({ first: false, second: false, third: false })

  const handleNavigation = (product: number): void => {
    var _learnq = _learnq || []
    if (product === 0) {
      if (isChecked) {
        _learnq.push(['track', 'Initiate Checkout', {
          'productType' : 'Annual Plan'
        }])
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

      _learnq.push(['track', 'Initiate Checkout', {
        'productType' : 'Monthly Plan'
      }])

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

    // if (product === 1) {
    //   edgetag('tag', 'initiateCheckout', {
    //     currency: 'USD',
    //     value: 995,
    //     checkoutUrl: 'https://store.tennibot.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNDQzMTEyNzQ0MjI0MzUsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiAxNzE2ODc5NTIzLCAic2VsbGluZ19wbGFuX2dyb3VwX2lkIjogODg2NDA3MzMxfV19&store_id=190268',
    //     contents: [
    //       {
    //         id: '8318008819875',
    //         quantity: 1,
    //         item_price: 995,
    //         title: 'Annual Plan'
    //       }
    //     ]
    //   })
    //   window.location.href = 'https://store.tennibot.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNDQzMTEyNzQ0MjI0MzUsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiAxNzE2ODc5NTIzLCAic2VsbGluZ19wbGFuX2dyb3VwX2lkIjogODg2NDA3MzMxfV19&store_id=190268'
    //   return
    // }

    if (product === 2) {
      _learnq.push(['track', 'Initiate Checkout', {
        'productType' : 'One Time'
      }])
      edgetag('tag', 'initiateCheckout', {
        currency: 'USD',
        value: 2995,
        checkoutUrl: 'https://store.tennibot.com/cart/44311234936995:1?channel=buy_button',
        contents: [
          {
            id: '8317998170275',
            quantity: 1,
            item_price: 2995,
            title: 'One Time Purchase'
          }
        ]
      })
      window.location.href = 'https://store.tennibot.com/cart/44311234936995:1?channel=buy_button'
    }
  }

  return (
    <section className="lg:max-w-[80%] tablet:max-w-[26rem] max-w-[80%] 2xl:w-[65%] mx-auto pt-10 pb-20" >
        <div className="flex relative flex-col gap-5 justify-between" >
            <div className="flex flex-col justify-between w-full items-baseline" >
              <h1 className="font-avenirBold md:text-4xl xl:text-4xl text-3xl uppercase" >Tennibot</h1>
              <p className="font-pluto text-lg xl:text-xl" >Rover and Station</p>
            </div>
            {/* <div className="absolute lg:block hidden top-[-15%] w-[50%] border-t-2 border-r-2 border-t-off-white rounded-r-lg h-[30%]" >
                <h2 className="font-avenir uppercase text-t-off-white text-3xl bg-t-off-black pr-3 absolute top-[-15%]" >Rent-to-own</h2>
            </div>
            <div className="absolute lg:block hidden top-[-15%] right-[13%] w-[17%] md:border-t-2 md:border-r-2 md:border-t-off-white rounded-r-lg h-[30%]" >
                <h2 className="font-avenir uppercase text-t-off-white text-nowrap text-3xl bg-t-off-black pr-3 absolute top-[-15%]" >Buy</h2>
            </div> */}
            <div className='flex-row gap-5 mt-[2vh] hidden tablet:flex' >
              <a onClick={() => { setSelected(0) }} className={`${selected !== 2 ? 'font-avenirBold underline underline-offset-2 tablet:no-underline' : 'font-avenir'} cursor-pointer uppercase text-t-off-white text-xl transition-all duration-300 ease-in-out`} >Rent-to-own</a>
              <a onClick={() => { setSelected(2) }} className={`${selected === 2 ? 'font-avenirBold' : 'font-avenir'} cursor-pointer uppercase text-t-off-white text-xl transition-all duration-300 ease-in-out`} >Buy</a>
            </div>
            <ul className='flex w-full md:pb-10 pb-5 flex-row tablet:justify-center justify-around mt-5 tablet:hidden' >
                {tabs.map((item, index) => {
                  return (
                        <li key={item.label} className='tablet:w-full w-fit cursor-pointer text-center relative h-[24px] flex justify-center min-w-0' onClick={() => {
                          if (index === 0) {
                            setSelected(0)
                          } else {
                            setSelected(2)
                          }
                        }}>
                            <div className='w-fit' >
                                <h4 className={`font-avenirBold uppercase font-black lg:text-3xl md:text-2xl tablet:text-xl mobilem:text-xl text-lg text-t-off-white`} >{item.label}</h4>
                                {index === selected || (index !== 0 && selected === 2)
                                  ? (
                                    <motion.div className="bottom-[-1px] rounded-xl w-full h-[4px] bg-t-off-white" layoutId="underline" />
                                    )
                                  : null}
                            </div>
                        </li>
                  )
                })}
            </ul>
            <div onClick={() => { setSelected(0) }} className={`${selected === 0 ? 'lg:border-t-green' : ' hover:opacity-100 opacity-50 border-t-off-white'} cursor-pointer bg-t-darker-green relative flex-[0_0_30%] border-2 lg:hover:border-t-green rounded-lg px-5 mobilel:px-7 md:px-5 lg:px-7 md:pb-8 lg:pb-5 py-5 flex flex-col lg:justify-start justify-center transition-all duration-300 ease-in-out`} >
                <div className="flex flex-col tablet:flex-row tablet:justify-start tablet:items-baseline items-start justify-between w-full" >
                    <h3 className={titleStyle} >{`${isChecked ? '$995' : '$95'} / ${isChecked ? 'Year' : 'Month'}`}</h3>
                    {isChecked && (<label className='font-plutoBold ml-[5%] hidden tablet:block' >23% Off!</label>)}
                    <div className=" mr-3 absolute right-0 tablet:w-[30%] tablet:min-w-20 flex tablet:gap-2 gap-0 flex-row items-center justify-between mb-5 transition-all duration-300 ease-in-out" >
                        {/* <label className={`tablet:hidden font-plutoLight text-xs ${!isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Annual Plan</label> */}
                        <Switch checked={isChecked} className='transition-all mx-auto duration-300 ease-in-out ' onCheckedChange={() => { setIsChecked(!isChecked) }} />
                        {isChecked && (<label className='font-plutoBold mt-2 tablet:hidden' >23% Off!</label>)}
                        {/* {
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
                                        <label className='hidden tablet:block font-plutoLight text-t-off-white text-xs transition-all duration-300 ease-in-out' >Annual<br className='hidden lg:block' /> Plan</label>
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
                                        <label className='hidden tablet:block font-plutoLight text-t-off-white text-xs transition-all duration-300 ease-in-out' >Monthly<br className='hidden lg:block' /> Plan</label>
                                </motion.div>
                        )} */}
                        {/* <label className={`tablet:hidden font-plutoLight  text-xs ${isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Annual Plan</label> */}
                    </div>
                </div>
                <div className={'flex lg:flex-col md:flex-row flex-col w-full md:w-auto transition-all ease-in-out duration-500'} >
                  <ul className={'list-disc list-inside text-left flex flex-col gap-2 mt-2 transition-all ease-in-out duration-500'} >
                      <li className={`font-plutoLight list-item  text-t-off-white text-pretty ${itemStyle}`} >Cancel anytime</li>
                      <li className={`font-plutoLight list-item text-t-off-white text-pretty ${itemStyle}`} >Own your Tennibot after 4 years</li>
                      <li className={`font-plutoLight list-item text-t-off-white text-pretty ${itemStyle}`} >Comprehensive customer service and <a href="#faq" className='underline text-t-green' >warranty</a></li>
                  </ul>
                </div>
                {/* <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <a onClick={() => {
                      handleNavigation(0)
                    }} target='_blank' className="text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                        Proceed to Checkout
                    </a>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 5-6 weeks</label>
                </div> */}
                {/* <div className='hidden lg:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 0 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div> */}
            </div>

            {/* <button onClick={() => { setSelected(1) }} className={`${selected === 1 ? 'lg:border-t-green' : 'border-t-off-white'} bg-t-off-black relative flex-[0_0_30%] border-2 lg:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 md:pb-8 lg:pb-5 py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <h3 className={`${titleStyle} mb-7 `} >$995 / Year</h3>
                <div className={`flex lg:flex-col md:flex-row flex-col w-full md:w-auto transition-all ease-in-out duration-500`} >
                  <ul className={`list-disc list-inside text-left flex flex-col gap-4 mt-4 transition-all ease-in-out duration-500`} >
                      <li className={`font-plutoLight list-item text-t-green text-pretty ${itemStyle}`} >Cancel anytime</li>
                      <li className={`font-plutoLight list-item text-t-green text-pretty ${itemStyle}`} >Own your Tennibot after 4 years</li>
                      <li className={`font-plutoLight list-item text-t-green text-pretty ${itemStyle}`} >Comprehensive customer service and <a href="#faq" className='underline' >warranty</a></li>
                  </ul>
                </div>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <a onClick={() => {
                      handleNavigation(1)
                    }} target='_blank' className=" text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                        Proceed to Checkout
                    </a>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 5-6 weeks</label>
                </div>
                <div className='hidden lg:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 1 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div>
            </button> */}

            {/* <h2 className="lg:hidden font-avenir uppercase text-t-off-white text-3xl mb-[-1rem]" >Buy</h2> */}
            <div onClick={() => { setSelected(2) }} className={`${selected === 2 ? 'lg:border-t-green' : 'hover:opacity-100 opacity-50 border-t-off-white'} cursor-pointer bg-t-darker-green relative flex-[0_0_30%] border-2 lg:hover:border-t-green rounded-lg px-5 mobilel:px-7 md:px-5 lg:px-7 pb-8 lg:pb-5 py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <h3 className={`${titleStyle} `} >$2,995</h3>
                <div className={'flex lg:flex-col md:flex-row flex-col w-full md:w-auto transition-all ease-in-out duration-500'} >
                  <ul className={'list-disc list-inside mt-2 text-left flex flex-col gap-2 transition-all ease-in-out duration-500'} >
                      <li className={`font-plutoLight list-item text-t-off-white text-pretty ${itemStyle}`} >60 day money-back guarantee</li>
                      <li className={`font-plutoLight list-item text-t-off-white text-pretty ${itemStyle}`} >Free shipping in the US</li>
                      <li className={`font-plutoLight list-item text-t-off-white text-pretty ${itemStyle}`} >Comprehensive customer service and <a href="#faq" className='underline text-t-green' >warranty</a></li>
                  </ul>
                </div>
                {/* <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <a onClick={() => {
                      handleNavigation(2)
                    }} target='_blank' className=" text-center cursor-pointer tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" rel="noreferrer" >
                        Proceed to Checkout
                    </a>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 5-6 weeks</label>
                </div> */}
                {/* <div className='hidden lg:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 2 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div> */}
            </div>
        </div>
        <div className="w-full flex-col items-center mt-[3vh] flex" >
            <a onClick={() => {
              handleNavigation(selected)
            }} target='_blank' className="sm:mr-3 text-center tablet:w-72 cursor-pointer w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-96 rounded-full py-2 font-avenir border-2 transition duration-300 border-t-green lg:text-t-green lg:bg-transparent hover:bg-t-green hover:text-t-off-black bg-t-green text-t-off-black" rel="noreferrer" >
                Proceed to Checkout
            </a>
            <label className="font-plutoLight text-xs text-t-off-white text-pretty text-center mt-[2vh]" >Due to high demand,<br /> new orders will ship in 5-6 weeks.</label>
        </div>
    </section>
  )
}
