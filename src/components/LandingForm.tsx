import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { Info, Loader2 } from 'lucide-react'
import { Checkbox } from './Checkbox'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Required'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  call: z.boolean().optional()
})

const inputStyle = 'bg-transparent border-2 p-2.5 border-t-green rounded-md focus:outline-none focus:ring-indigo-500 focus:border-t-green mb-5'
const labelStyle = 'lg:text-lg xl:text-xl mb-2 hidden'

export default function LandingForm (): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      call: true
    }
  })

  const [token, setToken] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

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
      const response = await fetch('/.netlify/functions/popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, fname: firstName ?? values.name, lname: lastName ?? '', call: values.call, rcToken: token })
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      } else {
        setSent(true)
        window.localStorage.setItem('signed', 'true')
        edgetag('tag', 'Complete registration new')
        window.location.href = '/'
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='font-plutoLight mb-2' >
            <div className='flex md:flex-row flex-col md:gap-2'>
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1' >
                        <FormControl>
                            <Input {...field} placeholder='Name' className={inputStyle} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {/* <FormField
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
                /> */}
            </div>
            <div className='flex w-full flex-row flex-nowrap' >
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1 lg:w-full' >
                        <FormLabel className={labelStyle} >Email address*</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Email Address' value={sent ? 'Thank you!' : field.value} style={{ borderRadius: sent ? '0.35rem 0.35rem 0.35rem 0.35rem' : '0.35rem 0 0 0.35rem', width: '100%' }} type='email' className={`${inputStyle} border-l-2 border-t-2 border-b-2 border-r-0 pl-5 border-t-green mb-0 ${sent && 'text-t-off-black bg-t-green text-center pl-0'}`} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {!sent && (
                <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className="border-t-green md:bg-t-off-black md:hover:bg-t-green border-2 rounded-r-md p-3 stroke-t-off-black md:stroke-t-green md:hover:stroke-t-green relative bg-t-green md:hover:stroke-t-off-black transition-all duration-300 ease-in-out" >
                        {form.formState.isSubmitting && <Loader2 className="size-5 animate-spin absolute inset-0 m-auto md:stroke-t-green stroke-t-off-black" />}
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="16" viewBox="0 0 45 26" className={`${form.formState.isSubmitting ? 'opacity-0' : 'opacity-100'}`} fill="none">
                            <path opacity="0.5" d="M0 13H43M43 13L30.4146 25M43 13L30.4146 1" strokeWidth="3"/>
                        </svg>
                </Button>
                )}
            </div>
            <FormField
                control={form.control}
                name="call"
                render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md mt-5' >
                        <FormControl>
                            <Checkbox checked={field.value ?? true} onCheckedChange={field.onChange} className='text-t-green border-t-green' />
                        </FormControl>
                        <FormDescription className='font-plutoLight text-t-off-white' >
                            {'I am happy to jump on a 10 minute call with the Tennibot Team'}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row lg:justify-start md:justify-end items-center"><Info className='mr-2 sm:size-5 size-5' /> There was an error. Please try again.</p>}
        </form>
    </Form>
  )
}
