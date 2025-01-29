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
      track_pageview: true,
      persistence: 'localStorage',
      ignore_dnt: true,
      record_sessions_percent: 50,
      record_min_ms: 10000,
      record_mask_text_selector: ''
    })
  }
}

// Utility functions for tracking
export const track = (eventName: string, properties?: Record<string, any>): void => {
  if (window?.mixpanel) {
    window.mixpanel.track(eventName, properties)
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
    if (properties) {
      window.mixpanel.people.set(properties)
    }
  }
}
