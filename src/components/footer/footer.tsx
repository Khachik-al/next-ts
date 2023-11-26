import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { FC, useContext, useEffect, useState } from 'react'
import { FooterList } from '../footerList/footerList'
import { exportableLoader } from '../../image-loader'
import { getFooterItems, openCloseChat } from '../../services'
import { FooterItems } from '../../content/footerItems.interface'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import nextI18nextConfig from '../../../next-i18next.config.js'
import { useTranslation } from 'next-i18next'
import { themes as theme } from '../../styles/themes'
import {
  FacebookIcon,
  Instagram,
  Twitter,
} from '../../styles/components/customIcons'
import { retailersInfo } from '../../content/retailersInfo'
import { ConfCtx } from '../../context/conf'
import { SignForm } from './signForm'
import { customersObj } from '../../../customer-config'

type FooterProps = {
  paddingRight?: string | (string | number)[]
}

export const Footer: FC<FooterProps> = ({ paddingRight = '1rem' }) => {
  const { t } = useTranslation('footer')
  const { query } = useRouter()
  const { retailer } = useContext(ConfCtx)
  const themes = { ...theme(retailer), ...useTheme() }

  const currentLocale: any =
    query.locale || nextI18nextConfig.i18n.defaultLocale

  const [footerData, setFooterData] = useState<FooterItems>({
    footerItems1: [],
    footerItems2: [],
    shopLinks: [],
    currentCustomers: [],
    support: [
      {
        linkUrl: `/${query.locale}/brands`,
        linkText: t('select_phone_model'),
        withoutBlank: true,
      },
      {
        linkUrl: `/${query.locale}/topics`,
        linkText: t('browse_knowledge_base'),
        withoutBlank: true,
      },
      {
        linkUrl: '',
        linkText: t('needHelp'),
        onClick: () => openCloseChat('show'),
        withoutBlank: true,
      },
    ],
    aboutTracfone: [],
    footerInc: { text: '' },
    checkBalance: {
      en: {
        text: '',
      },
      es: {
        text: '',
      },
    },
  })

  const iconData = [
    {
      icon: 'FacebookIcon',
      href: retailersInfo.find((item) => item.retailer === retailer)?.link
        .facebook,
      linkAltText: "Visit TracFone's Facebook Page",
    },
    {
      icon: 'Instagram',
      href: retailersInfo.find((item) => item.retailer === retailer)?.link
        .instagram,
      linkAltText: "Visit TracFone's Instagram Page",
    },
    {
      icon: 'Twitter',
      href: retailersInfo.find((item) => item.retailer === retailer)?.link
        .twitter,
      linkAltText: "Visit TracFone's Twitter Page",
    },
  ]

  const getIcons = (type: string) => {
    switch (type) {
      case 'FacebookIcon':
        return <FacebookIcon />
      case 'Instagram':
        return <Instagram />
      case 'Twitter':
        return <Twitter />
      default:
        break
    }
  }

  const retrieveFooterData = async () => {
    const data = await getFooterItems(
      currentLocale,
      customersObj[retailer].headerFooterUrl,
    )
    const footerGroup = await data.items
    setFooterData({
      ...footerData,
      footerItems1:
        footerGroup.columncontrol.items['col-par-0'][':items'].columncontrol
          .items['col-par-0'][':items'].multilinks.links,
      footerItems2:
        footerGroup.columncontrol.items['col-par-0'][':items'].columncontrol
          .items['col-par-1'][':items'].multilinks.links,
      shopLinks:
        footerGroup.columncontrol.items['col-par-1'][':items'].multilinks.links,
      currentCustomers:
        footerGroup.columncontrol.items['col-par-1'][':items']
          .multilinks_913086938.links,
      aboutTracfone:
        footerGroup.columncontrol.items['col-par-1'][':items']
          .multilinks_1741610793.links,
      footerInc: footerGroup.rte,
      checkBalance: {
        en: footerGroup.columncontrol.items['col-par-0'][':items']
          .rte_1011352230,
        es: footerGroup.columncontrol.items['col-par-0'][':items']
          .rte_1689038636,
      },
    })
  }

  useEffect(() => {
    retrieveFooterData()
  }, [currentLocale, retailer])

  return (
    <>
      <Flex
        align='center'
        flexDir='column'
        pt={[8, 8, 8, 66]}
        pr={paddingRight}
        w='full'
        bg={
          retailer === 'straigthtalk' || retailer === 'tracfone' ? 'footer' : ''
        }
        textColor={
          retailer === 'straigthtalk' || retailer === 'tracfone'
            ? 'text.footer'
            : ''
        }
      >
        <Box>
          <Flex px={4} pb={66} flexDir={['column', 'column', 'column', 'row']}>
            <Stack
              direction={[
                'column',
                'column',
                retailer === 'straigthtalk' || retailer === 'tracfone'
                  ? 'column'
                  : 'row',
              ]}
              spacing={16}
            >
              <VStack align='start' spacing={6}>
                <VStack align='start'>
                  {(retailer === 'straigthtalk' || retailer === 'tracfone') && (
                    <SignForm></SignForm>
                  )}
                  {retailer === 'straigthtalk' ||
                  (retailer === 'tracfone' && currentLocale === 'es') ? (
                    <Box
                      css={{
                        h2: {
                          width: 200,
                          fontSize: 18,
                          fontWeight: '700',
                          marginBottom: 9,
                        },
                        p: {
                          fontSize: 12,
                          '.subtitle-two': {
                            fontSize: 18,
                            fontWeight: 700,
                          },
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: footerData?.checkBalance[currentLocale]?.text,
                      }}
                    />
                    ) : (
                    <Heading
                      as='h3'
                      fontSize={[20, 20, 20, 24]}
                      variant={'footerTitle'}
                    >
                      {retailer === 'tracfone' ? '' : t('available')}
                    </Heading>
                    )}
                  <Text variant='footerSubText'>
                    {retailer === 'straigthtalk' || retailer === 'tracfone'
                      ? ''
                      : t('balance')}
                    <Text textDecor='underline'>
                      <NextLink
                        href={`/${query.locale}/topics?topicName=611611-services`}
                        passHref
                      >
                        {retailer === 'straigthtalk' || retailer === 'tracfone'
                          ? ''
                          : t('spanned_number')}
                      </NextLink>
                    </Text>
                  </Text>
                </VStack>
                {retailer !== 'straigthtalk' &&
                  retailer !== 'tracfone' &&
                  customersObj[retailer].specialHeaderAndFooter && (
                    <>
                      <FooterList
                        title={t('support')}
                        subItems={footerData.support}
                      />
                      <FooterList
                        title={t(`about-retailer.${retailer}`)}
                        subItems={footerData.aboutTracfone}
                      />
                    </>
                )}
              </VStack>
              <VStack align='start' spacing={6}>
                <VStack align='start' spacing={4}>
                  {retailer === 'straigthtalk' || retailer === 'tracfone' ? (
                    <Heading as='h3' variant='footerText_straigthtalk'>
                      {t('connect')}
                    </Heading>
                  ) : (
                    <Heading
                      as='h3'
                      fontSize={[20, 20, 20, 24]}
                      variant='footerTitle'
                    >
                      {t('connect')}
                    </Heading>
                  )}
                  <Flex alignItems='center' flexWrap='wrap' gap={8} ml={0}>
                    {iconData.map((el, i) => (
                      <NextLink passHref href={`${el.href}`} key={i}>
                        <Link
                          target='_blank'
                          cursor='pointer'
                          _hover={{ filter: 'contrast(0.5)' }}
                        >
                          {getIcons(el.icon)}
                        </Link>
                      </NextLink>
                    ))}
                  </Flex>
                </VStack>
                {customersObj[retailer].specialHeaderAndFooter && (
                  <Flex
                    justifyContent='space-between'
                    flexDirection={'row'}
                    columnGap={8}
                    flexDir={['column', 'column', 'column', 'row']}
                  >
                    <FooterList subItems={footerData.footerItems1} />
                    <FooterList subItems={footerData.footerItems2} />
                  </Flex>
                )}
              </VStack>
            </Stack>
            {(retailer === 'straigthtalk' || retailer === 'tracfone') && (
              <Stack
                minH={'3xl'}
                alignItems={'flex-start'}
                justify={'space-between'}
                ml={[0, 0, 0, 36]}
                mt={[15, 15, 16, 0]}
              >
                <VStack alignItems={'flex-start'}>
                  <Heading as='h3' variant='footerText_straigthtalk'>
                    {t('shop')}
                  </Heading>
                  {customersObj[retailer].specialHeaderAndFooter && (
                    <Flex justifyContent='space-between' flexDirection={'row'}>
                      <FooterList subItems={footerData.shopLinks} />
                    </Flex>
                  )}
                </VStack>
                <VStack alignItems={'flex-start'}>
                  <Heading as='h3' variant='footerText_straigthtalk'>
                    {t('customer')}
                  </Heading>
                  {customersObj[retailer].specialHeaderAndFooter && (
                    <Flex justifyContent='space-between' flexDirection={'row'}>
                      <FooterList subItems={footerData.currentCustomers} />
                    </Flex>
                  )}
                </VStack>
                <VStack mt={32}>
                  <FooterList
                    title={t(`about-retailer.${retailer}`)}
                    subItems={footerData.aboutTracfone}
                  />
                </VStack>
              </Stack>
            )}
          </Flex>
        </Box>
      </Flex>
      <Flex
        bgColor='footer'
        h={'auto'}
        w='full'
        flexDir={'column'}
        alignItems={'center'}
        justify='center'
        pr={paddingRight}
        mb={-14}
      >
        {retailer === 'straigthtalk' && (
          <Flex
            color={'text.footer'}
            fontSize={'xs'}
            mb={10}
            mt={64}
            w={['xs', '5xl']}
          >
            {t(`refer_conditions.${retailer}`)}
          </Flex>
        )}

        {retailer === 'tracfone' ? (
          <Flex
            justify={['center']}
            align='center'
            flexDirection={['column']}
            px={[4, 4, 4, 10]}
          >
            <Flex>
              <Text
                fontSize='xs'
                pb={[6, 6, 6, 0]}
                px={[0, 0, 0, 48]}
                color='text.footer'
              >
                <Box
                  dangerouslySetInnerHTML={{
                    __html: footerData.footerInc.text,
                  }}
                />
              </Text>
            </Flex>
            <Image
              unoptimized
              loader={exportableLoader}
              alt='logo'
              width={162}
              height={40}
              src={`/assets/${themes.logo}`}
            />
            <Box />
          </Flex>
        ) : (
          <Flex
            justify={['center', 'center', 'center', 'space-between']}
            align='center'
            flexDirection={['column', 'column', 'column', 'row']}
            w={['full', 'full', 'full', 620]}
          >
            <Flex>
              <Text fontSize='xs' pb={[6, 6, 6, 0]} textColor='text.footer'>
                {
                  retailersInfo.find((item) => item.retailer === retailer)
                    ?.titleFooter
                }
              </Text>
            </Flex>
            <Image
              unoptimized
              loader={exportableLoader}
              alt='logo'
              width={162}
              height={40}
              src={`/assets/${themes.logo}`}
            />
            <Box />
          </Flex>
        )}
      </Flex>
    </>
  )
}
