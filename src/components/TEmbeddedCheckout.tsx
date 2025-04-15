import { getDistinctId, track } from '@utils'
import { useCallback } from 'react'
import { loadStripe, type ResultAction, type StripeEmbeddedCheckoutShippingDetailsChangeEvent } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
// const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY as string)
const stripePromise = loadStripe('pk_live_51POCzIRqXimb7JbceMZQnSwe4vG9cnnYTvf6ynI2wneqONH2jLrP1L22hqV6SDQOLBRKFHaeB4UDQFM7yBvkPwfU008tk3uWTO')

const urlParams = new URLSearchParams(window.location.search)
const checkoutType = urlParams.get('type')
export default function TEmbeddedCheckout (): JSX.Element {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const distinctId = getDistinctId()
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = {
    //   campaign: urlParams.get('utm_campaign'),
    //   content: urlParams.get('utm_content'),
    //   id: urlParams.get('utm_id'),
    //   medium: urlParams.get('utm_medium'),
    //   term: urlParams.get('utm_term'),
      source: urlParams.get('utm_source')
    }
    return await fetch('/.netlify/functions/create-embedded-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        distinctId,
        checkoutType,
        utmParams
      })
    }).then(async (res) => {
      const resp = await res.json()
      return resp
    }).then((data) => data.client_secret)
  }, [])

  // Call your backend to set shipping options
  const onShippingDetailsChange = async (shippingDetailsChangeEvent: StripeEmbeddedCheckoutShippingDetailsChangeEvent): Promise<ResultAction> => {
    if (checkoutType === 'annual' || checkoutType === 'monthly') {
      return await Promise.resolve({ type: 'accept' })
    }
    const { checkoutSessionId, shippingDetails } = shippingDetailsChangeEvent
    const response = await fetch('/.netlify/functions/calculate-shipping', {
      method: 'POST',
      body: JSON.stringify({
        checkout_session_id: checkoutSessionId,
        shipping_details: shippingDetails
      })
    })

    if (response.type === 'error') {
      return await Promise.resolve({ type: 'reject', errorMessage: response.message })
    } else {
      return await Promise.resolve({ type: 'accept' })
    }
  }

  const options = checkoutType === 'onetime' ? { fetchClientSecret, onShippingDetailsChange } : { fetchClientSecret }

  return (
    <div id="checkout" className="p-4">
        <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
