import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { customersObj } from '../customer-config'
import i18nextConfig from '../next-i18next.config.js'


export default class MyDocument extends Document {
  render() {
    const { gtmId } = customersObj[process.env.CUSTOMER]
    const currentLocale: any =
      this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale === 'en' ? 'en-US' : 'es-US'}>
        <Head />
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <Script
            src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
            strategy='beforeInteractive'
          />
          <Script
            id='tagManagerId'
            strategy='afterInteractive'
          >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`}</Script>
          <Script
            strategy='beforeInteractive'
            src='https://website-production-bot-assets.s3.amazonaws.com/script.js'
          />
        </body>
      </Html>
    )
  }
}
