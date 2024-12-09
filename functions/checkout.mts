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

    const value = (parseInt((checkout?.currency_conversion?.amount_total ?? 49900).toFixed(2) * (checkout?.currency_conversion?.fx_rate ?? 1)) / 100) ?? 499.00
    const currency = checkout?.currency?.toUpperCase() ?? 'USD'
    const quantity = Math.ceil(((parseInt(data?.currency_conversion?.amount_subtotal ?? 49900) / 100).toFixed(2)) / 499.00) || 1

    const payload = {
      currency,
      value,
      quantity
    }

    return new Response(JSON.stringify(payload))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
