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
                    <DialogContent className=" bg-t-off-white bg-cover bg-center p-0 overflow-hidden flex flex-col justify-center items-center sm:max-w-xl xl:max-w-3xl" >
                        {children}
                    </DialogContent>
                </Dialog>
            )
        }
    </>
  )
}

export default PartnerPopup
