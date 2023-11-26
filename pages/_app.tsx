import type { AppProps } from 'next/app'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAnalyticsPathParam } from '../utils/hooks/useAnalyticsPathParam'
import { usePreviousRoute } from '../utils/hooks/usePreviousRoute'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../src/styles/theme'
import { appWithTranslation } from 'next-i18next'
import { postAnalytics } from '../src/analytics'
import '../src/styles/index.css'

import { ConfCtx, withConf } from '../src/context/conf'
import { isCustomer } from '../src/customer.interface'

declare global {
  interface Window {
    botpressWebChat: any
  }
}

const cust = process.env.customer
if (!isCustomer(cust)) { throw new Error('unsupported customer') }

const App = ({ Component, pageProps }: AppProps) => {
  const { query } = useRouter()
  const referrer = usePreviousRoute()
  const pagePath = useAnalyticsPathParam()
  const confSt = useContext(ConfCtx)

  useEffect(() => {
    postAnalytics({
      data: {
        referrer_url: referrer ? `${location.origin}${referrer}` : null,
        page_title: pagePath,
        event_category: 'pageviews',
      },
      category: 'pageviews',
    })
  }, [query])

  return (
    <ChakraProvider theme={theme(confSt.retailer)}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default withConf(appWithTranslation(App))
