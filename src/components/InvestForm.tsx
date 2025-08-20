import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { Info, Loader2 } from 'lucide-react'
import { Checkbox } from './Checkbox'
import PhoneForm from './PhoneForm'
import { listIds, trackLeadFormSubmitted } from '@utils'
import SportSelectorForm from './SportSelectorForm'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Required'
  }).max(100, {
    message: 'Invalid name.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }).max(100, {
    message: 'Invalid email address.'
  }),
  // phone: z.string().optional(),
  call: z.boolean().optional(),
  linkedin: z.string().min(10, {
    message: 'Required'
  }).max(100, {
    message: 'Invalid LinkedIn profile URL.'
  })
})

const inputStyle = 'bg-transparent border-2 p-2.5 border-t-green rounded-md focus:outline-none focus:ring-indigo-500 focus:border-t-green mb-5'
const labelStyle = 'lg:text-lg xl:text-xl mb-2 hidden'

export default function InvestForm ({ from, listId }: { from: string, listId: string }): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      linkedin: '',
      call: true
    }
  })

  const [token, setToken] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)
  const [showSportSelector, setShowSportSelector] = useState<boolean>(false)
  const [currentEmail, setCurrentEmail] = useState<string>('')

  const [urlParams, setUrlParams] = useState<URLSearchParams>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search))
    }
  }, [])

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
      const response = await fetch('/.netlify/functions/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, from, fname: firstName ?? values.name, lname: lastName ?? '', rcToken: token, listId: 'URW7Es', linkedin: values.linkedin })
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      } else {
        setSent(true)
        // setShowSportSelector(true)
        setCurrentEmail(values.email)
        // edgetag('tag', 'Complete registration new')
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    } finally {
      trackLeadFormSubmitted({
        $email: values.email,
        $user_id: values.email,
        page_name: '/invest',
        name: values.name,
        linkedin: values.linkedin,
        lead_type: 'Investor',
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
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'landingNewsletter' })
        .then((token) => {
          setToken(token)
        })
    })
  }, [])

  if (showSportSelector) {
    return <SportSelectorForm currentEmail={currentEmail} listId={listIds.partner} from={from} />
  }

  return (
    <>
      <p className="font-plutoLight text-t-off-white mb-8 md:text-md text-sm text-center " >{sent ? 'Thanks for your interest; we\'ll get back to you as soon as possible!' : 'Thanks for your interest. Please fill the following form and we\'ll get back to you as soon as possible.'}</p>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='font-plutoLight mb-2' >
              <div className='flex md:flex-row flex-col md:gap-2'>
                  <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem className='flex flex-col w-full gap-1' >
                          <FormControl>
                              <Input {...field} placeholder='Name*' className={inputStyle} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className='flex md:flex-row flex-col md:gap-2'>
                  <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                      <FormItem className='flex flex-col w-full gap-1' >
                          <FormControl>
                              <Input {...field} placeholder='LinkedIn Profile URL*' className={inputStyle} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className='flex w-full flex-row flex-nowrap mb-5' >
                  <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem className='flex flex-col w-full gap-1 lg:w-full' >
                          <FormLabel className={labelStyle} >Email address*</FormLabel>
                          <FormControl>
                              <Input {...field} placeholder='Email Address*' value={sent ? 'Thank you!' : field.value} style={{ borderRadius: sent ? '0.35rem 0.35rem 0.35rem 0.35rem' : '0.35rem 0 0 0.35rem', width: '100%' }} type='email' className={`${inputStyle} border-l-2 border-t-2 border-b-2 border-r-0 pl-5 border-t-green mb-0 ${sent && 'text-t-off-black bg-t-green text-center pl-0'}`} />
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
              {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row lg:justify-start md:justify-end items-center"><Info className='mr-2 sm:size-5 size-5' /> There was an error. Please try again.</p>}
          </form>
      </Form>
    </>
  )
}
