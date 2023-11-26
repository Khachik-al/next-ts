import {
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Link,
  Heading,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Hamburger from '/public/assets/hamburger.png'
import { exportableLoader } from '../../image-loader'
import { useRouter } from 'next/router'
import nextI18nextConfig from '../../../next-i18next.config.js'
import LanguageSwitchLink from '../languageSwitchLink/languageSwitchLink.jsx'
import { useTranslation } from 'next-i18next'
import { getHeaderItems } from '../../services'
import { HeaderData, Item } from '../../content/headerData.interface'
import { ShopAccordion } from '../shopList/shopList'
import { HeaderAccordion } from '../headerAccordion/headerAccordion'
import { TITLES } from '../../content/headerTitles'
import { MobileHeader } from '../mobileHeader/mobileHeader'
import { ZipModal } from '../zipModal/zipModal'
import { ZipData } from '../../content/zipData.interface'
import {
  LocationIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from '../../styles/components/customIcons'
import { ConfCtx } from '../../context/conf'
import { themes as theme } from '../../styles/themes'
import { customersObj } from '../../../customer-config'

export type HeaderList = {
  links: HeaderData['links']
  shopCartLink: string
  zipItems: ZipData
  item: Item[]
  itemsWithoutTBV: { linkUrl: string; linkAltText: string; linkText: string }[]
  navigationLinks:
  | [{ linkUrl: string; linkAltText: string; linkText: string }]
  | []
}

const getIcons = (type: string) => {
  switch (type) {
    case 'SearchIcon':
      return <SearchIcon />
    case 'ShoppingCartIcon':
      return <ShoppingCartIcon />
    case 'UserIcon':
      return <UserIcon />
    case 'LocationIcon':
      return <LocationIcon />
    default:
      break
  }
}

export const Header = () => {
  const { query } = useRouter()
  const { retailer } = useContext(ConfCtx)
  const themes: any = { ...theme(retailer), ...useTheme() }

  const { t } = useTranslation('header')

  const currentLocale: any =
    query.locale || nextI18nextConfig.i18n.defaultLocale

  const [screenWidth, setScreenWidthsetValue] = useState(
    typeof window !== 'undefined' && window.screen.width,
  )
  const [collapsedAccordion, setCollapsedAccordion] = useState({
    index: 0,
    isCollapsed: true,
  })
  const [headerList, setHeaderList] = useState<HeaderList>({
    itemsWithoutTBV: [
      {
        linkUrl: `/${query.locale}/brands/`,
        linkAltText: 'Phone Help',
        linkText: t('phoneHelp'),
      },
      {
        linkUrl: `/${query.locale}/topics`,
        linkAltText: 'FAQ’s',
        linkText: t('FAQ'),
      },
    ],
    links: [],
    shopCartLink: '',
    zipItems: {
      apiDomain: '',
      apiKey: '',
      doNotFollow: '',
      errormsg: '',
      locationdesc: '',
      locationlabel: '',
      locationtext: '',
      path: '',
      reversePath: '',
    },
    navigationLinks: [],
    item: [],
  })
  const { isOpen, onClose, onOpen } = useDisclosure()

  const headerRef = useRef<any>()
  const headerListRef = useRef<any>()
  const navRef = useRef<any>()
  const panelRef = useRef<any>()
  const logoRef = useRef<any>()

  const isEng = currentLocale === 'en'

  const getScreenWidth = (event: any) =>
    setScreenWidthsetValue(event.target.innerWidth)

  const retrieveHeaderData = async () => {
    const list = await getHeaderItems(
      currentLocale,
      customersObj[retailer].headerFooterUrl,
    )
    setHeaderList({
      ...headerList,
      links: list.links,
      shopCartLink: list.items.navigation.cartIconUrl,
      zipItems: list.items.locationservices,
      item: list.items.navigation.item ?? list.items.navigation.items,
      navigationLinks: list.items.navigation.navigationLinks,
    })
  }

  const onHandleToggleAccordion = (index: number) => {
    if (index === collapsedAccordion.index) {
      setCollapsedAccordion(() => ({
        index,
        isCollapsed: !collapsedAccordion.isCollapsed,
      }))
    }

    if (index === -1) {
      setCollapsedAccordion(() => ({ index, isCollapsed: true }))
    }

    if (index !== collapsedAccordion.index) {
      setCollapsedAccordion(() => ({ index, isCollapsed: false }))
    }
  }

  const onBodyOverflow = (value: string) => {
    const bodyEl = document.querySelector('body')
    if (bodyEl) {
      bodyEl.style.overflow = value
    }
  }

  const isMobile = typeof window !== 'undefined' && screenWidth <= 990

  useEffect(() => {
    retrieveHeaderData()
  }, [currentLocale, isEng, retailer])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', getScreenWidth)
      return () => {
        window.removeEventListener('resize', getScreenWidth)
      }
    }
  }, [])

  return (
    <Container
      ref={headerRef}
      top='0'
      zIndex='9'
      p={'0'}
      variant='header'
      transition='0.3s all ease'
    >
      <Box bgColor={'headerHelmet.bg'}>
        <Flex
          ref={headerListRef}
          h={8}
          justify='flex-end'
          alignItems='center'
          color='text.header'
          px={['2%', '2%', '4%', 20, 20]}
          gap={5}
          display={['none', 'none', 'none', 'flex']}
        >
          <Text variant='headerList'>
            {nextI18nextConfig.i18n.locales.map((locale) => {
              if (locale === currentLocale) return null
              return <LanguageSwitchLink locale={locale} key={locale} />
            })}
          </Text>
          <Text variant='headerList'>
            <Link onClick={onOpen} display={'flex'} alignItems={'center'}>
              {getIcons('LocationIcon')}
              {t('zip')}
            </Link>
          </Text>
          <ZipModal
            isOpen={isOpen}
            onClose={onClose}
            data={headerList.zipItems}
          />
          {headerList.links.map((el, i) => (
            <Text variant='headerList' key={i}>
              <a
                aria-label={el.linkAltText}
                href={`${customersObj[retailer].headerExternalLinkBase}/${el.linkUrl}`}
                rel={el.doNotFollowLink}
              >
                {el.linkText}
              </a>
            </Text>
          ))}

          <Text variant='headerList'>
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
      </Box>
      <Flex
        px={['2%', '2%', '2%', 20, 40]}
        ref={navRef}
        h={['100%', '100%', '100%', 16]}
        justify={['center', 'center', 'center', 'space-between']}
        color='text.header'
        bgColor={'header'}
        align='center'
      >
        <Flex
          position='absolute'
          left={4}
          display={['block', 'block', 'block', 'none']}
          align='center'
        >
          <Box mt={1}>
            <Menu
              onOpen={() => onBodyOverflow('hidden')}
              onClose={() => onBodyOverflow('auto')}
              isOpen={!collapsedAccordion.isCollapsed}
            >
              <MenuButton
                aria-label='Options'
                ref={panelRef}
                onClick={() =>
                  setCollapsedAccordion((prev) => ({
                    index: 0,
                    isCollapsed: !prev.isCollapsed,
                  }))
                }
              >
                <Image
                  style={
                    themes.colors.header === '#FFFFFF'
                      ? { filter: 'invert(1)', cursor: 'pointer' }
                      : { cursor: 'pointer' }
                  }
                  unoptimized
                  loader={exportableLoader}
                  alt='menu'
                  src={Hamburger}
                />
              </MenuButton>
              <MenuList
                display={'flex'}
                flexDirection={'column'}
                width={'100vw'}
                height={'94vh'}
                bgColor={'white'}
                overflowY={'auto'}
                pos={'absolute'}
                left={-15}
              >
                <MobileHeader
                  headerList={headerList}
                  currentLocale={currentLocale}
                  isEng={isEng}
                  onOpen={onOpen}
                />
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Box ref={logoRef} pos={'relative'} bottom={0}>
          <NextLink
            aria-label='Go to main page'
            href={`/${currentLocale}`}
            passHref
          >
            <Link
              outline='none !important'
              display='block'
              tabIndex={0}
              cursor='pointer'
              width={[125, 125, 125, 'auto', 'auto']}
            >
              <Image
                unoptimized
                loader={exportableLoader}
                src={`/assets/${themes.logo}`}
                alt='logo'
                width={162}
                height={42}
              />
            </Link>
          </NextLink>
        </Box>
        <Container variant={'mainHeaderBlock'}>
          {!customersObj[retailer].specialHeaderAndFooter ? (
            <Flex justify='center' width='full' gap={5}>
              {headerList.itemsWithoutTBV?.map((item, index) => (
                <NextLink href={item.linkUrl} passHref key={index}>
                  <Link aria-label={item.linkAltText} variant='navLink'>
                    {item.linkText}
                  </Link>
                </NextLink>
              ))}
            </Flex>
          ) : (
            <Flex alignItems={'center'}>
              {headerList.item.map((item, i) =>
                TITLES.includes(item.title) ? (
                  <HeaderAccordion
                    onHandleToggleAccordion={onHandleToggleAccordion}
                    collapsedAccordion={collapsedAccordion}
                    panelRef={panelRef}
                    title={
                      item.title.includes('Verizon') && retailer !== 'tbv'
                        ? ''
                        : item.title
                    }
                    index={i}
                  >
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
                            <Link key={index} href={child.url} fontSize={'sm'}>
                              {child.title}
                            </Link>
                          ))}
                        </Flex>
                      </Flex>
                    )}
                  </HeaderAccordion>
                ) : (
                  <Text
                    px={3}
                    key={i}
                    textAlign='center'
                    variant='navText'
                    _hover={{ color: 'none' }}
                  >
                    <Link
                      _hover={{
                        background: 'none',
                        textDecoration: 'underline',
                      }}
                      aria-label={item.title}
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </Text>
                ),
              )}
            </Flex>
          )}
          {customersObj[retailer].specialHeaderAndFooter && (
            <Container variant={'headerBlock'}>
              {headerList.navigationLinks?.map((item, index) => (
                <Link
                  href={
                    item.linkUrl === '#customerlogin'
                      ? customersObj[retailer].loginLink
                      : item.linkUrl
                  }
                  target='_blank'
                  aria-label={item.linkAltText}
                  key={index}
                  variant='navLink'
                >
                  {item.linkText}
                </Link>
              ))}
            </Container>
          )}
        </Container>
        <Flex
          pos={['absolute', 'absolute', 'absolute', 'initial']}
          right={[2, 2, 20, 20]}
          alignItems={'center'}
          gap={5}
        >
          <Box cursor={'pointer'}>{getIcons('SearchIcon')}</Box>
          {isMobile ? (
            <Link href={customersObj[retailer].loginLink}>
              {getIcons('UserIcon')}
            </Link>
          ) : (
            <Link
              target={'_blank'}
              variant='navLink'
              href={headerList.shopCartLink}
            >
              {getIcons('ShoppingCartIcon')}
            </Link>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}
