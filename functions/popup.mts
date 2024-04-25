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
    const { email, fname, lname, phone, rcToken } = data
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RC_SECRET_KEY}&response=${rcToken}`)
    const recaptchaData = await recaptchaResponse.json()
    if (recaptchaData.success === false || recaptchaData.score < 0.5) {
      return new Response('Invalid reCAPTCHA', { status: 400 })
    }

    // Avoid overwritting data TODO: improve with TS
    let mergeFields
    if (fname !== '') mergeFields = { ...mergeFields, FNAME: fname }
    if (lname !== '') mergeFields = { ...mergeFields, LNAME: lname }
    if (phone !== '') mergeFields = { ...mergeFields, PHONE: phone }

    const response = await MCClient.lists.setListMember('6001255d5c', email, {
      email_address: email,
      skip_merge_validation: true,
      status_if_new: 'subscribed',
      status: 'subscribed',
      merge_fields: mergeFields
    })
    return new Response(JSON.stringify(response))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
