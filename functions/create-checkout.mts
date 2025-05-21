import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
  // if (event.method !== 'POST') {
  //   return new Response('Method Not Allowed', { status: 405 })
  // }

  const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

  try {
    const data = await event.json()
    const { distinctId } = data
    const stripe = new Stripe(STRIPE_KEY)
    const checkout = await stripe.checkout.sessions.create({
      success_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      adaptive_pricing: {
        enabled: false
      },
      line_items: [
        {
          price: 'price_1R5s5xRqXimb7Jbc5PM01Oqf',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: false
      },
      consent_collection: {
        terms_of_service: 'required'
      },
      custom_fields: [
        {
          key: 'sport',
          label: {
            type: 'custom',
            custom: 'What sport are you buying the Partner for?'
          },
          type: 'dropdown',
          dropdown: {
            options: [
              {
                label: 'Tennis',
                value: 'tennis'
              },
              {
                label: 'Padel',
                value: 'padel'
              },
              {
                label: 'Pickleball',
                value: 'pickleball'
              }
            ]
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      metadata: {
        distinct_id: distinctId,
        ...(data.utmParams?.campaign && { utm_campaign: data.utmParams.campaign }),
        ...(data.utmParams?.content && { utm_content: data.utmParams.content }),
        ...(data.utmParams?.id && { utm_id: data.utmParams.id }),
        ...(data.utmParams?.medium && { utm_medium: data.utmParams.medium }),
        ...(data.utmParams?.source && { utm_source: data.utmParams.source }),
        ...(data.utmParams?.term && { utm_term: data.utmParams.term })
      },
      mode: 'payment'
    })

    // return new Response(JSON.stringify(payload))
    return new Response(JSON.stringify(checkout))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
