import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import nextI18nextConfig from '../../../next-i18next.config.js'
import { TITLES } from '../../content/headerTitles'
import LanguageSwitchLink from '../languageSwitchLink/languageSwitchLink.jsx'
import { ShopAccordion } from '../shopList/shopList'
import { HeaderList } from '../header/header'
import Location from '/public/assets/location_sm.svg'
import { useTranslation } from 'next-i18next'
import { exportableLoader } from '../../image-loader'
import { useContext } from 'react'
import { ConfCtx } from '../../context/conf'
import { customersObj } from '../../../customer-config'

interface MobileHeaderProps {
  headerList: HeaderList
  currentLocale: any
  isEng: boolean
  onOpen: () => void
}

export const MobileHeader = ({
  headerList,
  currentLocale,
  isEng,
  onOpen,
}: MobileHeaderProps) => {
  const { t } = useTranslation('header')
  const { retailer } = useContext(ConfCtx)

  return (
    <>
      {headerList.item.map((item, i) =>
        TITLES.includes(item.title) ? (
          <Accordion allowToggle>
            <AccordionItem border='none' textColor={'black'}>
              {!(item.title.includes('verizon') && retailer !== 'tbv') && (
                <AccordionButton
                  _expanded={{
                    bg: 'headerHelmet.bg',
                    color: 'headerHelmet.text',
                  }}
                  fontWeight={'bold'}
                  justifyContent={'space-between'}
                  py={4}
                >
                  {item.title}
                  <AccordionIcon />
                </AccordionButton>
              )}
              <AccordionPanel>
                {i === 0 ? (
                  <ShopAccordion headerData={headerList.item} />
                ) : (
                  <Flex alignItems={'center'} flexDirection={'column'}>
                    <Heading as={'h3'} variant={'refillHeading'}>
                      {item.flyoutHeader}
                    </Heading>
                    <Flex
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      gap={3}
                    >
                      {item.children.map((child, index) => (
                        <Link
                          key={index}
                          href={
                            retailer === 'straigthtalk'
                              ? `https://www.straighttalk.com${child.url}`
                              : child.url
                          }
                          fontSize={'sm'}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </Flex>
                  </Flex>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          <Container display={'flex'} flexDirection={'column'} p={0}>
            <Text p={4} key={i} textAlign='left' variant='navText'>
              <Link
                aria-label={item.title}
                href={
                  retailer === 'straigthtalk'
                    ? `https://www.straighttalk.com${item.url}`
                    : item.url
                }
                color={'black'}
              >
                {item.title}
              </Link>
            </Text>
          </Container>
        ),
      )}
      <Container variant={'mobileHeader'}>
        {headerList.navigationLinks?.map((link, index) => (
          <Link
            href={
              link.linkUrl === '#customerlogin'
                ? customersObj[retailer].loginLink
                : link.linkUrl
            }
            target='_blank'
            aria-label={link.linkAltText}
            key={index}
            variant='mobileNavLink'
            py={4}
          >
            {link.linkText}
          </Link>
        ))}
      </Container>
      <Flex flexDir='column' color={'black'} bgColor='gray.100'>
        <Text variant='mobileHeaderList'>
          {nextI18nextConfig.i18n.locales.map((locale) => {
            if (locale === currentLocale) return null
            return <LanguageSwitchLink locale={locale} key={locale} />
          })}
        </Text>
        <Text p={3} fontSize={'xs'} cursor={'pointer'}>
          <Link onClick={onOpen} display={'flex'} alignItems={'center'}>
            <Image
              unoptimized
              loader={exportableLoader}
              alt='menu'
              src={Location}
            />
            {t('zip')}
          </Link>
        </Text>
        {headerList.links.map((el, i) => (
          <Text variant='mobileHeaderList' key={i}>
            <a
              aria-label={el.linkAltText}
              href={`${customersObj[retailer].headerExternalLinkBase}/${el.linkUrl}`}
              rel={el.doNotFollowLink}
            >
              {el.linkText}
            </a>
          </Text>
        ))}
        <Text variant='mobileHeaderList'>
          <a
            href={`${customersObj[retailer].headerExternalLinkBase}/${
              !isEng ? currentLocale : ''
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {t(`goTo.${retailer}`)}
          </a>
        </Text>
      </Flex>
    </>
  )
}
