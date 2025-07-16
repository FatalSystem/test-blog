export const listIds = {
  padel: 'YjdHS9',
  pickleball: 'SMCNHb',
  partner: 'Y98cPV',
  partnerNewsletter: 'WuJSx3'
}

export enum Pages {
  HOME = '/',
  TENNIS = '/tennis',
  PICKLEBALL = '/pickleball',
  PADEL = '/padel',
  PARTNER = '/partner',
  ABOUT = '/about-us',
  BUY = '/buy',
  NOT_FOUND = '/404',
  CAREERS = '/careers',
  CLUBS = '/clubs-and-coaches',
  ROVER = '/rover',
  STATION = '/station',
  FAQ = '/faq',
  TERMS = '/terms',
  PRIVACY = '/privacy',
  RESERVE = '/reserve',
  PARTNER_FAQ = '/partner-faq',
  INVEST = '/invest'
}

export const pageMap: Record<string, { page_type: string, page_slug: string, page_name: string }
> = {
  '/404': { page_type: '404_page', page_slug: '404', page_name: '404' },
  '/about-us': { page_type: 'company_information', page_slug: 'about_us', page_name: 'about us' },
  '/careers': { page_type: 'company_information', page_slug: 'careers', page_name: 'careers' },
  '/invest': { page_type: 'company_information', page_slug: 'invest', page_name: 'invest' },
  '/privacy': { page_type: 'company_information', page_slug: 'privacy', page_name: 'privacy' },
  '/terms': { page_type: 'company_information', page_slug: 'terms', page_name: 'terms' },
  '/buy': { page_type: 'product_purchase_checkout', page_slug: 'buy', page_name: 'buy' },
  '/checkout': { page_type: 'product_purchase_checkout', page_slug: 'checkout', page_name: 'checkout' },
  '/buy-partner': { page_type: 'product_purchase_checkout', page_slug: 'buy_partner', page_name: 'buy partner' },
  '/thank-you': { page_type: 'confirmation_page', page_slug: 'thank_you', page_name: 'thank you' },
  '/clubs-and-coaches': { page_type: 'partner_coach_information', page_slug: 'clubs_and_coaches', page_name: 'clubs and coaches' },
  '/partner': { page_type: 'partner_coach_information', page_slug: 'partner', page_name: 'partner' },
  '/partner-faq': { page_type: 'partner_coach_information', page_slug: 'partner_faq', page_name: 'partner faq' },
  '/partner-newsletter': { page_type: 'partner_coach_information', page_slug: 'partner_newsletter', page_name: 'partner newsletter' },
  '/faq': { page_type: 'faq_support', page_slug: 'faq', page_name: 'faq' },
  '/job': { page_type: 'career_opportunities', page_slug: 'job', page_name: 'job' },
  '/compare': { page_type: 'product_comparison', page_slug: 'compare', page_name: 'compare' },
  '/tennibot-vs-acemate': { page_type: 'product_comparison', page_slug: 'tennibot_vs_acemate', page_name: 'tennibot vs acemate' },
  '/tennibot-vs-hydrogen': { page_type: 'product_comparison', page_slug: 'tennibot_vs_hydrogen', page_name: 'tennibot vs hydrogen' },
  '/tennibot-vs-playmate': { page_type: 'product_comparison', page_slug: 'tennibot_vs_playmate', page_name: 'tennibot vs playmate' },
  '/tennibot-vs-spinshot': { page_type: 'product_comparison', page_slug: 'tennibot_vs_spinshot', page_name: 'tennibot vs spinshot' },
  '/tennibot-vs-tenniix': { page_type: 'product_comparison', page_slug: 'tennibot_vs_tenniix', page_name: 'tennibot vs tenniix' },
  '/tennibot-vs-volley': { page_type: 'product_comparison', page_slug: 'tennibot_vs_volley', page_name: 'tennibot vs volley' },
  '/tennis': { page_type: 'sports_focused', page_slug: 'tennis', page_name: 'tennis' },
  '/padel': { page_type: 'sports_focused', page_slug: 'padel', page_name: 'padel' },
  '/pickleball': { page_type: 'sports_focused', page_slug: 'pickleball', page_name: 'pickleball' },
  '/signup': { page_type: 'account_signup', page_slug: 'signup', page_name: 'signup' },
  '/specs': { page_type: 'product_specifications', page_slug: 'specs', page_name: 'specs' },
  '/rover': { page_type: 'product_specifications', page_slug: 'rover', page_name: 'rover' },
  '/station': { page_type: 'product_specifications', page_slug: 'station', page_name: 'station' },
  '/tracking-test': { page_type: 'tracking_analytics', page_slug: 'tracking_test', page_name: 'tracking test' },
  '/': { page_type: 'homepage', page_slug: 'index', page_name: 'index' }
}
