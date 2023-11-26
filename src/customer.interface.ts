export const supportedCustomers = [
  'tbv',
  'wfm',
  'gosmart',
  'net10',
  'pageplus',
  'simplemobile',
  'straigthtalk',
  'tracfone',
  'safelink',
] as const

export type Customer = typeof supportedCustomers[number]

export type CustomerConfig = {
  loginLink: string
  headerFooterUrl: string
  headerExternalLinkBase: string
  contentCustomerId: string
  gtmId: string
  retailer: Customer
  specialHeaderAndFooter?: boolean
  commonTopicsProductId: string
  phoneSupport: string
}

export const isCustomer = (a: any): a is Customer =>
  supportedCustomers.includes(a)
