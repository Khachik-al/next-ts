import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ConfCtx } from '../../context/conf'
import { exportableLoader } from '../../image-loader'
import Arrow from '/public/assets/arrow_straigthtalk.svg'

export const SignForm = () => {
  const { retailer } = useContext(ConfCtx)
  const {
    query: { locale },
  } = useRouter()
  const { t } = useTranslation('footer')
  return (
    <>
      {(locale === 'en' || retailer === 'straigthtalk') && (
        <Box>
          <Heading
            as='h3'
            fontWeight={'semibold'}
            fontSize={[20, 20, 20, 24]}
            variant='footerTitle'
          >
            SIGN UP
          </Heading>
          <Text>
            {retailer === 'straigthtalk'
              ? 'and get promotional emails'
              : 'to receive 15% OFF your first device*'}
          </Text>
          {retailer === 'straigthtalk' ? (
            <>
              <Flex my='21'>
                <Input
                  backgroundColor={'black.400'}
                  borderRadius={'0'}
                  borderTop={'0'}
                  borderLeft='0'
                  placeholder='Email'
                  _focusVisible={{
                    border: 0,
                    boxShadow: 0,
                  }}
                  _focus={{
                    border: 0,
                    boxShadow: 0,
                  }}
                ></Input>
                <Button
                  backgroundColor={'text.footer'}
                  borderRadius={'0'}
                  p={0}
                  _focus={{
                    boxShadow: 0,
                  }}
                  _focusVisible={{
                    border: 0,
                    boxShadow: 0,
                    borderRadius: 0,
                  }}
                >
                  <Image
                    unoptimized
                    loader={exportableLoader}
                    alt='arrow'
                    src={Arrow}
                  />
                </Button>
              </Flex>
              <Text
                mb={12}
                w={['auto', 'auto', 'auto', 'sm']}
                fontSize={'11'}
                filter={'opacity(0.5)'}
              >
                {t(`agree.${retailer}`)}
              </Text>
            </>
          ) : (
            <>
              <Flex my='21'>
                <Input
                  py={6}
                  color={'black'}
                  backgroundColor={'text.footer'}
                  placeholder='Email address (required)'
                  mr={5}
                />
                <Button
                  w={44}
                  p={6}
                  background={'none'}
                  fontSize='sm'
                  border='1px solid'
                >
                  ENTER
                </Button>
              </Flex>
              <Text mb={4} fontSize={'11'}>
                *Exclusions apply. Plan Purchase required. Max discount $100.
              </Text>
              <Text mb={12} w={['auto', 'auto', 'auto', 'md']} fontSize={'11'}>
                {t(`agree.${retailer}`)}
              </Text>
            </>
          )}
        </Box>
      )}
    </>
  )
}
