import mixpanel from 'mixpanel-browser'

export const useMixpanel = (): { initialize: () => void, trackEvent: (event: string, data: any) => void } => {
  const initialize = (): void => {
    mixpanel.init('16d06bcdf9b0f6e260ccb622aa0cc19a', {
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
