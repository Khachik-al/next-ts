import { Container, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BrandItemInterface } from '../../content/brandItem.interface'
import Link from 'next/link'
import useMemoizeQueryParams from '../../../utils/hooks/useMemoizeQueryParams'

export const BrandItem = ({ imageSrc, text }: BrandItemInterface) => {
  const [path, params] = useMemoizeQueryParams()
  const isMobile = (typeof window !== 'undefined') && (document.documentElement.clientWidth < 992)

  const createPath = () => {
    if (params) {
      return `${path}${text}${params}`
    } else {
      return `${path}${text}`
    }
  }
  return (

    <Link href={createPath()} passHref>
      <Container variant='brand'>
        <Image
          width={[8, 12]}
          height={[8, 12]}
          alt='logo'
          src={imageSrc}
        />
        <Text variant='brand'>{(text === 'KonnectONE' && isMobile) ? 'Konnect ONE' : text}</Text>
      </Container>
    </Link>

  )
}
