import type { Context } from '@netlify/functions'

export default async (event: Request, context: Context): Promise<Response> => {
  // Disabled for now
  if (event.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const RC_SECRET_KEY = Netlify.env.get('RC_SECRET_KEY')
  const KY_API_KEY = Netlify.env.get('KY_API_KEY')

  try {
    const data = await event.json()
    const { email, fname, lname, call, from, rcToken } = data
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RC_SECRET_KEY}&response=${rcToken}`)
    const recaptchaData = await recaptchaResponse.json()
    if (recaptchaData.success === false || recaptchaData.score < 0.5) {
      return new Response('Invalid reCAPTCHA', { status: 400 })
    }

    const response = await fetch(`https://a.klaviyo.com/api/v2/list/SNVcfB/subscribe?api_key=${KY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profiles: [
            { email, source: from, call: call ? 'Yes' : 'No', first_name: fname, last_name: lname }
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
