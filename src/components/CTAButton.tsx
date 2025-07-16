import React from 'react'
import { trackCtaClicked, derivePageMetadata } from '@utils'

interface CTAButtonProps {
  href: string
  ctaText: string
  ctaType: string
  className?: string
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, ctaText, ctaType, className }) => {
  const defaultClasses = 'tablet:w-64 w-full 2xl:w-80 text-lg 2xl:text-2xl 2xl:py-3 font-thin rounded-full py-2 font-avenir uppercase border-2 transition duration-300 text-center text-t-green bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black'
  const combinedClasses = className ? `${defaultClasses} ${className}`.trim() : defaultClasses

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('clicked', ctaText)

    const pageProperties = {
      page_type: derivePageMetadata(window.location.pathname).page_type,
      page_slug: derivePageMetadata(window.location.pathname).page_slug,
      page_name: derivePageMetadata(window.location.pathname).page_name,
      $current_url: window.location.href,
      current_domain: window.location.hostname,
      current_url_path: window.location.pathname,
      current_url_protocol: window.location.protocol.replace(':', ''),
      current_url_search: window.location.search || undefined
    }

    if (window?.mixpanel && typeof window.mixpanel.track === 'function') {
      trackCtaClicked({
        ...pageProperties,
        cta_text: ctaText,
        cta_type: ctaType
      })
      window.location.href = href
    } else {
      console.error('Mixpanel not ready. Tracking failed for:', ctaText)
      window.location.href = href
    }
  }

  return (
    <button className={combinedClasses} onClick={handleClick}>
      {ctaText}
    </button>
  )
}

export default CTAButton
