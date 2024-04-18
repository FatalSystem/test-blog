import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './Dialog'
import { Form, FormControl, FormField, FormItem } from './Form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Input } from './Input'
import { Button } from './Button'
import { Info, Loader2 } from 'lucide-react'
import { wait } from '@utils'

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  })
})

export default function Popup (): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })
  const [token, setToken] = useState<string>('')
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)
  const formSent = form.formState.isSubmitSuccessful && !errorSubmitting && !form.formState.isSubmitting

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (errorSubmitting) setErrorSubmitting(false)
      if (form.formState.submitCount > 3) throw new Error('Too many attempts')
      if (!token) { console.error('No token'); return }
      const response = await fetch('/.netlify/functions/popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, rcToken: token })
      })
      if (response.status === 200) {
        window.localStorage.setItem('signed', 'true')
        window.sessionStorage.removeItem('nextPopup')
        setIsOpen(false)
        return
      } else {
        setErrorSubmitting(true)
        return
      }
      console.log(response)
    //   setIsOpen(false)
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  const handleShouldPopup = async (): Promise<void> => {
    // await wait(5000)
    if (!window.localStorage.getItem('signed')) {
      if (!window.sessionStorage.getItem('nextPopup')) {
        setIsOpen(true)
        window.sessionStorage.nextPopup = true
      }
    }
  }

  useEffect(() => {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'footerNewsletter' })
        .then((token) => {
          setToken(token)
        })
    })
    void handleShouldPopup()
  }, [])

  return (
    <Dialog open={isOpen} >
        <DialogContent className="bg-[url('/images/general/popup.webp')] bg-cover bg-center pt-[8%] pb-[5%] max-w-xl xl:max-w-3xl" >
            <div className='absolute w-full h-[100%] bg-gradient-to-l from-[#232320]/[0.8] from-50% via-transparent via-90% to-[#232320]/[0.0] to-90%' ></div>
            <div className='w-[60%] ml-auto z-10' >
                <DialogHeader>
                <DialogTitle className='font-avenirBold uppercase text-t-off-white text-2xl lg:text-3xl'>Want a free<br />adv wristband?</DialogTitle>
                <DialogDescription>
                <p className='font-plutoLight text-base text-t-off-white mt-4 lg:text-lg' >In addition to the wristband, you’ll also get all of our latest updates and special offers.</p>
                <p className='font-plutoLight text-base mt-3 mb-10 text-t-off-white lg:text-lg'>We promise we won’t spam you :)</p>
                </DialogDescription>
                {/* <PopupNewsletter
                formClassName="flex w-full flex-row"
                inputClassName="font-plutoLight w-ful py-3 bg-transparent border-l-2 border-t-2 border-b-2 border-r-0 pl-5 border-t-green text-t-off-white"
                buttonClassName="border-t-green border-2 rounded-r-md p-3 fill-current stroke-t-green text-t-green relative hover:bg-t-green hover:stroke-t-off-black transition-all duration-300 ease-in-out"
                /> */}
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-row" >
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='w-full' >
                                <FormControl>
                                    <Input {...field} style={{ borderRadius: formSent ? '0.35rem 0.35rem 0.35rem 0.35rem' : '0.35rem 0 0 0.35rem', width: '100%' }}
                                        placeholder='Email Address'
                                        type="email"
                                        value={formSent ? 'Thank you!' : field.value}
                                        disabled={formSent}
                                        className={`font-plutoLight w-ful py-3 bg-t-off-black border-l-2 border-t-2 border-b-2 border-r-0 pl-5 border-t-green text-t-off-white ${formSent && 'text-t-off-black bg-t-green text-center pl-0'}`}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        {!formSent && (
                            <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className="border-t-green bg-t-off-black border-2 rounded-r-md p-3 fill-current stroke-t-green text-t-green relative hover:bg-t-green hover:stroke-t-off-black transition-all duration-300 ease-in-out" >
                                    {form.formState.isSubmitting && <Loader2 className="size-5 animate-spin absolute inset-0 m-auto" />}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="16" viewBox="0 0 45 26" className={`${form.formState.isSubmitting ? 'opacity-0' : 'opacity-100'}`} fill="none">
                                        <path opacity="0.5" d="M0 13H43M43 13L30.4146 25M43 13L30.4146 1" strokeWidth="3"/>
                                    </svg>
                            </Button>
                        )}
                    </form>
                    {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row items-center"><Info className='mr-2 sm:size-5 size-5' /> There was an error. Please try again.</p>}
                </Form>
                </DialogHeader>
            </div>
        </DialogContent>
    </Dialog>

  )
}
