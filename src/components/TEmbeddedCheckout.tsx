import { getDistinctId } from '@utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadStripe, type ResultAction, type StripeEmbeddedCheckoutShippingDetailsChangeEvent } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
// const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY as string)
const stripePromise = loadStripe('pk_live_51POCzIRqXimb7JbceMZQnSwe4vG9cnnYTvf6ynI2wneqONH2jLrP1L22hqV6SDQOLBRKFHaeB4UDQFM7yBvkPwfU008tk3uWTO')

const urlParams = new URLSearchParams(window.location.search)
const MAX_RETRIES = 4 // Maximum number of retries
const checkoutType = urlParams.get('type')
console.log('rewardfulReferral fn outer: ', window.Rewardful.referral)
export default function TEmbeddedCheckout (): JSX.Element {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [metadataUpdated, setMetadataUpdated] = useState<boolean>(false)

  useEffect(() => {
    if (!sessionId || metadataUpdated) {
      return // Don't do anything if we don't have a sessionId or already updated
    }

    let attempts = 0
    let interval: NodeJS.Timeout | null = null

    const updateSessionWithDistinctId = async () => {
      // console.log('Trying to update session with distinctId', attempts)
      const distinctId = getDistinctId()
      if (!distinctId) {
        attempts++
        if (attempts >= MAX_RETRIES) {
          clearInterval(interval!)
        }
        return
      }

      try {
        await fetch('/.netlify/functions/update-checkout-metadata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionId,
            distinctId,
            checkoutType
          })
        })
        setMetadataUpdated(true)
        clearInterval(interval!)
      } catch (error) {
        console.error('Failed to update session metadata:', error)
        attempts++
        if (attempts >= MAX_RETRIES) {
          clearInterval(interval!)
        }
      }
    }

    interval = setInterval(updateSessionWithDistinctId, 3000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [sessionId, metadataUpdated]) // Remove retryCount from dependencies

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    // const distinctId = getDistinctId()
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = {
      //   campaign: urlParams.get('utm_campaign'),
      //   content: urlParams.get('utm_content'),
      //   id: urlParams.get('utm_id'),
      //   medium: urlParams.get('utm_medium'),
      //   term: urlParams.get('utm_term'),
      source: urlParams.get('utm_source')
    }

    // Get Rewardful referral if available
    let rewardfulReferral: string | undefined
    if (typeof window !== 'undefined' && window.Rewardful && window.Rewardful.referral) {
      rewardfulReferral = window.Rewardful.referral
      console.log('rewardfulReferral inner: ', rewardfulReferral)
    }

    // added begin checkout datalayer
    try {
      window.dataLayer = window.dataLayer || []
      if (checkoutType == 'onetime') {
        window.dataLayer.push({
          event: 'begin_checkout',
          ecommerce: {
            currency: 'USD',
            value: 2995,
            items: [{
              item_id: '8317998170275',
              item_name: 'Tennibot Rover and Station',
              price: 2999,
              currency: 'USD',
              quantity: 1,
              item_category: 'Tennis Robots'
            }]
          }
        })
      } else if (checkoutType == 'partner') {
        window.dataLayer.push({
          event: 'begin_checkout',
          ecommerce: {
            currency: 'USD',
            value: 2195,
            items: [{
              item_id: 'partner8317998170275',
              item_name: 'Partner',
              price: 2195,
              currency: 'USD',
              quantity: 1,
              item_category: 'Tennis Robots'
            }]
          }
        })
      }
    } catch (error) {
      console.log('datalayer error: ', error)
    }
    // checkout begin add datalayer add end

    return await fetch('/.netlify/functions/create-embedded-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        distinctId: rewardfulReferral,
        checkoutType,
        utmParams
      })
    }).then(async (res) => {
      const resp = await res.json()
      return resp
    }).then((data) => {
      setSessionId(data.id)
      return data.client_secret
    })
  }, [])

  // Call your backend to set shipping options
  const onShippingDetailsChange = async (shippingDetailsChangeEvent: StripeEmbeddedCheckoutShippingDetailsChangeEvent): Promise<ResultAction> => {
    if (checkoutType === 'annual' || checkoutType === 'monthly') {
      return await Promise.resolve({ type: 'accept' })
    }
    const { checkoutSessionId, shippingDetails } = shippingDetailsChangeEvent

    // add dataLayer start
    try {
      window.dataLayer = window.dataLayer || []

      if (checkoutType == 'onetime') {
        window.dataLayer.push({
          event: 'add_shipping_info',
          ecommerce: {
            currency: 'USD',
            value: 2995,
            items: [{
              item_id: '8317998170275',
              item_name: 'Tennibot Rover and Station',
              price: 2999,
              currency: 'USD',
              quantity: 1,
              item_category: 'Tennis Robots'
            }],
            ...shippingDetails
          }
        })
      } else if (checkoutType == 'partner') {
        window.dataLayer.push({
          event: 'add_shipping_info',
          ecommerce: {
            currency: 'USD',
            value: 2195,
            items: [{
              item_id: 'partner8317998170275',
              item_name: 'Partner',
              price: 2195,
              currency: 'USD',
              quantity: 1,
              item_category: 'Tennis Robots'
            }],
            ...shippingDetails
          }
        })
      }
    } catch (error) {
      console.log('add_shipping_info: ', error)
    }

    // add dataLayer end

    const response = await fetch('/.netlify/functions/calculate-shipping', {
      method: 'POST',
      body: JSON.stringify({
        checkout_session_id: checkoutSessionId,
        shipping_details: shippingDetails,
        checkout_type: checkoutType
      })
    })

    if (response.type === 'error') {
      return await Promise.resolve({ type: 'reject', errorMessage: response.message })
    } else {
      return await Promise.resolve({ type: 'accept' })
    }
  }

  const options = useMemo(() => {
    // This weird if is in case we want to bring back subscriptions
    if (checkoutType?.includes('partner')) {
      return { fetchClientSecret, onShippingDetailsChange }
    }
    if (checkoutType === 'onetime' || checkoutType === 'tennisbundle' || checkoutType === 'picklebotreservation' || checkoutType === 'padelbotreservation') {
      return { fetchClientSecret, onShippingDetailsChange }
    }
    return { fetchClientSecret }
  }, [checkoutType, fetchClientSecret, onShippingDetailsChange]
  )

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
