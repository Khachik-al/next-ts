import { useTheme } from '@chakra-ui/react'
import Head from 'next/head'
import React, { FC, useContext } from 'react'
import { retailersInfo } from '../../../src/content/retailersInfo'
import { ConfCtx } from '../../../src/context/conf'
import { themes as theme } from '../../styles/themes'

interface Props {
  keywords?: string
  description?: string
  title?: string
  structuredData?: string
}

export const PageMeta: FC<Props> = ({
  keywords = '',
  description = '',
  title = '',
  structuredData,
}) => {
  const { retailer } = useContext(ConfCtx)
  const themes: any = { ...theme(retailer), ...useTheme() }
  return (
    <>
      <Head>
        <title>
          {title ??
            retailersInfo.find((item) => item.retailer === retailer)?.title}
        </title>
        <meta name='keywords' content={keywords} />
        <meta
          name='description'
          content={
            description ??
            `Welcome to ${
              retailersInfo.find((item) => item.retailer === retailer)?.title
            }`
          }
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <link rel='icon' href={`/assets/${themes.favicon}`}/>
        {structuredData && <script type='application/ld+json'>{structuredData}</script>}
      </Head>
    </>
  )
}

