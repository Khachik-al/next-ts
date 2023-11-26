import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { homePageNav } from '../../content/homePageNav'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { openCloseChat } from '../../services'
import { FaqIcon, KnowledgeBaseIcon, PhoneIcon } from '../../styles/components/customIcons'
import { HomePageNav as HomePageTypes } from '../../content/homePageNav.interface'
import { ConfCtx } from '../../context/conf'

const getIcons = (type: HomePageTypes['type']) => {
  switch (type) {
    case 'phones':
      return <PhoneIcon />
    case 'chat':
      return <KnowledgeBaseIcon />
    case 'faq':
      return <FaqIcon />
    default:
      break
  }
}

export const HomePageNav = () => {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()
  const { retailer } = useContext(ConfCtx)
  return (
    <Container variant='KnowledgeBoxContainer'>
      {homePageNav(retailer).map((el, i) => {
        if (el.type === 'chat') {
          return (
            <Container
              variant='knowledgeBox'
              onClick={() => openCloseChat('show')}
            >
              <Box w={[8, 12, 16]} h={[8, 12, 16]} pos='relative'>
                {getIcons(el.type)}
              </Box>
              <Heading as='h2' variant='knowledgeHeading'>
                {t(el.title)}
              </Heading>
              <Text fontSize={['xs', 'md', 'xl']}>{t(el.desc)}</Text>
            </Container>
          )
        } else {
          return (
            <Link href={asPath + el.path} key={i} passHref>
              <Container
                variant='knowledgeBox'
              >
                <Box w={[8, 12, 16]} h={[8, 12, 16]} pos='relative'>
                  {getIcons(el.type)}
                </Box>
                <Heading as='h2' variant='knowledgeHeading'>
                  {t(el.title)}
                </Heading>
                <Text fontSize={['xs', 'md', 'xl']}>{t(el.desc)}</Text>
              </Container>
            </Link>
          )
        }
      })}
    </Container>
  )
}
