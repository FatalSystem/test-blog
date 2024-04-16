import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './Button'
import { Loader2 } from 'lucide-react'

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
      newsletter: false
    }
  })
  const [token, setToken] = useState<string>('')

  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  const subscribeToNewsletter = async (email: string): Promise<void> => {
    try {
      if (form.formState.submitCount > 3) throw new Error('Too many attempts')
      if (!token) { console.error('No token'); return }
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, rcToken: token })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    if (errorSubmitting) setErrorSubmitting(false)
    if (form.formState.submitCount > 3) throw new Error('Too many attempts')

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('lastName', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    formData.append('facility', values.facility)
    formData.append('title', values.facility)
    formData.append('about', values.about)
    formData.append('zipcode', values.zipcode)
    try {
      if (values.newsletter && values.email !== '') {
        await subscribeToNewsletter(values.email)
      }
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode({ 'form-name': 'commercial', ...values })
      })
      console.log(response)
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
    // try {
    //   // TODO: RECAPTCHA
    //   const response = await fetch('/.netlify/functions/commercial', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(values)
    //   })
    //   const data = await response.json()
    //   console.log(data)
    // } catch (error) {
    //   setErrorSubmitting(true)
    //   console.error(error)
    // }
  }

  useEffect(() => {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'footerNewsletter' })
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
                <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className='flex flex-row  justify-center items-center disabled:opacity-50 mt-6 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-t-green text-lg w-full tablet:w-64 font-thin rounded-full py-2 font-avenir uppercase border-2 transition-all duration-300 text-t-off-black bg-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black' >
                    {form.formState.isSubmitSuccessful && !errorSubmitting && !form.formState.isSubmitting ? 'Sent' : 'Submit'}
                    {form.formState.isSubmitting && <Loader2 className="ml-2 size-4 animate-spin" /> }
                </Button>
                <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                    <FormItem className='flex flex-row w-full gap-2 mt-5' >
                        <FormControl>
                            <Input {...field} type="checkbox" className="appearance-none border-2 border-t-off-white size-4 rounded-sm checked:bg-t-green focus:outline-none focus:ring-indigo-500 focus:border-t-green" />
                        </FormControl>
                        <FormDescription>
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
