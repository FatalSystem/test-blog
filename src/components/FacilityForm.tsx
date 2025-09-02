import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { Loader2 } from 'lucide-react'
import { encode } from '@utils'

const inputStyle =
  'bg-transparent w-full border border-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C0F20C] focus:border-[#C0F20C] text-white placeholder-[#9CA3AF]-400 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[24px]'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(6, { message: 'Phone is required' }),
  zip: z.string().min(2, { message: 'Zip code is required' }),
  facility: z.string().min(2, { message: 'Facility name is required' }),
  message: z.string().min(10, { message: 'Please provide more details' }),
  updates: z.boolean().optional()
})

export default function FacilityForm(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zip: '',
      facility: '',
      message: '',
      updates: false
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode({ 'form-name': 'facility-form', ...values })
      })

      if (response.ok) {
        window.location.href = '/thank-you'
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-[566px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
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
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Zip Code"
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
          name="facility"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Facility Name"
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
                  placeholder="Tell us about your facility. Number of courts, lessons per day, etc."
                  className={`${inputStyle} min-h-[120px] resize-none`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="updates"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                />
              </FormControl>
              <span className="text-sm text-white ">
                I’d like to receive Tennibot email updates
              </span>
            </FormItem>
          )}
        />

    <div className="flex">
      <Button
        type="submit"
        disabled={isSubmitting}

        className="w-[256px] rounded-full border-2 border-[#C0F20C] bg-[#C0F20C]/10 text-[#C0F20C] 
          font-bold uppercase transition hover:bg-[#C0F20C]  hover:text-black 
          disabled:opacity-50 text-[20px] px-16 py-1.5"
        >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </div>


      </form>
    </Form>
  )
}
