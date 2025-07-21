import { pageMap } from './constants'

declare global {
  interface Window {
    mixpanel: any
  }
}

export const initMixpanel = (): void => {
  if (window?.mixpanel) {
    window.mixpanel.init('16d06bcdf9b0f6e260ccb622aa0cc19a', {
      api_host: 'https://mixpanel-tracking-proxy-625719360183.us-central1.run.app/',
      debug: false,
      track_pageview: false,
      persistence: 'localStorage',
      ignore_dnt: true,
      record_sessions_percent: 50,
      record_min_ms: 8000,
      record_mask_text_selector: ''
    })
    // const MAX_RETRIES = 50 // 10 seconds total (50 * 200ms)
    // let retries = 0
    // const waitForMixpanel = setInterval(() => {
    //   if (typeof window.mixpanel !== 'undefined' && window.mixpanel.get_property) {
    //     window.mixpanel.register({ version: 'Partner A' })
    //     clearInterval(waitForMixpanel)
    //   } else if (retries >= MAX_RETRIES) {
    //     clearInterval(waitForMixpanel)
    //   }
    //   retries++
    // }, 200)

    // Register super properties
    window.mixpanel.register({
      user_channel: 'web',
      device_channel: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop') : 'unknown',
      $user_id: window.mixpanel?.get_distinct_id() || ''
      // version: 'Partner A'
    })
  }
}

// Utility functions for tracking
export const track = (eventName: string, properties?: Record<string, any>): void => {
  if (window?.mixpanel) {
    window?.mixpanel?.track(eventName, properties)
  } else {
    console.warn(`Mixpanel not initialized. Failed to track event: ${eventName}`)
  }
}

export const getDistinctId = (): string => {
  if (window?.mixpanel) {
    return window.mixpanel.get_distinct_id()
  }
  return ''
}

export const identify = (userId: string, properties?: Record<string, any>): void => {
  if (window?.mixpanel) {
    window.mixpanel.identify(userId)
    window.mixpanel.people.set({
      $email: userId,
      ...properties
    })
  } else {
    console.warn(`Mixpanel not initialized. Failed to identify user: ${userId}`)
  }
}

export const derivePageMetadata = (pathname: string) => {
  // Normalize pathname by removing leading/trailing slashes
  const normalizedPathname = pathname.replace(/^\/|\/$/g, '')
  return (
    pageMap[`/${normalizedPathname}`] ?? {
      page_type: 'unknown',
      page_slug: normalizedPathname || 'index',
      page_name: normalizedPathname || 'Unknown Page'
    }
  )
}

// Event tracking functions based on tracking plan
export const trackCtaClicked = (properties: {
  $email?: string
  $user_id?: string
  page_type?: string
  page_slug?: string
  page_name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
  cta_type?: string
  cta_text?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('cta_clicked', properties)
}

export const trackNewsletterSubscribed = (properties: {
  $email: string
  $user_id?: string
  page_name?: string
  name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  identify(properties.$email, {
    email_subscription_date: new Date().toISOString(),
    name: properties.name
  })
  track('newsletter_subscribed', properties)
}

export const trackFeedbackSubmitted = (properties: {
  $email?: string
  $user_id?: string
  hear_about_us?: string
  reason_choosing_us?: string
  page_name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email, {
      reason_choosing_us: properties.reason_choosing_us
    })
  }
  track('feedback_submitted', properties)
}

export const trackLeadFormSubmitted = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  name?: string
  phoneNumber?: string
  facility_name?: string
  zip_code?: string
  about_us?: string
  linkedin?: string
  lead_type?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email, {
      name: properties.name,
      phoneNumber: properties.phoneNumber,
      facility_name: properties.facility_name,
      zip_code: properties.zip_code,
      about_us: properties.about_us,
      linkedin: properties.linkedin,
      lead_type: properties.lead_type
    })
  }
  track('lead_form_submitted', properties)
}

export const trackProductInterestSubmitted = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email, {
      name: properties.name
    })
  }
  track('product_interest_submitted', properties)
}

export const trackQuerySubmitted = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  name?: string
  subscribed?: boolean
  question?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email, {
      name: properties.name,
      subscribed: properties.subscribed,
      question: properties.question
    })
  }
  track('query_submitted', properties)
}

export const trackSignUpStarted = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('Sign_up_started', properties)
}

export const trackSignUpCompleted = (properties: {
  $email: string
  $user_id?: string
  page_name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  identify(properties.$email, {
    registration_date: new Date().toISOString()
  })
  track('sign_up_completed', properties)
}

export const trackLoginCompleted = (properties: {
  $email?: string
  $user_id?: string
  login_method?: string
  page_name?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('login_completed', properties)
}

export const trackPurchaseCompleted = (properties: {
  $email?: string
  $user_id?: string
  discount_code?: string
  gift_card_used?: string
  page_name?: string
  payment_method?: string
  shipping_country?: string
  shipping_method?: string
  cart?: Array<{
    brand?: string
    category?: string
    product_name?: string
    item_id?: number
    price?: number
    quantity?: number
    currency?: string
  }>
  subtotal?: number
  promotion_code_applied?: boolean
  shipping_cost?: string
  total_due?: number
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('purchase_completed', properties)
}

export const trackCheckoutStarted = (properties: {
  $email?: string
  $user_id?: string
  discount_code?: string
  page_name?: string
  cart?: Array<{
    brand?: string
    category?: string
    product_name?: string
    item_id?: number
    price?: number
    quantity?: number
    currency?: string
  }>
  subtotal?: number
  promotion_code_applied?: boolean
  shipping_cost?: string
  total_due?: number
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('checkout_started', properties)
}

export const trackProductViewed = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  cart?: any[]
  page_type?: string
  page_slug?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('product_viewed', properties)
}

export const trackProductAdded = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  cart?: any[]
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('product_added', properties)
}

export const trackProductRemoved = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  cart?: any[]
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('product_removed', properties)
}

export const trackProductsSearched = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  search_category?: string
  search_term?: string
  suggestion_clicked?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('products_searched', properties)
}

export const trackProductListFiltered = (properties: {
  $email?: string
  $user_id?: string
  page_name?: string
  filter_category?: string
  filter_option_selected?: string
  filter_of_results?: number
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  if (properties.$email) {
    identify(properties.$email)
  }
  track('product_list_filtered', properties)
}

export const trackAdData = (properties: {
  campaign_id?: string
  campaign_name?: string
  clicks?: number
  cost?: number
  impressions?: number
  network?: string
  source?: string
  views?: number
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}): void => {
  track('ad_data', properties)
}
