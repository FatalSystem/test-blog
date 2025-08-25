import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './Button'
import { Loader2 } from 'lucide-react'
import { encode } from '@utils'

const inputStyle = 'bg-transparent w-full border-2 p-2.5 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-t-green focus:border-t-green text-t-off-white placeholder-gray-400 placeholder-font-plutoLight'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name is required'
  }),
  lastName: z.string().min(2, {
    message: 'Last name is required'
  }),
  email: z.string().email({
    message: 'Invalid email address'
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters'
  })
})

export default function ContactForm(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode({ 'form-name': 'contact', ...values })
      })

      if (response.ok) {
        // Redirect to thank you page
        window.location.href = '/contact-thankyou'
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="First Name"
                    className={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    className={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className={inputStyle}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  placeholder="Message"
                  className={`${inputStyle} min-h-[120px] resize-none`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-t-green/10 border-2 border-t-green w-full text-t-green font-avenirBold uppercase pb-2 pt-3 rounded-full hover:bg-t-green/5 transition-colors duration-200 disabled:opacity-50 text-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
