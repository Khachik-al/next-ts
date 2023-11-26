import { Box, Center, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import type { NextPage } from 'next'
import { Header } from '../../src/components/header/header'
import { Footer } from '../../src/components/footer/footer'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../src/lib/getStatic.js'

const Page404: NextPage = () => {
  const { t } = useTranslation('common')
  return (
    <Box>
      <Header />
      <Center pt={[52, 52, 52, 52, 52, 72]} pb={72} px={17}>
        <VStack w={555} align='start'>
          <Text
            fontSize={144}
            fontWeight='extrabold'
            lineHeight={1}
            color='bot.bg'
          >
            404
          </Text>
          <Text fontSize={32} fontWeight={700} lineHeight={1}>
            {t('404PageError')}
          </Text>
        </VStack>
      </Center>
      <Footer />
    </Box>
  )
}

const getStaticProps = makeStaticProps(['header', 'footer', 'common'])

export { getStaticPaths, getStaticProps }

export default Page404
