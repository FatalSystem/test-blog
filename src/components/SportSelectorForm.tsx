import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { Info, Loader2 } from 'lucide-react'
import { Checkbox } from './Checkbox'
import * as RadioGroup from '@radix-ui/react-radio-group'
const formSchema = z.object({
  sport: z.string()
})

const inputStyle = 'bg-transparent border-2 p-2.5 border-t-green rounded-md focus:outline-none focus:ring-indigo-500 focus:border-t-green mb-5'
const labelStyle = 'lg:text-lg xl:text-xl mb-2 hidden'

// TODO: improve phone validation with libphonenumber-js

export default function PhoneForm ({ from, listId, currentEmail }: { from: string, listId: string, currentEmail: string }): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sport: 'tennis'
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

      const response = await fetch('/.netlify/functions/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: currentEmail, from, rcToken: token, listId, phone: values.phone, sport: values.sport })
      })
      if (response.status !== 200) {
        setErrorSubmitting(true)
      } else {
        setSent(true)
        // edgetag('tag', 'Complete registration new')
      }
    } catch (error) {
      setErrorSubmitting(true)
      console.error(error)
    }
  }

  console.log(sent)

  useEffect(() => {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfPJjcpAAAAAOmlbStg7zLCp1PLGKONPGkRlA0g', { action: 'landingNewsletter' })
        .then((token) => {
          setToken(token)
        })
    })
  }, [])

  return (
    <>
      <p className="font-plutoLight text-t-off-white mb-8 md:text-md text-center " >Which sport do you play the most?</p>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='font-plutoLight mb-2' >
              <div className='flex w-full flex-col flex-nowrap mb-5' >
                  <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                      <FormItem className='flex flex-col md:items-start items-center  w-full gap-1 lg:w-full' >
                          <FormControl>
                              <RadioGroup.Root
                                className="flex flex-col mobilel:flex-row gap-5"
                                defaultValue="tennis"
                                value={field.value}
                                name="sport"
                                onValueChange={field.onChange}
                              >
                                <div className="flex items-center">
                                  <RadioGroup.Item
                                    className="size-[25px] cursor-default rounded-full bg-t-off-white outline-none hover:opacity-80 transition-all duration-100 ease-in-out"
                                    value="tennis"
                                    id="r1"
                                  >
                                    <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-t-off-black" />
                                  </RadioGroup.Item>
                                  <label
                                    className="pl-[15px] font-avenir text-[15px] leading-none text-t-off-white"
                                    htmlFor="r1"
                                  >
                                    Tennis
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroup.Item
                                    className="size-[25px] cursor-default rounded-full bg-t-off-white outline-none hover:opacity-80 transition-all duration-100 ease-in-out"
                                    value="padel"
                                    id="r2"
                                  >
                                    <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-t-off-black" />
                                  </RadioGroup.Item>
                                  <label
                                    className="pl-[15px] font-avenir text-[15px] leading-none text-t-off-white"
                                    htmlFor="r2"
                                  >
                                    Padel
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroup.Item
                                    className="size-[25px] cursor-default rounded-full bg-t-off-white outline-none hover:opacity-80 transition-all duration-100 ease-in-out"
                                    value="pickleball"
                                    id="r3"
                                  >
                                    <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-t-off-black" />
                                  </RadioGroup.Item>
                                  <label
                                    className="pl-[15px] font-avenir text-[15px] leading-none text-t-off-white"
                                    htmlFor="r3"
                                  >
                                    Pickleball
                                  </label>
                                </div>
                              </RadioGroup.Root>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                  />
                  <Button disabled={form.formState.disabled || !form.formState.isValid || form.formState.isSubmitting || (form.formState.isSubmitSuccessful && !errorSubmitting)} className={`group mt-8 flex flex-row justify-center items-center border-t-green md:hover:bg-t-green border-2 rounded-md p-3 stroke-t-off-black md:stroke-t-green md:hover:stroke-t-green relative ${sent ? 'bg-t-green md:hover:stroke-t-off-black' : 'bg-t-green md:bg-t-off-black md:hover:stroke-t-off-black'} transition-all duration-300 ease-in-out`} >
                    <span className={`font-avenir uppercase duration-300 ease-in-out ${sent ? 'text-t-off-black' : 'md:text-t-off-white text-t-off-black group-hover:text-t-off-black'}`}>{sent ? 'Thank you!' : 'Submit'}</span>
                      {form.formState.isSubmitting && <Loader2 className="size-5 right-5 animate-spin absolute md:stroke-t-green stroke-t-off-black" />}
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="16" viewBox="0 0 45 26" className={`${(form.formState.isSubmitting || sent) ? 'opacity-0' : 'opacity-100'} absolute right-5 `} fill="none">
                          <path opacity="0.5" d="M0 13H43M43 13L30.4146 25M43 13L30.4146 1" strokeWidth="3"/>
                      </svg>
                  </Button>
              </div>
              {errorSubmitting && <p className=" text-t-off-white mt-3 font-plutoLight text-sm text-pretty flex flex-row lg:justify-start md:justify-end items-center"><Info className='mr-2 sm:size-5 size-5' /> {sent ? 'Thank you!' : 'There was an error. Please try again.'}</p>}
          </form>
      </Form>
    </>
  )
}
