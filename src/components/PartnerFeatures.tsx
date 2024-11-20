import { useState } from 'react'
import PartnerPopup from './PartnerPopup'
import { X } from 'lucide-react'

const PartnerFeatures = (): JSX.Element => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [content, setContent] = useState<string>('specs')

  const handleContent = (content: string) => {
    switch (content) {
      case 'specs':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button><div className="flex flex-row w-full h-full">
                    <div className="w-[50%] h-full bg-[url('/images/partner/partner-specs-2.webp')] bg-cover bg-center">
                    </div>
                    <div className="w-[50%] p-10 flex flex-col  justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Specs</h3>
                        <p className="font-avenir text-t-off-white">
                            <ul className="list-disc list-outside">
                                <li><span className="font-avenirBold">Speed:</span> Up to 70 mph</li>
                                <li><span className="font-avenirBold">Ball capacity:</span> Up to 140 balls</li>
                                <li><span className="font-avenirBold">Battery life:</span> 4-5 hours based on the usage</li>
                                <li><span className="font-avenirBold">Surfaces:</span> Works on all surfaces (Hard, Clay, Grass, Astroturf & Carpet)</li>
                                <li><span className="font-avenirBold">Replaceable battery</span></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </>
        )
      case 'match':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col w-[40rem] h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Match My Level</h3>
                        <p className="font-avenir text-t-off-white">
                            The Partner tracks your returns—whether in or out—and adjusts difficulty instantly. Nail your shots? It increases speed and challenge.Miss a few? It slows down to eases you back in rhythm. Perfectly balanced practice every time.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-match-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'portable':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col w-full h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Compact and Portable</h3>
                        <p className="font-avenir text-t-off-white">
                            The Partner is small but mighty. It’s compact so it fits in nearly any type of car - even those itsy bitsy sports cars :) And lightweight to make transportation painless.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-portable-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'human':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col w-full h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Human-like playability</h3>
                        <p className="font-avenir text-t-off-white">
                            The only ball machine that moves autonomously, delivering the most realistic shots and training conditions. It can either challenge you with dynamic court movement or play directly to you, wherever you are!
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-human-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'follow':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col w-full h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Follow me</h3>
                        <p className="font-avenir text-t-off-white">
                            Oh, and another feature we think you&apos;ll enjoy... The Partner rolls itself! No more lugging your ball machine behind you; simply set it in the &quot;Follow Me&quot; Mode, and The Partner will tag along behind you to walk to the court - Granted, there aren&apos;t any stairs :)
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-follow-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
      case 'safety':
        return (
            <>
                <button className=' absolute z-10 top-[3%] right-[3%]' onClick={() => { setShowPopup(false) }}><X className='size-8 text-t-off-white' /></button>
                <div className="flex flex-col w-full h-full">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="font-avenirBold uppercase text-t-off-white text-4xl sm:text-2xl mb-5">Intelligent safety</h3>
                        <p className="font-avenir text-t-off-white">
                            The Partner uses cameras and sensors to detect if you&apos;re standing too close, automatically stopping movement and ball launches for added safety. It&apos;s one of the safest ball machines for both kids and adults.
                        </p>
                    </div>
                    <div className="w-[100%] h-full bg-[url('/images/partner/partner-safety-2.webp')] bg-cover bg-center">
                    </div>
                </div>
            </>
        )
    }
  }

  return (
    <>
        <PartnerPopup showPopup={showPopup} onClose={() => { setShowPopup(false) }} >
            {handleContent(content)}
        </PartnerPopup>
        <div className="flex flex-row gap-10 overflow-x-scroll mx-5 flex-nowrap [&::-webkit-scrollbar]:hidden" >
            <a onClick={() => {
              setContent('specs')
              setShowPopup(true)
            }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-specs.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Specs</p>
            </a>
            <a onClick={() => {
              setContent('match')
              setShowPopup(true)
            }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-match.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Match my level</p>
            </a>
            <a onClick={() => {
              setContent('portable')
              setShowPopup(true)
            }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-portable.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Portable</p>
            </a>
            <a onClick={() => {
              setContent('human')
              setShowPopup(true)
            }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-human.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[13vh]" >Human-like playability</p>
            </a>
            <a onClick={() => {
              setContent('follow')
              setShowPopup(true)
            }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-follow.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Follow me</p>
            </a>
            <a onClick={() => {
              setContent('safety')
              setShowPopup(true)
            }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-safety.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Intelligent safety</p>
            </a>
        </div>
    </>
  )
}

export default PartnerFeatures
