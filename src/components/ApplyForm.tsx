import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './Form'
import { Input } from './Input'
import { useState } from 'react'
import { Info, Loader2 } from 'lucide-react'
import { Button } from './Button'

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
  resume: z.optional(z.any()).refine((fileList) => fileList.length > 0, {
    message: 'File is required'
  }).refine((fileList) => {
    if (fileList.length === 0) return false
    return fileList[0].size <= 5000000
  }, {
    message: 'File must be less than 5MB'
  }).refine((fileList) => {
    if (fileList.length === 0) return false
    return fileList[0].type === 'application/pdf'
  }, {
    message: 'File must be a PDF'
  }),
  coverLetter: z.optional(z.any().refine((fileList) => {
    if (fileList.length === 0) return true
    return fileList[0].size <= 5000000
  }, {
    message: 'File must be less than 5MB'
  }).refine((fileList) => {
    if (fileList.length === 0) return true
    return fileList[0].type === 'application/pdf'
  }, {
    message: 'File must be a PDF'
  }))
})

const inputStyle = 'w-full bg-transparent border-2 border-t-off-white rounded-md sm:p-1.5 p-2.5 focus:outline-none focus:ring-indigo-500 focus:border-t-green'

export function ApplyForm ({ id, slug, openQuestionId }): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      resume: '',
      coverLetter: ''
    }
  })
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    if (errorSubmitting) setErrorSubmitting(false)
    const url = `https://tennibot.recruitee.com/api/offers/${slug}/candidates`
    const formData = new FormData()
    formData.append('candidate[name]', values.name)
    formData.append('candidate[email]', values.email)
    formData.append('candidate[phone]', values.phone)
    formData.append('candidate[cv]', values.resume[0])

    if (openQuestionId && values.coverLetter[0]) {
      formData.append('candidate[open_question_answers_attributes][0][open_question_id]', openQuestionId)
      formData.append('candidate[open_question_answers_attributes][0][file]', values.coverLetter[0])
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.candidate && data.candidate.name === values.name) {
        console.log('Application successful')
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-avenir">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} type="tel" className={inputStyle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} type="email" className={inputStyle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col md:flex-row w-full md:gap-10 gap-5' >
            <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                    <FormItem className='mb-5 '>
                    <FormLabel>Resume</FormLabel>
                    <FormDescription>
                        Please upload a PDF file.
                    </FormDescription>
                    <FormControl>
                        <Input /* {...field} */ {...form.register('resume')} type="file" className="flex flex-col file:rounded-full file:bg-t-off-white file:text-t-off-black file:px-4 file:py-1 file:border-0 file:mr-5 file:font-avenir" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                    <FormItem className='mb-5' >
                    <FormLabel>Cover Letter</FormLabel>
                    <FormDescription>
                        Please upload a PDF file.
                    </FormDescription>
                    <FormControl>
                        <Input /* {...field} */ {...form.register('coverLetter')} type="file" className="flex flex-col file:rounded-full file:bg-t-off-white file:text-t-off-black file:px-4 file:py-1 file:border-0 file:mr-5 file:font-avenir" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className='mt-10 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-t-green text-lg w-full tablet:w-64 font-thin rounded-full py-2 font-avenir uppercase border-2 transition-all duration-300 text-t-off-black bg-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black' >
          {form.formState.isSubmitSuccessful && !errorSubmitting && !form.formState.isSubmitting ? 'Sent' : 'Submit'}
          {form.formState.isSubmitting && <Loader2 className="ml-2 size-4 animate-spin" /> }
        </Button>
        {errorSubmitting && <p className="font-plutoLight text-sm text-pretty flex flex-row items-center"><Info className='mr-4 sm:size-5 size-8' /> There was an error submitting your application. Please try again.</p>}
      </form>
    </Form>
  )
}
