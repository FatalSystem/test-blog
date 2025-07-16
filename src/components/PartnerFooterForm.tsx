import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from './Form'
import { Input } from './Input'
import { Info, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { trackNewsletterSubscribed } from '@utils'

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  })
})

export default function PartnerFooterForm ({ formClassName, inputClassName, buttonClassName, listId }: { formClassName: string, inputClassName: string, buttonClassName: string, listId: string }): React.JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })
  const [token, setToken] = useState<string>('')
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)
  const formSent = form.formState.isSubmitSuccessful && !errorSubmitting && !form.formState.isSubmitting

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
      const response = await fetch('/.netlify/functions/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, from: 'Footer', rcToken: token, listId })
      })
      trackNewsletterSubscribed({
        $email: values.email,
        $user_id: values.email,
        page_name: '/specs',
        utm_campaign: urlParams?.get('utm_campaign') ?? '',
        utm_source: urlParams?.get('utm_source') ?? '',
        utm_content: urlParams?.get('utm_content') ?? '',
        utm_medium: urlParams?.get('utm_medium') ?? '',
        utm_term: urlParams?.get('utm_term') ?? ''
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
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
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className={formClassName} >
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
                            className={`${inputClassName} ${formSent && 'text-t-off-black bg-t-green text-center pl-0'}`}
                         />
                    </FormControl>
                </FormItem>
            )}
            />
            {!formSent && (
                <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className={buttonClassName} >
                        {form.formState.isSubmitting && <Loader2 className="size-5 animate-spin absolute inset-0 m-auto" />}
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="16" viewBox="0 0 45 26" className={`${form.formState.isSubmitting ? 'opacity-0' : 'opacity-100'}`} fill="none">
                            <path opacity="0.5" d="M0 13H43M43 13L30.4146 25M43 13L30.4146 1" strokeWidth="3"/>
                        </svg>
                </Button>
            )}
        </form>
        {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row items-center"><Info className='mr-2 sm:size-5 size-5' /> There was an error. Please try again.</p>}
    </Form>
  )
}
