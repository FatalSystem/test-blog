import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
  // if (event.method !== 'POST') {
  //   return new Response('Method Not Allowed', { status: 405 })
  // }

  const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

  const calculateShippingOptions = (shippingDetails: any, checkoutType: string): string => {
    if (checkoutType === 'partner') {
      if (shippingDetails.address.country === 'US') {
        return 'shr_1QHg8RRqXimb7JbcyiCOmKix'
      }
      return 'shr_1RORGbRqXimb7JbcecrPI5Ja'
    }
    // Free shr_1QHg8RRqXimb7JbcyiCOmKix
    // 95 shr_1RCqOURqXimb7JbcSi1wp8AE
    // 395 shr_1RCqPLRqXimb7JbcL3CQ3lzS
    // 295 shr_1RCqQ2RqXimb7JbclBfYfidT
    // 145 shr_1RCqQdRqXimb7Jbc2YmbW7j0

    if (shippingDetails.address.country === 'US') {
      return 'shr_1QHg8RRqXimb7JbcyiCOmKix'
    }

    if (shippingDetails.address.country === 'CA' || shippingDetails.address.country === 'MX') {
      return 'shr_1RCqOURqXimb7JbcSi1wp8AE'
    }

    if (shippingDetails.address.country === 'CN' || shippingDetails.address.country === 'JP' || shippingDetails.address.country === 'SG' || shippingDetails.address.country === 'KR') {
      return 'shr_1RCqPLRqXimb7JbcL3CQ3lzS'
    }

    if (shippingDetails.address.country === 'AU' || shippingDetails.address.country === 'DK' || shippingDetails.address.country === 'CH' || shippingDetails.address.country === 'SE') {
      return 'shr_1RCqQ2RqXimb7JbclBfYfidT'
    }

    if (shippingDetails.address.country === 'GB' || shippingDetails.address.country === 'DE' || shippingDetails.address.country === 'NL') {
      return 'shr_1RCqQdRqXimb7Jbc2YmbW7j0'
    }

    return 'shr_1RCqQ2RqXimb7JbclBfYfidT'

    // US 0
    // Canada & Mexico 95
    // China, Japan, Singapore & South Korea 395
    // Australia, Denmark, Switzerland & Sweden 295
    // UK, Germany & Netherlands 145
    // Rest of the world 295
  }

  try {
    const data = await event.json()
    const { checkout_session_id, shipping_details, checkout_type } = data
    const stripe = new Stripe(STRIPE_KEY)
    const shippingRate = calculateShippingOptions(shipping_details, checkout_type)
    const updatedCheckout = await stripe.checkout.sessions.update(checkout_session_id, {
      collected_information: { shipping_details },
      shipping_options: [
        {
          shipping_rate: shippingRate
        }
      ]
    })

    return new Response(JSON.stringify(updatedCheckout))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
