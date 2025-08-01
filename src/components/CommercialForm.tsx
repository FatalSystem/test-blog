import { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './Button'
import { Info, Loader2 } from 'lucide-react'
import { encode, trackLeadFormSubmitted } from '@utils'
import { Checkbox } from './Checkbox'

const inputStyle = 'bg-transparent border-2 p-2.5 border-t-off-white rounded-md sm:p-1.5 focus:outline-none focus:ring-indigo-500 focus:border-t-green'
const labelStyle = 'lg:text-lg xl:text-xl mb-2'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Required'
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  facility: z.string().min(2, {
    message: 'Required'
  }),
  about: z.string().min(2, {
    message: 'Required'
  }),
  zipcode: z.string().min(2, {
    message: 'Required'
  }),
  newsletter: z.boolean().optional()
})

export default function CommercialForm (): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      facility: '',
      about: '',
      zipcode: '',
      newsletter: true
    }
  })
  const [token, setToken] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)

  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

  const [urlParams, setUrlParams] = useState<URLSearchParams>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search))
    }
  }, [])

  const subscribeToNewsletter = async (email: string, fname: string, lname: string, phone: string): Promise<void> => {
    try {
      if (form.formState.submitCount > 3) throw new Error('Too many attempts')
      if (!token) { console.error('No token'); return }
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, fname, lname, from: 'Commercial', phone, rcToken: token })
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    if (errorSubmitting) setErrorSubmitting(false)
    if (form.formState.submitCount > 3) throw new Error('Too many attempts')
    try {
      if (values.newsletter && values.email !== '') {
        let firstName = ''
        let lastName = ''
        if (values.name.includes(' ')) {
          firstName = values.name.trim().split(' ')[0] ?? ''
          lastName = values.name.trim().split(' ')[1] ?? ''
        }
        await subscribeToNewsletter(values.email, firstName, lastName, values.phone)
      }
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode({ 'form-name': 'commercial', ...values })
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      } else {
        setSent(true)
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    } finally {
      trackLeadFormSubmitted({
        $email: values.email,
        $user_id: values.email,
        page_name: '/clubs-and-coaches',
        name: values.name,
        phoneNumber: values.phone,
        facility_name: values.facility,
        zip_code: values.zipcode,
        about_us: values.about,
        lead_type: 'Commercial',
        utm_campaign: urlParams?.get('utm_campaign') ?? '',
        utm_source: urlParams?.get('utm_source') ?? '',
        utm_content: urlParams?.get('utm_content') ?? '',
        utm_medium: urlParams?.get('utm_medium') ?? '',
        utm_term: urlParams?.get('utm_term') ?? ''
      })
    }
  }

  useEffect(() => {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'commercialNewsletter' })
        .then((token) => {
          setToken(token)
        })
    })
  }, [])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex font-plutoLight flex-row sm:gap-5 gap-10 flex-wrap' >
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className='flex flex-col md:w-[48%] w-full gap-1' >
                    <FormLabel className={labelStyle} >Name</FormLabel>
                    <FormControl>
                        <Input {...field} className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className='flex flex-col md:w-[48%] w-full gap-1' >
                    <FormLabel className={labelStyle} >Email address</FormLabel>
                    <FormControl>
                        <Input {...field} type='email' className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem className='flex flex-col md:w-[48%] w-full gap-1' >
                    <FormLabel className={labelStyle} >Phone Number</FormLabel>
                    <FormControl>
                        <Input {...field} type="tel" className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="facility"
            render={({ field }) => (
                <FormItem className='flex flex-col md:w-[48%] w-full gap-1' >
                    <FormLabel className={labelStyle} >Facility Name</FormLabel>
                    <FormControl>
                        <Input {...field} type="text" className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
                <FormItem className='flex flex-col md:w-[48%] w-full gap-1' >
                    <FormLabel className={labelStyle} >Tell us about your facility...</FormLabel>
                    <FormControl>
                        {/* <Input {...field} type="text" rows={6} className={inputStyle} /> */}
                        <textarea {...field} rows={6} placeholder="Number of courts, lessons per day, etc." className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex flex-col md:w-[48%] gap-1 w-full">
                <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap' >
                        <FormLabel className={labelStyle} >Zip code</FormLabel>
                        <FormControl>
                            <Input {...field} type="text" pattern="^\d{5}(-\d{4})?$" className={inputStyle} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting) || sent} className='flex flex-row  justify-center items-center disabled:opacity-50 mt-6 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-t-green text-lg w-full tablet:w-64 font-thin rounded-full py-2 font-avenir uppercase border-2 transition-all duration-300 text-t-off-black bg-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black' >
                    {sent && !errorSubmitting && !form.formState.isSubmitting ? 'Sent' : 'Submit'}
                    {form.formState.isSubmitting && <Loader2 className="ml-2 size-4 animate-spin" /> }
                </Button>
                {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row items-center"><Info className='mr-2 sm:size-5 size-5' /> There was an error. Please try again.</p>}
                <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md mt-5' >
                        <FormControl>
                            <Checkbox checked={field.value ?? true} onCheckedChange={field.onChange} className='text-t-green' />
                        </FormControl>
                        <FormDescription className='font-plutoLight text-t-off-white' >
                            {'I\'d like to receive Tennibot email updates'}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </form>
    </Form>
  )
}
