import { Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const PhonesNavigation = ({ from, onBrandClick }: { from: string, onBrandClick?: () => void }) => {
  const { t } = useTranslation('common')

  return (
    <Container variant='phonesNav'>
      <Heading as='h1' variant='phonesNav'>
        {from !== 'brand' ? t('selectModel') : t('selectPhone')}
      </Heading>
      <Container variant='phonesNavigation'>
        <Text
          onClick={onBrandClick}
          cursor={onBrandClick && 'pointer'}
          variant='phonesNav'
          borderColor={from === 'brand' ? 'bot.bg' : 'gray.500'}
          color={from === 'brand' ? 'black' : 'gray.500'}
        >
          {t('phoneBrand')}
        </Text>
        <Text
          variant='phonesNav'
          borderColor={from === 'brand' ? 'gray.500' : 'bot.bg'}
          color={from === 'brand' ? 'gray.500' : 'black'}
        >
          {t('PhoneModel')}
        </Text>
      </Container>
    </Container>
  )
}
