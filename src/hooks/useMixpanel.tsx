import mixpanel from 'mixpanel-browser'

export const useMixpanel = (): { initialize: () => void, trackEvent: (event: string, data: any) => void } => {
  const initialize = (): void => {
    mixpanel.init('16d06bcdf9b0f6e260ccb622aa0cc19a', {
      api_host: 'https://mixpanel-tracking-proxy-625719360183.us-central1.run.app/',
      debug: true,
      track_pageview: true,
      persistence: 'localStorage'
    })
  }

  const trackEvent = (event: string, data: any): void => {
    mixpanel.track(event, data)
  }

  return {
    initialize,
    trackEvent
  }
}
