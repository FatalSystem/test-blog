import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
  if (event.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

  const measurementId = 'G-5MY88GRQM4'
  const apiSecret = 'Ql6uOfACTT6_99XqZ336Qg'
  const body = await event.json()

  const { clientId, sessionId, transactionId, value, currency } = body

  try {
    const stripe = new Stripe(STRIPE_KEY)
    const checkoutData = await stripe.checkout.sessions.retrieve(sessionId as string, {
      apiKey: STRIPE_KEY
    })

    const amount = (parseInt((checkoutData?.currency_conversion?.amount_total ?? 49900).toFixed(2) * (checkoutData?.currency_conversion?.fx_rate ?? 1)) / 100) ?? 499.00
    const currency = checkoutData?.currency?.toUpperCase() ?? 'USD'
    const quantity = Math.ceil(((parseInt(checkoutData?.currency_conversion?.amount_subtotal ?? 49900) / 100).toFixed(2)) / 499.00) || 1

    const payload = {
      client_id: clientId,
      events: [
        {
          name: 'purchase',
          params: {
            transaction_id: sessionId,
            value: amount,
            currency
          }
        }
      ]
    }

    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.log('failed', response)
      return new Response('Failed to send event', {
        status: response.status
      })
    }
    console.log('success', response)
    return new Response(JSON.stringify({
      amount,
      currency,
      quantity
    }))
  } catch (error) {
    console.error(error)
    return new Response('Unable to send event', { status: 500 })
  }

  // G-5MY88GRQM4
  // Ql6uOfACTT6_99XqZ336Qg
}
