import { Box, Container, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { exportableLoader } from '../../image-loader'
import Marc from '../../../public/assets/Mark.svg'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

interface BrandName {
  title: string
  from: 'navbar' | 'brand'
  diractionColumn?: boolean
}
export const SelectedBrand = ({ title, from, diractionColumn }: BrandName) => {
  const { query } = useRouter()
  const { t } = useTranslation('common')
  return (
    <Box
      mr={4}
      alignItems={diractionColumn ? 'start' : 'center'}
      display='flex'
      flexDirection={diractionColumn ? 'column' : 'row'}
      flexWrap='wrap'
      gap={1}
    >
      <Text variant='selectedBrand'>
        {from === 'brand' ? t('selected_brand') : t('selected_phone')}
      </Text>
      <Container variant='selectedBrandItem' w={'auto'}>
        <Container width={'auto'} p={0}>
          <Text wordBreak={'break-word'} fontSize={12} fontWeight={400}>{title}</Text>
        </Container>
        <Container w={'auto'} p={0}>
          <Text cursor='pointer'>
            <Link href={`/${query.locale}/brands`} passHref>
              <Container variant='selectedBrandIcon'>
                <Image
                  unoptimized
                  loader={exportableLoader}
                  height={10}
                  width={10}
                  alt=''
                  src={Marc}
                />
              </Container>
            </Link>
          </Text>
        </Container>
      </Container>
    </Box>
  )
}
