import type { Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (event: Request, context: Context): Promise<Response> => {
  // if (event.method !== 'POST') {
  //   return new Response('Method Not Allowed', { status: 405 })
  // }

  const STRIPE_KEY = Netlify.env.get('STRIPE_KEY')

  try {
    const data = await event.json()
    const { distinctId, checkoutType } = data

    const handleSubscriptionPrice = (): string => {
      if (checkoutType === 'annual') {
        return 'price_1QMe5qRqXimb7Jbc6bgvxtbM'
      }
      return 'price_1QMdkfRqXimb7JbcX2Z1BALj'
    }

    const defaultCheckoutOptions = {
      ui_mode: 'embedded',
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true
      },
      consent_collection: {
        terms_of_service: 'required'
      },
      adaptive_pricing: {
        enabled: false
      },
      metadata: {
        // distinct_id: distinctId,
        // ...(data.utmParams?.campaign && { utm_campaign: data.utmParams.campaign }),
        // ...(data.utmParams?.content && { utm_content: data.utmParams.content }),
        // ...(data.utmParams?.id && { utm_id: data.utmParams.id }),
        // ...(data.utmParams?.medium && { utm_medium: data.utmParams.medium }),
        ...(data.utmParams?.source && { utm_source: data.utmParams.source })
        // ...(data.utmParams?.term && { utm_term: data.utmParams.term })
      }
    }

    const pickleballPartnerCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1RrC2hRqXimb7JbcA4W7MEtt',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'partner'
        }
      },
      // custom_fields: [
      //   {
      //     key: 'sport',
      //     label: {
      //       type: 'custom',
      //       custom: 'What sport are you buying the Partner for?'
      //     },
      //     type: 'dropdown',
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Tennis',
      //           value: 'tennis'
      //         },
      //         {
      //           label: 'Padel',
      //           value: 'padel'
      //         },
      //         {
      //           label: 'Pickleball',
      //           value: 'pickleball'
      //         }
      //       ]
      //     }
      //   }
      // ],
      mode: 'payment'
    }
 
    const padelPartnerCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1RrCJNRqXimb7Jbc3we97fwE',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'partner'
        }
      },
      // custom_fields: [
      //   {
      //     key: 'sport',
      //     label: {
      //       type: 'custom',
      //       custom: 'What sport are you buying the Partner for?'
      //     },
      //     type: 'dropdown',
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Tennis',
      //           value: 'tennis'
      //         },
      //         {
      //           label: 'Padel',
      //           value: 'padel'
      //         },
      //         {
      //           label: 'Pickleball',
      //           value: 'pickleball'
      //         }
      //       ]
      //     }
      //   }
      // ],
      mode: 'payment'
    }

    const tennisBundleCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1RrCW7RqXimb7JbclH2O0AT4',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'partner'
        }
      },
      // custom_fields: [
      //   {
      //     key: 'sport',
      //     label: {
      //       type: 'custom',
      //       custom: 'What sport are you buying the Partner for?'
      //     },
      //     type: 'dropdown',
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Tennis',
      //           value: 'tennis'
      //         },
      //         {
      //           label: 'Padel',
      //           value: 'padel'
      //         },
      //         {
      //           label: 'Pickleball',
      //           value: 'pickleball'
      //         }
      //       ]
      //     }
      //   }
      // ],
      mode: 'payment'
    }

    const tennisPartnerCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1ROQUsRqXimb7Jbcyk6fbOHp',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'partner'
        }
      },
      // custom_fields: [
      //   {
      //     key: 'sport',
      //     label: {
      //       type: 'custom',
      //       custom: 'What sport are you buying the Partner for?'
      //     },
      //     type: 'dropdown',
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Tennis',
      //           value: 'tennis'
      //         },
      //         {
      //           label: 'Padel',
      //           value: 'padel'
      //         },
      //         {
      //           label: 'Pickleball',
      //           value: 'pickleball'
      //         }
      //       ]
      //     }
      //   }
      // ],
      mode: 'payment'
    }

    const picklebotReservationCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1RrChtRqXimb7JbcJYKhAwax',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'rover'
        }
      },
      // custom_fields: [
      //   {
      //     key: 'sport',
      //     label: {
      //       type: 'custom',
      //       custom: 'What sport are you buying the Partner for?'
      //     },
      //     type: 'dropdown',
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Tennis',
      //           value: 'tennis'
      //         },
      //         {
      //           label: 'Padel',
      //           value: 'padel'
      //         },
      //         {
      //           label: 'Pickleball',
      //           value: 'pickleball'
      //         }
      //       ]
      //     }
      //   }
      // ],
      mode: 'payment'
    }

    const padelbotReservationCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1RrCmhRqXimb7Jbc4XVsWswM',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'rover'
        }
      },
      // custom_fields: [
      //   {
      //     key: 'sport',
      //     label: {
      //       type: 'custom',
      //       custom: 'What sport are you buying the Partner for?'
      //     },
      //     type: 'dropdown',
      //     dropdown: {
      //       options: [
      //         {
      //           label: 'Tennis',
      //           value: 'tennis'
      //         },
      //         {
      //           label: 'Padel',
      //           value: 'padel'
      //         },
      //         {
      //           label: 'Pickleball',
      //           value: 'pickleball'
      //         }
      //       ]
      //     }
      //   }
      // ],
      mode: 'payment'
    }

    const oneTimeCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}&type=rover',
      permissions: {
        update_shipping_details: 'server_only'
      },
      line_items: [
        {
          price: 'price_1RrD6SRqXimb7JbcyH8T5c1d',
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 100
          }
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1QHg8RRqXimb7JbcyiCOmKix'
        }
      ],
      payment_intent_data: {
        metadata: {
          product: 'rover'
        }
      },
      mode: 'payment',
      custom_text: {
        terms_of_service_acceptance: {
          message: 'I agree to receive communications by text message regarding tech support and/or answers to sales inquiries from Tennibot. You may opt out by replying STOP or ask for more information by replying HELP. Message frequency varies. Message and data rates may apply. You may review our [Terms of Service](https://www.tennibot.com/terms) and [Privacy Policy](https://www.tennibot.com/privacy) to learn how your data is used.'
        }
      }
    }

    const subscriptionCheckoutOptions: Stripe.Checkout.SessionCreateParams = {
      ...defaultCheckoutOptions,
      return_url: 'https://www.tennibot.com/thank-you?session={CHECKOUT_SESSION_ID}&type=rover',
      line_items: [
        {
          price: handleSubscriptionPrice(),
          quantity: 1
        },
        {
          // Shipping
          price: 'price_1QMduBRqXimb7Jbc21qWEBGC',
          quantity: 1
        }
      ],
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      subscription_data: {
        metadata: {
          product: 'rover'
        }
      },
      mode: 'subscription',
      custom_text: {
        terms_of_service_acceptance: {
          message: 'I agree to receive communications by text message regarding tech support and/or answers to sales inquiries from Tennibot. You may opt out by replying STOP or ask for more information by replying HELP. Message frequency varies. Message and data rates may apply. You may review our [Terms of Service](https://www.tennibot.com/terms) and [Privacy Policy](https://www.tennibot.com/privacy) to learn how your data is used.'
        }
      }
    }

    const handleCheckoutOptions = (): Stripe.Checkout.SessionCreateParams => {
      if (checkoutType === 'tennispartner') {
        return tennisPartnerCheckoutOptions
      }
      if (checkoutType === 'pickleballpartner') {
        return pickleballPartnerCheckoutOptions
      }
      if (checkoutType === 'padelpartner') {
        return padelPartnerCheckoutOptions
      }
      if (checkoutType === 'tennisbundle') {
        return tennisBundleCheckoutOptions
      }
      if (checkoutType === 'picklebotreservation') {
        return picklebotReservationCheckoutOptions
      }
      if (checkoutType === 'padelbotreservation') {
        return padelbotReservationCheckoutOptions
      }
      if (checkoutType === 'onetime') {
        return oneTimeCheckoutOptions
      }
      return subscriptionCheckoutOptions
    }

    const stripe = new Stripe(STRIPE_KEY)
    const checkout = await stripe.checkout.sessions.create(handleCheckoutOptions())

    // console.log('create checkout', checkout)
    return new Response(JSON.stringify(checkout))
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
