import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { encode } from '@utils'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from './Button'

const inputStyle = 'bg-transparent border-2 text-[#7A7A7A] rounded-md sm:p-1.5 p-2.5 focus:outline-none focus:ring-indigo-500 focus:border-t-green'
const labelStyle = 'font-avenir text-[#7A7A7A] text-sm mb-2'

const formSchema = z.object({
  hear: z.string().max(500),
  competitor: z.string().max(500)
})

export default function PostPurchaseForm ({ email }: { email: string }): JSX.Element {
  const [sent, setSent] = useState<boolean>(false)
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hear: '',
      competitor: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    if (errorSubmitting) setErrorSubmitting(false)
    if (form.formState.submitCount > 3) throw new Error('Too many attempts')
    if (values.hear === '' && values.competitor === '') {
      setErrorSubmitting(true)
      return
    }
    try {
      const response = await fetch('/.netlify/functions/post-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, email })
      })
      setSent(true)
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }
  console.log(email)
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full text-[#7A7A7A] font-avenir 2xl:text-lg mt-5' >
            <FormField
                control={form.control}
                name="hear"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1' >
                        <FormLabel className={labelStyle} >1. How did you hear about us?</FormLabel>
                        <FormControl>
                            {/* <Input {...field} type="text" rows={6} className={inputStyle} /> */}
                            <textarea {...field} rows={2} className={`${inputStyle} h-full`} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="competitor"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1 mt-4' >
                        <FormLabel className={labelStyle} >2. What made you choose us over other options?</FormLabel>
                        <FormControl>
                            {/* <Input {...field} type="text" rows={6} className={inputStyle} /> */}
                            <textarea {...field} rows={2} className={`${inputStyle} h-full`} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting) || sent} className='flex flex-row  justify-center items-center disabled:opacity-50 mt-6 cursor-pointer focus:outline-none focus:ring-t-off-black focus:border-t-green text-lg w-full tablet:w-64 font-thin rounded-full py-2 font-avenir uppercase border-2 transition-all duration-300 text-t-off-black md:text-t-off-black bg-t-green border-t-green hover:border-t-off-black md:bg-t-green hover:bg-t-off-white hover:text-t-off-black' >
                {sent && !errorSubmitting && !form.formState.isSubmitting ? 'Sent' : 'Submit'}
                {form.formState.isSubmitting && <Loader2 className="ml-2 size-4 animate-spin" /> }
            </Button>
            {errorSubmitting && <p className='text-red-500 text-sm mt-2'>Please fill out all fields</p>}
        </form>
    </Form>
  )
}
