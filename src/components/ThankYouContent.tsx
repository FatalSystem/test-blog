import { useEffect, useState } from 'react'
import { CircleCheck, AlertCircle, Loader2 } from 'lucide-react'
import tennibotLogo from '../assets/tennibot-logo-green.svg'
import { Pages } from '@utils'
import PostPurchaseForm from './PostPurchaseForm'

interface SessionData {
  currency: string
  value: number
  quantity: number
  email: string
}

export default function ThankYouContent (): JSX.Element {
  const [sessionData, setSessionData] = useState<SessionData | null>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessionData = async () => {
      console.log('Fetching session data')
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get('session')
      if (!sessionId) {
        setError('No session ID found')
        setIsLoading(false)
        return
      }

      const MAX_RETRIES = 3
      const TIMEOUT_MS = 10000 // 10 seconds

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

          const response = await fetch('/.netlify/functions/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: sessionId }),
            signal: controller.signal
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json() as SessionData
          gtag('event', 'conversion', {
            send_to: 'AW-16667981876/mKp3CMnUsckZELTw9Is-',
            value: data.value,
            currency: data.currency,
            transaction_id: sessionId
          })
          setSessionData(data)
          setIsLoading(false)
          return // Success! Exit the retry loop
        } catch (err) {
          console.error(`Attempt ${attempt + 1} failed:`, err)
          if (attempt === MAX_RETRIES - 1) {
            setError('Unable to verify payment. Please contact support.')
            setIsLoading(false)
          } else {
            // Wait for 1 second before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
          }
        }
      }
    }

    void fetchSessionData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" color="white" size={40} />
      </div>
    )
  }

  return (
    <main className="overflow-hidden text-t-off-white">
        <section className="mx-auto md:h-[100vh] flex md:flex-row flex-col-reverse justify-center">
            <div className="flex-col flex bg-t-off-black md:w-[50%] w-full h-full justify-start mt-[15vh]">
                <div className="flex w-[80%] mx-auto flex-col justify-center mb-8">
                    <div>
                        <img src={tennibotLogo.src} width={30} alt="Tennibot Logo" />
                        <p className="font-avenir text-t-gray mt-3">Pay Tennibot</p>
                        <p className="font-avenirBold text-t-off-white text-2xl mt-3">${sessionData?.value ?? 499.00} {sessionData?.currency ?? 'USD'}</p>
                    </div>
                    <div className="mt-5 border-b-[1px] pb-10 border-[#afafae5f] " >
                        <div className="flex flex-row justify-between" >
                            <p className="font-avenir text-t-off-white">Partner</p>
                            <p className="font-avenir text-t-off-white">${sessionData?.value ?? 499.00} {sessionData?.currency ?? 'USD'}</p>
                        </div>
                        <p className="font-avenir text-t-gray text-sm mt-3">Reserve for only $499 today to secure your partner. Pay the remaining $1595 before shipping in May 2025.</p>
                        <div className="bg-[#afafae5f] rounded-md px-2 py-[1.5px] flex flex-col justify-center mt-3 w-fit ">
                            <p className="font-avenir text-t-off-white text-sm" >Qty {sessionData?.quantity ?? 1}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-5" >
                        <p className="font-avenir text-t-off-white">Total paid</p>
                        <p className="font-avenir text-t-off-white">${sessionData?.value ?? 499.00} {sessionData?.currency ?? 'USD'}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-t-off-white md:w-[50%] w-full h-full justify-start pt-24 pb-24">
                <div className="w-[80%] mx-auto flex flex-col justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <CircleCheck size={40} color="#C0F20C" />
                        <h1 className="font-avenirBold text-t-off-black text-2xl mt-3">Thank you!</h1>
                        <p className="font-avenir text-t-gray mt-3">A payment to TENNIBOT will appear on your statement.</p>
                        <div className="bg-[#afafae5f] rounded-md px-5 py-5 flex flex-row justify-between mt-3 w-full">
                            <p className="font-avenirBold uppercase text-[#595959dc]">Tennibot</p>
                            <p className="font-avenir text-[#595959dc]">${sessionData?.value.toFixed(2) ?? 499.00} {sessionData?.currency ?? 'USD'}</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <a href={Pages.TERMS} className="font-avenir text-t-gray mt-3">Terms</a>
                            <a href={Pages.PRIVACY} className="font-avenir text-t-gray mt-3">Privacy</a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-avenir text-[#919191] text-sm mt-3">Hey friend, we'd love your feedback to helps us improve. It takes less than a minute!👋🏼</p>
                      <PostPurchaseForm email={sessionData?.email} />
                      <p className="font-avenir text-[#919191] text-sm mt-5 text-left">Thank you again for your time and for choosing us!😊</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
