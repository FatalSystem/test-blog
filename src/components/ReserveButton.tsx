import { getDistinctId, track } from '@utils'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function ReserveButton (): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  const createCheckout = async (trackClick = false): Promise<string | null> => {
    try {
      const distinctId = getDistinctId()
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams = {
        campaign: urlParams.get('utm_campaign'),
        content: urlParams.get('utm_content'),
        id: urlParams.get('utm_id'),
        medium: urlParams.get('utm_medium'),
        source: urlParams.get('utm_source'),
        term: urlParams.get('utm_term')
      }
      // console.log('UTM params:', utmParams)
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          distinctId,
          utmParams
        })
      })

      if (trackClick) {
        track('Initiate Checkout', {
          buttonId: 'partner-reserve-button',
          product: 'Partner Reservation',
          price: 499
        })
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const handleCreateCheckout = async (): Promise<void> => {
    setIsLoading(true)
    if (checkoutUrl) {
      window.location.href = checkoutUrl
      return
    }

    console.log('Generating checkout URL...')
    const url = await createCheckout(true)
    if (url) {
      console.log('c')
      window.location.href = url
    } else {
      // Fallback to Stripe payment link, no tracking :(
      window.location.href = 'https://buy.stripe.com/6oEdTp8pygzo5AA9AC'
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      const url = await createCheckout(false)
      setCheckoutUrl(url)
    }, 5000)

    return () => { clearTimeout(timer) }
  }, [])

  return (
    <a
      data-tracking="partner-reserve-button"
      onClick={handleCreateCheckout}
      className={`w-72 cursor-pointer text-xl 2xl:text-2xl 2xl:py-3 rounded-full py-2 font-avenir uppercase text-t-green border-2 transition duration-300 text-center bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
    >
      <span className="flex  place-items-center justify-center">
        Buy
        {isLoading && <Loader2 className="ml-2 size-4 mb-1 animate-spin " />}
      </span>
    </a>
  )
}
