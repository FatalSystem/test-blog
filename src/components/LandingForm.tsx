import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { Info, Loader2 } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Required'
  }),
  phone: z.string().optional(),
  email: z.string().email({
    message: 'Invalid email address.'
  })
})

const inputStyle = 'bg-transparent border-2 p-2.5 border-t-green rounded-md focus:outline-none focus:ring-indigo-500 focus:border-t-green mb-5'
const labelStyle = 'lg:text-lg xl:text-xl mb-2 hidden md:block'

export default function LandingForm (): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: ''
    }
  })

  const [token, setToken] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (errorSubmitting) setErrorSubmitting(false)
      if (form.formState.submitCount > 3) throw new Error('Too many attempts')
      if (!token) { console.error('No token'); return }

      let firstName
      let lastName
      if (values.name.includes(' ')) {
        firstName = values.name.trim().split(' ')[0]
        lastName = values.name.trim().split(' ')[1]
      }
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, fname: firstName ?? values.name, lname: lastName ?? '', phone: values.phone, rcToken: token })
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      } else {
        setSent(true)
        edgetag('tag', 'Complete registration')
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  useEffect(() => {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'landingNewsletter' })
        .then((token) => {
          setToken(token)
        })
    })
  }, [])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='font-plutoLight' >
            <div className='flex md:flex-row flex-col md:gap-2'>
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className='flex flex-col md:w-[50%] w-full gap-1' >
                        <FormLabel className={labelStyle} >Name*</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={!isMobile ? '' : 'Name*'} className={inputStyle} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem className='flex flex-col md:w-[50%] w-full gap-1' >
                        <FormLabel className={labelStyle} >Phone</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={!isMobile ? '' : 'Phone Number'} type='tel' className={inputStyle} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className='flex w-full flex-row md:flex-wrap md:gap-2' >
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1 md:w-[50%] lg:w-full' >
                        <FormLabel className={labelStyle} >Email address*</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={!isMobile ? '' : 'Email Address*'} value={sent && isMobile ? 'Thank you!' : field.value} style={{ borderRadius: sent || !isMobile ? '0.35rem 0.35rem 0.35rem 0.35rem' : '0.35rem 0 0 0.35rem', width: '100%' }} type='email' className={`${inputStyle} border-l-2 border-t-2 border-b-2 border-r-0 md:border-r-2 pl-5 border-t-green mb-0 ${sent && isMobile && 'text-t-off-black bg-t-green text-center pl-0'}`} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {!sent && (
                <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className="border-t-green border-2 rounded-r-md p-3 stroke-t-off-black  hover:stroke-t-green relative bg-t-green hover:hover:stroke-t-off-black transition-all duration-300 ease-in-out md:hidden" >
                        {form.formState.isSubmitting && <Loader2 className="size-5 animate-spin absolute inset-0 m-auto md:stroke-t-green stroke-t-off-black" />}
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="16" viewBox="0 0 45 26" className={`${form.formState.isSubmitting ? 'opacity-0' : 'opacity-100'}`} fill="none">
                            <path opacity="0.5" d="M0 13H43M43 13L30.4146 25M43 13L30.4146 1" strokeWidth="3"/>
                        </svg>
                </Button>
                )}
                <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting) || sent}
                    className='hidden md:flex md:w-[48%] lg:w-full flex-row  justify-center items-center disabled:opacity-50 mt-6 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-t-green text-lg w-full font-thin rounded-full py-2 font-avenir uppercase border-2 transition-all duration-300 text-t-off-black bg-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black' >
                    {sent && !errorSubmitting && !form.formState.isSubmitting ? 'Sent' : 'Submit'}
                    {form.formState.isSubmitting && <Loader2 className="ml-2 size-4 animate-spin" /> }
                </Button>
            </div>
                {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row lg:justify-start md:justify-end items-center"><Info className='mr-2 sm:size-5 size-5' /> There was an error. Please try again.</p>}
                <p className='font-plutoLight text-t-off-white text-center md:mx-auto mt-5'>* Required Fields</p>
        </form>
    </Form>
  )
}
