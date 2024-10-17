import { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './Button'
import { Loader2 } from 'lucide-react'
import { encode } from '@utils'
import { Checkbox } from './Checkbox'

const inputStyle = 'bg-transparent border-2 border-t-off-green rounded-md sm:p-1.5 p-2.5 focus:outline-none focus:ring-indigo-500 focus:border-t-green'
const labelStyle = 'lg:text-lg xl:text-xl mb-2'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Required'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  question: z.string().min(2, {
    message: 'Required'
  }),
  newsletter: z.boolean().optional()
})

export default function FAQ (): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      name: '',
      email: '',
      newsletter: true
    }
  })
  const [token, setToken] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)

  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

  const subscribeToNewsletter = async (email: string, fname: string, lname: string): Promise<void> => {
    try {
      if (form.formState.submitCount > 3) throw new Error('Too many attempts')
      if (!token) { console.error('No token'); return }
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, fname, lname, from: 'FAQ', rcToken: token })
      })
      const data = await response.json()
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
        await subscribeToNewsletter(values.email, firstName, lastName)
      }
      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode({ 'form-name': 'faq', ...values })
      })
      setSent(true)
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  useEffect(() => {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'faqNewsletter' })
        .then((token) => {
          setToken(token)
        })
    })
  }, [])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='text-t-green font-avenir 2xl:text-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-5' >
            <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1' >
                        <FormLabel className={labelStyle} >Question</FormLabel>
                        <FormControl>
                            {/* <Input {...field} type="text" rows={6} className={inputStyle} /> */}
                            <textarea {...field} rows={6} className={`${inputStyle} h-full`} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-col sm:gap-5 gap-10" >
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-1' >
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
                        <FormItem className='flex flex-col w-full gap-1' >
                            <FormLabel className={labelStyle} >Email address</FormLabel>
                            <FormControl>
                                <Input {...field} type='email' className={inputStyle} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex md:flex-col flex-col-reverse gap-1 w-full">
                        <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting) || sent}
                        className='flex flex-row  justify-center items-center disabled:opacity-50 mt-6 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-t-green text-lg w-full tablet:w-64 font-thin rounded-full py-2 font-avenirBold uppercase border-2 transition-all duration-300 text-t-green md:text-t-off-black bg-t-green border-t-off-green md:bg-green hover:bg-t-off-white' >
                            {sent && !errorSubmitting && !form.formState.isSubmitting ? 'Sent' : 'Submit'}
                            {form.formState.isSubmitting && <Loader2 className="ml-2 size-4 animate-spin" /> }
                        </Button>
                        <FormField
                        control={form.control}
                        name="newsletter"
                        render={({ field }) => (
                            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md mt-5' >
                                <FormControl>
                                    <Checkbox checked={field.value ?? true} onCheckedChange={field.onChange} className='border-t-off-green text-t-off-green' />
                                </FormControl>
                                <FormDescription className='font-plutoLight text-t-off-green' >
                                    {'I\'d like to receive Tennibot email updates'}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
        </form>
    </Form>
  )
}
