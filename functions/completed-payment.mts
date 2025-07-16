import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
    const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

    try {
        const stripe = new Stripe(STRIPE_KEY)
        if (event.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 })
        }

        const { sessionId } = await event.json()

        if (!sessionId) {
            return new Response(JSON.stringify({ error: 'Missing sessionId' }), { status: 400 })
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



        const products = lineItems.data.map(item => ({
            productName: item.description,
            quantity: item.quantity,
            amountTotal: item.amount_total ? item.amount_total / 100 : 0,
            currency: item.currency,
            product_type: paymentIntent?.metadata?.product || "n/a"
        }))

        const responseData = {
            customerEmail: customerDetails?.email || null,
            customerPhone: customerDetails?.phone || null,
            customerName: customerDetails?.name || null,
            paymentIntentId,
            currency: paymentIntent?.currency || null,
            value: paymentIntent?.amount ? paymentIntent?.amount / 100 : 0,
            paymentStatus: session.payment_status,
            products
        }

        return new Response(JSON.stringify(responseData), {
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error: any) {
        console.error('Stripe error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
