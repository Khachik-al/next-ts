import { Customer, CustomerConfig } from './src/customer.interface'

export const customersObj: Record<Customer, CustomerConfig> = {
  tbv: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com/tbv',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'totalbyverizon',
    gtmId: 'GTM-N8P7GT',
    retailer: 'tbv',
    specialHeaderAndFooter: true,
    commonTopicsProductId: '25209',
    phoneSupport: '1-866-663-3633',
  },
  wfm: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'wfm',
    gtmId: 'GTM-N8P7GT',
    retailer: 'wfm',
    commonTopicsProductId: '24914',
    phoneSupport: '1-866-663-3633',
  },
  gosmart: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'gosmart',
    gtmId: 'GTM-N8P7GT',
    retailer: 'gosmart',
    commonTopicsProductId: '24947',
    phoneSupport: '1-866-663-3633',
  },
  net10: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'net10wireless',
    gtmId: 'GTM-N8P7GT',
    retailer: 'net10',
    commonTopicsProductId: '24891',
    phoneSupport: '1-866-663-3633',
  },
  pageplus: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'pageplus',
    gtmId: 'GTM-N8P7GT',
    retailer: 'pageplus',
    commonTopicsProductId: '24933',
    phoneSupport: '1-866-663-3633',
  },
  simplemobile: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'simplemobile',
    gtmId: 'GTM-N8P7GT',
    retailer: 'simplemobile',
    commonTopicsProductId: '24865',
    phoneSupport: '1-866-663-3633',
  },
  straigthtalk: {
    loginLink: 'https://www.straighttalk.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com/st',
    headerExternalLinkBase: 'https://www.straighttalk.com',
    contentCustomerId: 'stacademy',
    gtmId: 'GTM-N8P7GT',
    retailer: 'straigthtalk',
    specialHeaderAndFooter: true,
    commonTopicsProductId: '24866',
    phoneSupport: '1-877-430-CELL(2355)',
  },
  tracfone: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com/tracfone',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'tracfone',
    gtmId: 'GTM-N8P7GT',
    retailer: 'tracfone',
    specialHeaderAndFooter: true,
    commonTopicsProductId: '24892',
    phoneSupport: '1-800-867-7183',
  },
  safelink: {
    loginLink: 'https://sitfaem.totalbyverizon.com/#customerlogin',
    headerFooterUrl: 'https://assets-dev-kms-assets.s3.amazonaws.com',
    headerExternalLinkBase: 'https://sitfaem.totalbyverizon.com',
    contentCustomerId: 'safelink',
    gtmId: 'GTM-N8P7GT',
    retailer: 'safelink',
    commonTopicsProductId: '24934',
    phoneSupport: '1-866-663-3633',
  },
} as const
