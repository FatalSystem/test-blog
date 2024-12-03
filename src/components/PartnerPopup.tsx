import { Dialog, DialogContent } from './Dialog'
import { X } from 'lucide-react'

interface PartnerPopupProps {
  showPopup: boolean
  onClose: () => void
}

const PartnerPopup = ({ showPopup, onClose, children }: PartnerPopupProps): JSX.Element => {
  return (
    <>
        {
            showPopup && (
                <Dialog open={true} >
                    <DialogContent className="bg-t-off-black bg-cover bg-center p-0 overflow-hidden flex flex-col justify-center items-center w-fit md:h-[55vh] rounded-xl h-[70vh] top-[20%]" >
                        {children}
                    </DialogContent>
                </Dialog>
            )
        }
    </>
  )
}

export default PartnerPopup