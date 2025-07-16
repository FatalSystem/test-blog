import Stripe from 'stripe'
import type { Handler } from '@netlify/functions'

const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

export const handler: Handler = async (event) => {
  try {
    const stripe = new Stripe(STRIPE_KEY)

    const { sessionId } = JSON.parse(event.body || '{}')

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId' })
      }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent']
    })

    const customerDetails = session.customer_details
    const paymentIntentId = session.payment_intent
      ? (session.payment_intent as Stripe.PaymentIntent).id
      : null

    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
    const paymentIntent = paymentIntentId
      ? await stripe.paymentIntents.retrieve(paymentIntentId)
      : null

    // console.log("customerDetails: ", customerDetails, paymentIntentId, lineItems)
    const products = lineItems.data.map(item => ({
      productName: item.description,
      quantity: item.quantity,
      amountTotal: item.amount_total ? item.amount_total / 100 : 0,
      currency: item.currency
    }))
    return {
      statusCode: 200,
      body: JSON.stringify({
        customerEmail: customerDetails?.email || null,
        customerPhone: customerDetails?.phone || null,
        customerName: customerDetails?.name || null,
        paymentIntentId,
        currency: paymentIntent?.currency || null,
        value: paymentIntent?.amount ? paymentIntent?.amount / 100 : 0,

        paymentStatus: session.payment_status,
        products
        // paymentIntent
      })
    }
  } catch (error: any) {
    console.error('Stripe error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
