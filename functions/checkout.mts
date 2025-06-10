import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
  // if (event.method !== 'POST') {
  //   return new Response('Method Not Allowed', { status: 405 })
  // }

  const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

  try {
    const data = await event.json()
    const stripe = new Stripe(STRIPE_KEY)
    const checkout = await stripe.checkout.sessions.retrieve(data.session, {
      apiKey: STRIPE_KEY
    })
    console.log('Checkout:', checkout)

    const value = (parseInt((checkout?.amount_total ?? 219500).toFixed(2)) / 100) ?? 2195.00
    const currency = checkout?.currency?.toUpperCase() ?? 'USD'
    const quantity = Math.ceil(value / 2995.00) || 1

    const payload = {
      currency,
      value,
      quantity,
      email: checkout.customer_details?.email
    }

    return new Response(JSON.stringify(payload))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
