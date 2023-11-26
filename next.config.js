const withPreact = require('next-plugin-preact')

const content = {
  imageUrlBase: 'https://s3.amazonaws.com/tpassets.devicebits.com',
  searchBase: 'https://academy-api.devicebits.com/v1/search',
  searchTypeaheadBase:
    'https://academy-api.devicebits.com/v1/search-type-ahead',
  swimlane: 'https://suggest-cf.devicebits.com',
  contentBase: 'https://api.devicebits.com',
  productInfoBase: 'https://trial-services-api-main.devicebits.com',
  popularFaqsBase: 'https://search-api.devicebits.com',
}

/** @type {import('next').NextConfig} */
module.exports = withPreact({
  reactStrictMode: true,
  env: {
    ...content,
    customer: process.env.CUSTOMER,
    analytics: 'https://datacapture.tracapis.com/analytics',
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  images: {
    loader: 'custom',
  },
  trailingSlash: true,
  experimental: {
    largePageDataBytes: 500000,
  },
})
