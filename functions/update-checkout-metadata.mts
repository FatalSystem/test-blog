import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
  const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

  try {
    const { sessionId, distinctId } = await event.json()
    const stripe = new Stripe(STRIPE_KEY)

    // Update the checkout session metadata
    const updatedSession = await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        distinct_id: distinctId
      }
    })

    console.log('updatedSession', updatedSession)

    return new Response(JSON.stringify({ success: true }))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}