import { useEffect, useState } from 'react'
import { CircleCheck, AlertCircle, Loader2 } from 'lucide-react'
import tennibotLogo from '../assets/tennibot-logo.svg'
import { Pages } from '@utils'

interface SessionData {
  currency_conversion: {
    amount_total: number
    fx_rate: number
  }
}

export default function ThankYouContent (): JSX.Element {
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generateClientId = (): string => {
    const randomPart1 = Math.floor(Math.random() * 1e10) // Random 10-digit number
    const randomPart2 = Math.floor(Math.random() * 1e10) // Random 10-digit number
    return `${randomPart1}.${randomPart2}`
  }

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    function gtag () { dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', 'G-5MY88GRQM4', {
      page_path: window.location.pathname,
      page_title: 'Thank You'
    })
    console.log('gtag reinitialized')
    const fetchSessionData = async (clientId: string) => {
      console.log('Fetching session data')
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get('session')
      if (!sessionId) {
        setError('No session ID found')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/.netlify/functions/record-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ session: sessionId, clientId })
        })

        if (!response.ok) {
          throw new Error('Payment verification failed')
        }

        const data = await response.json() as SessionData
        gtag('event', 'conversion', { send_to: 'AW-16667981876/mKp3CMnUsckZELTw9Is-', value: data.amount, currency: data.currency, transaction_id: sessionId })
        setSessionData(data)
        setIsLoading(false)
      } catch (err) {
        setError('Unable to verify payment. Please contact support.')
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof gtag === 'function') {
      gtag('get', 'G-5MY88GRQM4', 'client_id', (clientId: string) => {
        console.log('clientId', clientId)
        // Store or use the clientId as needed
        console.log('Are we getting here?')
        fetchSessionData(clientId)
      })
    } else {
      console.log('Getting here?')
      const randomClientId = generateClientId()
      fetchSessionData(randomClientId)
      console.warn('Google Analytics not initialized')
    }
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
        <section className="mx-auto md:h-[100vh] h-[150vh] flex md:flex-row flex-col-reverse justify-center">
            <div className="flex-col flex bg-t-off-black md:w-[50%] w-full h-full justify-start mt-[15vh]">
                <div className="flex w-[80%] mx-auto flex-col justify-center mb-8">
                    <div>
                        <img src={tennibotLogo.src} width={30} alt="Tennibot Logo" />
                        <p className="font-avenir text-t-gray mt-3">Pay Tennibot</p>
                        <p className="font-avenirBold text-t-off-white text-2xl mt-3">${sessionData?.amount} {sessionData?.currency}</p>
                    </div>
                    <div className="mt-5 border-b-[1px] pb-10 border-[#afafae5f] " >
                        <div className="flex flex-row justify-between" >
                            <p className="font-avenir text-t-off-white">Partner</p>
                            <p className="font-avenir text-t-off-white">${sessionData?.amount} {sessionData?.currency}</p>
                        </div>
                        <p className="font-avenir text-t-gray text-sm mt-3">Thank you for you reservation. The expected shipping date is April 2025.</p>
                        <div className="bg-[#afafae5f] rounded-md px-2 py-[1.5px] flex flex-col justify-center mt-3 w-fit ">
                            <p className="font-avenir text-t-off-white text-sm" >Qty {Math.ceil(((parseInt(sessionData?.currency_conversion?.amount_subtotal ?? 49900) / 100).toFixed(2)) / 499.00) || 1}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-5" >
                        <p className="font-avenir text-t-off-white">Total paid</p>
                        <p className="font-avenir text-t-off-white">${sessionData?.amount} {sessionData?.currency}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-t-off-white md:w-[50%] w-full h-full justify-start pt-[15vh]">
                <div className="w-[80%] mx-auto flex flex-col justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <CircleCheck size={40} color="green" />
                        <h1 className="font-avenirBold text-t-off-black text-2xl mt-3">Thank you!</h1>
                        <p className="font-avenir text-t-gray mt-3">A payment to TENNIBOT will appear on your statement.</p>
                        <div className="bg-[#afafae5f] rounded-md px-5 py-5 flex flex-row justify-between mt-3 w-full">
                            <p className="font-avenirBold uppercase text-[#595959dc]">Tennibot</p>
                            <p className="font-avenir text-[#595959dc]">${sessionData.amount.toFixed(2)} {sessionData.currency}</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <a href={Pages.TERMS} className="font-avenir text-t-gray mt-3">Terms</a>
                            <a href={Pages.PRIVACY} className="font-avenir text-t-gray mt-3">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
