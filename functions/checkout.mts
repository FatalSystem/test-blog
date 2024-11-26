import type { Context } from '@netlify/functions'
const Stripe = require('stripe')

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

    return new Response(JSON.stringify(checkout))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
