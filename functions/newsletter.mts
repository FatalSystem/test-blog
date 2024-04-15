import type { Context } from '@netlify/functions'
import MCClient from '@mailchimp/mailchimp_marketing'

export default async (event: Request, context: Context): Promise<Response> => {
  if (event.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  MCClient.setConfig({
    apiKey: Netlify.env.get('MC_API_KEY'),
    server: 'us8'
  })

  // TODO: RECAPTCHA
  try {
    const data = await event.json()
    const email = data.email
    const response = await MCClient.lists.setListMember('b9aa6b4480', email, {
      email_address: email,
      skip_merge_validation: true,
      status_if_new: 'subscribed'
    })
    return new Response(JSON.stringify(response))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
