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

  const RC_SECRET_KEY = Netlify.env.get('RC_SECRET_KEY')

  try {
    const data = await event.json()
    const { email, rcToken } = data
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RC_SECRET_KEY}&response=${rcToken}`)
    const recaptchaData = await recaptchaResponse.json()
    console.log(recaptchaData)
    if (recaptchaData.success === false || recaptchaData.score < 0.5) {
      return new Response('Invalid reCAPTCHA', { status: 400 })
    }
    const response = await MCClient.lists.setListMember('b9aa6b4480', email, {
      email_address: email,
      skip_merge_validation: true,
      status_if_new: 'subscribed',
      status: 'subscribed'
    })
    return new Response(JSON.stringify(response))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
