import type { Context } from '@netlify/functions'

export default async (event: Request, context: Context): Promise<Response> => {
  if (event.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const body = await event.json()

  const { clientId, transactionId, value, currency } = body

  const response = await fetch('https://www.google-analytics.com/mp/collect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId, // Must provide a client ID
      events: [
        {
          name: 'purchase',
          params: {
            transaction_id: 'cs_live_b1M6Ml6Um3grVC2SaOiv8aYCGMQq7wLy5DowZDtODrboeLuyhD5fI90N1H',
            value: 499.00,
            currency: 'USD'
          }
        }
      ]
    })
  })

  if (!response.ok) {
    return new Response('Failed to send event', { status: response.status })
  }

  return new Response('Event sent successfully', { status: 200 })
}
