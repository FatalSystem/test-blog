import type { Context } from '@netlify/functions'

export default async (event: Request, context: Context): Promise<Response> => {
  if (event.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const RC_SECRET_KEY = Netlify.env.get('RC_SECRET_KEY')
  const KY_API_KEY = Netlify.env.get('KY_API_KEY')

  try {
    const data = await event.json()
    const { email, fname, lname, call, from, rcToken, listId, phone, sport } = data
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RC_SECRET_KEY}&response=${rcToken}`)
    const recaptchaData = await recaptchaResponse.json()
    if (recaptchaData.success === false || recaptchaData.score < 0.2) {
      return new Response('Invalid reCAPTCHA', { status: 400 })
    }

    // Avoid overwritting data TODO: improve with TS
    let mergeFields
    if (fname !== '' && fname) mergeFields = { ...mergeFields, first_name: fname }
    if (lname !== '' && lname) mergeFields = { ...mergeFields, last_name: lname }
    if (phone !== '' && phone) mergeFields = { ...mergeFields, phone_number: phone }
    if (sport !== '' && sport) mergeFields = { ...mergeFields, sport }
    if (call) mergeFields = { ...mergeFields, call: 'Yes' }

    const response = await fetch(`https://a.klaviyo.com/api/v2/list/${listId}/subscribe?api_key=${KY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profiles: [
            { ...mergeFields, email, source: from }
          ]
        })
      }
    )

    return new Response(JSON.stringify(response))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
