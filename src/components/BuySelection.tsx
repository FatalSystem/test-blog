import { useState } from 'react'
import { Switch } from './Switch'
import { motion } from 'framer-motion'

const titleStyle = 'text-t-off-white text-left font-avenirBold text-xl md:text-base lg:text-xl xl:text-2xl mb-4'
const itemStyle = 'text-sm md:text-xs xl:text-sm 2xl:text-base'

export default function BuySelection (): JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [selected, setSelected] = useState<number>(0)

  return (
    <section className="w-[80%] 2xl:w-[65%] mx-auto md:pt-16 pt-0 pb-20" >
        <div className="flex relative md:flex-row flex-col md:gap-0 gap-10 justify-between" >
            <div className="absolute md:block hidden top-[-15%] w-[50%] border-t-2 border-r-2 border-t-off-white rounded-r-lg h-[30%]" >
                <h2 className="font-avenir uppercase text-t-off-white text-3xl bg-t-off-black pr-3 absolute top-[-15%]" >Rent</h2>
            </div>
            <div className="absolute md:block hidden top-[-15%] right-[13%] w-[17%] border-t-2 border-r-2 border-t-off-white rounded-r-lg h-[30%]" >
                <h2 className="font-avenir uppercase text-t-off-white text-3xl bg-t-off-black pr-3 absolute top-[-15%]" >Buy</h2>
            </div>
            <h2 className="md:hidden font-avenir uppercase text-t-off-white text-3xl mb-[-1.2rem]" >Rent</h2>
            <button onClick={() => { setSelected(0) }} className={`${selected === 0 ? 'md:border-t-green' : 'border-t-off-white'} relative flex-[0_0_30%] border-2 md:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7  py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-start items-start justify-between w-full" >
                    <h3 className={titleStyle} >$79 / Month</h3>
                    <div className="w-full lg:absolute lg:right-0 tablet:w-[30%] tablet:min-w-20 relative flex flex-row gap-2 tablet:flex-col items-center justify-between mb-5 transition-all duration-300 ease-in-out" >
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
                                        <label className='hidden tablet:block font-plutoLight text-t-off-white text-xs transition-all duration-300 ease-in-out' >Anual<br className='hidden lg:block' /> Plan</label>
                                </motion.div>
                        )}
                        <label className={`tablet:hidden font-plutoLight  text-xs ${isChecked ? 'text-t-off-white' : 'text-t-disabled'}`} >Monthly Plan</label>
                    </div>
                </div>
                <ul className="list-disc list-inside text-left flex flex-col gap-3" >
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Unlimited warranty</li>
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Classic Membership Included</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Video Recording</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Stat Tracking</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty pr-2 ${itemStyle}`} >Option to buy out rental</li>
                </ul>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <button className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                        Proceed to Checkout
                    </button>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='hidden md:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 0 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div>
            </button>

            <button onClick={() => { setSelected(1) }} className={`${selected === 1 ? 'md:border-t-green' : 'border-t-off-white'} bg-t-off-black relative flex-[0_0_30%] border-2 md:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <h3 className={`${titleStyle} mb-7 `} >$499 + $59 / Month</h3>
                <ul className="list-disc list-inside text-left flex flex-col gap-3" >
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Unlimited warranty</li>
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Classic Membership Included</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Video Recording</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Stat Tracking</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Option to buy out rental</li>
                </ul>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <button className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                        Proceed to Checkout
                    </button>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='hidden md:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 1 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
                </div>
            </button>

            <h2 className="md:hidden font-avenir uppercase text-t-off-white text-3xl mb-[-2rem]" >Buy</h2>
            <button onClick={() => { setSelected(2) }} className={`${selected === 2 ? 'md:border-t-green' : 'border-t-off-white'} bg-t-off-black relative flex-[0_0_30%] border-2 md:hover:border-t-green rounded-lg px-5 mobilem:px-10 md:px-5 lg:px-7 py-5 flex flex-col justify-start transition-all duration-300 ease-in-out`} >
                <h3 className={`${titleStyle} mb-7 `} >$2,995</h3>
                <ul className="list-disc list-inside text-left flex flex-col gap-3" >
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >2 Year Warranty</li>
                    <li className={`font-plutoLight text-t-green text-pretty ${itemStyle}`} >Classic Membership Included</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Ball Collection</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Clay Court Sweeping</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Video Recording</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Real Time Line Judging</li>
                    <li className={`font-plutoLight text-t-off-white text-pretty ${itemStyle}`} >Stat Tracking</li>
                </ul>
                <div className="w-full flex flex-col items-center mt-10 md:hidden " >
                    <button className="tablet:w-64 w-full max-sm:mx-auto text-lg 2xl:text-2xl 2xl: 2xl:py-3 2xl:w-80 rounded-full py-2 font-avenir border-2 transition duration-300 text-t-off-black bg-t-green border-t-green md:text-t-green md:bg-transparent hover:bg-t-green hover:text-t-off-black" >
                        Proceed to Checkout
                    </button>
                    <label className="font-plutoLight text-t-off-white text-pretty mt-5" >Ships in 4-5 weeks</label>
                </div>
                <div className='hidden md:flex size-6 p-1 border-[1px] border-t-off-white rounded-full absolute flex-col justify-center items-center bottom-[3.5%] right-[3.5%] '>
                    <div className={`${selected === 2 ? 'bg-t-green' : 'bg-transparent'} size-full rounded-full transition-all duration-500 ease-in-out`} />
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
