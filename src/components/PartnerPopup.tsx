import { Dialog, DialogContent } from './Dialog'
import { X } from 'lucide-react'

interface PartnerPopupProps {
  showPopup: boolean
  onClose: () => void
}

const PartnerPopup = ({ showPopup, onClose }: PartnerPopupProps): JSX.Element => {
  return (
    <>
        {
            showPopup && (
                <Dialog open={true} >
                    <DialogContent className=" bg-t-off-white bg-cover bg-center p-0 overflow-hidden flex flex-col justify-center items-center sm:max-w-xl xl:max-w-3xl" >
                        <button className=' absolute z-10 top-[3%] right-[3%]' onClick={onClose} ><X className='size-8' /></button>
                        <div className="flex flex-row w-full h-full">
                            <div className="w-[50%] h-full bg-[url('/images/general/bm.webp')] bg-cover bg-center">
                            </div>
                            <div className="w-[50%] p-10 flex flex-col  justify-center">
                                <h3 className="font-avenirBold uppercase text-t-off-black text-4xl sm:text-2xl mb-5">Specs</h3>
                                <p className="font-avenir text-t-off-black">
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
                    </DialogContent>
                </Dialog>
            )
        }
    </>
  )
}

export default PartnerPopup
