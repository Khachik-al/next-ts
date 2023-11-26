import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { contactData } from '../../content/contactInfo'
import { useTranslation } from 'next-i18next'
import { CallIcon, ChatIcon } from '../../styles/components/customIcons'
import { openCloseChat } from '../../services'
import { ConfCtx } from '../../context/conf'
import { customersObj } from '../../../customer-config'

const getIcons = (type: string, bgColor: string) => {
  switch (type) {
    case 'chat':
      return (
        <ChatIcon color={bgColor === 'white' ? 'footerIcon' : 'contact.icon'} />
      )
    case 'call':
      return (
        <CallIcon color={bgColor === 'white' ? 'footerIcon' : 'contact.icon'} />
      )
    default:
      break
  }
}

type ContactParams = {
  bgColor: string
  paddingRight?: string | (string | number)[]
}

export const Contact = ({ bgColor, paddingRight = '1rem' }: ContactParams) => {
  const [openCall, setOpenCall] = useState(false)
  const { t } = useTranslation('common')
  const { retailer } = useContext(ConfCtx)

  const callSupport = () => {
    setOpenCall(true)
  }

  const handleClick = (type: string): void => {
    switch (type) {
      case 'chat':
        openCloseChat('show')
        break
      case 'call':
        callSupport()
        break
    }
  }

  return (
    <Container
      bg={bgColor}
      variant='contact'
      textColor={bgColor === 'white' ? 'black' : 'contact.text'}
      pr={paddingRight}
    >
      <Heading mb={[1, 16]} fontSize={[20, 24, '3xl']} textAlign='center'>
        {t('contactTitle')}
      </Heading>
      <Container variant='contactItem'>
        {contactData.map((el, i) => (
          <Container key={i} w={320}>
            {getIcons(el.type, bgColor)}
            <Heading as='h3' size='lg' variant='contact'>
              {t(el.title)}
            </Heading>
            <Text fontSize='md'>{t(el.desc)}</Text>
            {el.btnTitle ? (
              <Button
                variant='contact'
                color={bgColor === 'white' ? 'black' : 'contact.text'}
                onClick={() => handleClick(el.type)}
              >
                {t(el.btnTitle)}
              </Button>
            ) : (
              <>
                <Button
                  variant='contact'
                  color={bgColor === 'white' ? 'black' : 'contact.text'}
                  display={!openCall ? 'block' : 'none'}
                  onClick={() => handleClick(el.type)}
                >
                  {t(el.title)}
                </Button>
                <Box mt={2} display={openCall ? 'block' : 'none'}>
                  <Text mt={2} fontSize='md'>
                    Phone Support:
                  </Text>
                  <Text color={bgColor === 'white' ? 'black' : 'contact.text'}>
                    {customersObj[retailer].phoneSupport}
                  </Text>
                </Box>
              </>
            )}
          </Container>
        ))}
      </Container>
      <Flex display={['flex', 'flex', 'none', 'flex', 'none']} justify='center'>
        <Box>
          {contactData.map((el, i) => (
            <Flex key={i} gap={4} align='center'>
              <Box mt={8}>
                <Box w={[8, 12, 16]} h={[8, 12, 16]} pos='relative'>
                  {getIcons(el.type, bgColor)}
                </Box>
              </Box>
              {el.btnTitle ? (
                <Button
                  variant='contact'
                  color={bgColor === 'white' ? 'black' : 'contact.text'}
                  onClick={() => handleClick(el.type)}
                >
                  {t(el.btnTitle)}
                </Button>
              ) : (
                <>
                  <Button
                    variant='contact'
                    display={!openCall ? 'block' : 'none'}
                    onClick={() => handleClick(el.type)}
                  >
                    {t(el.title)}
                  </Button>
                  <Box mt={2} display={openCall ? 'block' : 'none'}>
                    <Text fontSize='md'>Main Line:</Text>
                    <Text color='blue.100'>{el.mainLine}</Text>
                    <Text mt={2} fontSize='md'>
                      Phone Support:
                    </Text>
                    <Text
                      color={bgColor === 'white' ? 'black' : 'contact.text'}
                    >
                      {customersObj[retailer].phoneSupport}
                    </Text>
                  </Box>
                </>
              )}
            </Flex>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}
