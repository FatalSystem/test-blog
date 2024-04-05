import { useState } from 'react'
import { Switch } from './Switch'
import { motion } from 'framer-motion'

const titleStyle = 'text-t-off-white text-left font-avenirBold text-xl md:text-base lg:text-xl xl:text-2xl mb-4'
const itemStyle = 'text-sm md:text-xs xl:text-sm'

export default function BuySelection (): JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <section className="w-[80%] 2xl:w-[65%] mx-auto pb-20" >
        <div className="flex md:flex-row flex-col md:gap-0 gap-8 justify-between" >
            <button onClick={() => { console.log('container') }} className="relative flex-[0_0_30%] border-2 border-t-off-white rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7  py-5 flex flex-col justify-between" >
                <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-start items-start justify-between w-full" >
                    <h3 className={titleStyle} >$69 / Month</h3>
                    <div className="w-full  tablet:w-[30%] tablet:min-w-20 relative flex flex-row gap-2 tablet:flex-col items-center justify-between mb-5 transition-all duration-300 ease-in-out" >
                        <label className={`tablet:hidden font-plutoLight text-xs ${!isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Annual Plan</label>
                        <Switch checked={isChecked} className='transition-all mx-auto duration-300 ease-in-out' onCheckedChange={() => { setIsChecked(!isChecked) }} />
                        {
                            isChecked && (
                                <motion.div
                            //   key={`${price.id}-${interval}`}
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
                            //   key={`${price.id}-${interval}`}
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
                                <label className='hidden tablet:block font-plutoLight text-t-off-white text-xs transition-all duration-300 ease-in-out' >Anual<br className='hidden lg:block' /> Plan</label>
                        </motion.div>
                        )}
                        <label className={`tablet:hidden font-plutoLight  text-xs ${isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Monthly Plan</label>
                    </div>
                </div>
                <ul className="list-disc list-inside text-left flex flex-col gap-3" >
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Unlimited warranty</li>
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Pro Membership Included</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Video Recording</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Match Analysis</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Performance Tracking</li>
                </ul>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <button className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                        Proceed to Checkout
                    </button>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className='size-full bg-t-green rounded-full' />
                </div>
            </button>

            <button onClick={() => { console.log('container') }} className="relative flex-[0_0_30%] border-2 border-t-off-white rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 py-5 flex flex-col justify-between" >
                <h3 className={titleStyle} >$499 + $59 / Month</h3>
                <ul className="list-disc list-inside text-left flex flex-col gap-3" >
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Unlimited warranty</li>
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Pro Membership Included</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Video Recording</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Match Analysis</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Performance Tracking</li>
                </ul>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <button className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                        Proceed to Checkout
                    </button>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    {/* <div className='size-full bg-t-green rounded-full' /> */}
                </div>
            </button>

            <button onClick={() => { console.log('container') }} className="relative flex-[0_0_30%] border-2 border-t-off-white rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 py-5 flex flex-col justify-between" >
                <h3 className={titleStyle} >$2,995</h3>
                <ul className="list-disc list-inside text-left flex flex-col gap-3" >
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >1 year warranty</li>
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Basic Membership Included</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Video Recording</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Match Analysis</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Performance Tracking</li>
                </ul>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <button className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                        Proceed to Checkout
                    </button>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    {/* <div className='size-full bg-t-green rounded-full' /> */}
                </div>
            </button>
        </div>
        <div className="w-full md:flex flex-col items-center my-20 hidden" >
            <button className="sm:mr-3 tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                Proceed to Checkout
            </button>
            <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
        </div>
    </section>
  )
}
