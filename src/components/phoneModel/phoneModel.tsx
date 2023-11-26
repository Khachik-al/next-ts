import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { PhoneModelInterface } from '../../content/phoneModel.interface'

export const PhoneModel = ({
  imgSrc,
  modelName,
  customerID,
}: PhoneModelInterface) => {
  const { asPath, query } = useRouter()

  return (
    <Link href={`${asPath}${query.locale === 'es' ? customerID.slice(0, -1) : customerID}/`} passHref>
      <Box w={[130, 150, 200]} cursor='pointer'>
        <Flex justify='center' align='center' h={[170, 170, 210]} mb={1}>
          <img
            alt='model'
            src={imgSrc}
            style={{
              maxHeight: '100%',
            }}
          />
        </Flex>
        <Text variant='phoneModel'>{modelName}</Text>
      </Box>
    </Link>
  )
}
