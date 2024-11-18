import { useState } from 'react'
import PartnerPopup from './PartnerPopup'

const PartnerFeatures = (): JSX.Element => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  return (
    <>
        <PartnerPopup showPopup={showPopup} onClose={() => { setShowPopup(false) }} />
        <div className="flex flex-row gap-10 overflow-x-scroll ml-5 flex-nowrap [&::-webkit-scrollbar]:hidden" >
            <a onClick={() => { setShowPopup(true) }} className="cursor-pointer h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-specs.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Specs</p>
            </a>
            <div className="h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-match.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Match my level</p>
            </div>
            <div className="h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-calibrate.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Auto-calibrate</p>
            </div>
            <div className="h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-human.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[13vh]" >Human-like playability</p>
            </div>
            <div className="h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-specs.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Specs</p>
            </div>
            <div className="h-[60vh] min-w-[290px] bg-[url('/images/partner/partner-specs.webp')] bg-cover bg-center rounded-xl flex flex-col justify-center px-10" >
                <p className="font-avenir text-t-off-white uppercase text-2xl mt-[10vh]" >Specs</p>
            </div>
        </div>
    </>
  )
}

export default PartnerFeatures
