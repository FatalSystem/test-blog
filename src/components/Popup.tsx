import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './Dialog'

export default function Popup (): JSX.Element {
  return (
    <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="bg-[url('/images/general/popup.webp')]" >
            <div className='bg-gradient-to-b from-[#232320]/[0.2] from-10% via-transparent via-70% to-[#232320]/[0.2] to-90%' ></div>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

  )
}
