import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import type { NextPage } from 'next'
import { SelectedPhoneData } from '../../../../../src/content/SelectedPhoneData.interface'
import { PageLayout } from '../../../../../src/components/pageLayout/pageLayout'
import {
  getPhone,
  getProducts,
  getContentByProduct,
} from '../../../../../src/services'
import {
  getI18nPaths,
  makeStaticProps,
} from '../../../../../src/lib/getStatic.js'
import { Paths } from '../../../../../src/content/paths.interface'
import { iconsArray } from '../../../../../src/content/iconsArray'
import {
  AudioPlayback,
  DeviceWeight,
  DiagonalSize,
  DownloadSpeed,
  IncludedBattery,
  InternalMemory,
  PrimaryCamera,
  ProcessorSpeed,
  ScreenResolution,
  SecondaryCamera,
  SizeDisplay,
  StandbyTime,
  StreamingVideo,
  TalkTime,
  UploadSpeed,
  UsageTime,
  VideoPlayback,
  WaterproofRating,
  Clock,
  Wifi,
  Os,
  BANDTechnology,
  Esim,
  DefaultIcon,
} from '../../../../../src/styles/components/customIcons'
import { useTranslation } from 'next-i18next'
import { customersObj } from '../../../../../customer-config'

const Phone: NextPage<SelectedPhoneData> = ({
  phoneData,
  navbarData,
  name,
}) => {
  const { t } = useTranslation('common')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [modalUrl, setModalUrl] = useState('')
  const findImageFeatures = ({ featuretype }: { featuretype: string }) => {
    const spec = iconsArray.find((item) =>
      item.variants
        .map((i) => i.toLowerCase())
        .includes(featuretype.toLowerCase().trim(), 0),
    )
    return spec?.src
  }

  const getIcons = (type: string) => {
    switch (type) {
      case 'ScreenResolution':
        return <ScreenResolution />
      case 'AudioPlayback':
        return <AudioPlayback />
      case 'DeviceWeight':
        return <DeviceWeight />
      case 'DiagonalSize':
        return <DiagonalSize />
      case 'DownloadSpeed':
        return <DownloadSpeed />
      case 'IncludedBattery':
        return <IncludedBattery />
      case 'InternalMemory':
        return <InternalMemory />
      case 'PrimaryCamera':
        return <PrimaryCamera />
      case 'ProcessorSpeed':
        return <ProcessorSpeed />
      case 'SecondaryCamera':
        return <SecondaryCamera />
      case 'SizeDisplay':
        return <SizeDisplay />
      case 'StandbyTime':
        return <StandbyTime />
      case 'StreamingVideo':
        return <StreamingVideo />
      case 'TalkTime':
        return <TalkTime />
      case 'UploadSpeed':
        return <UploadSpeed />
      case 'UsageTime':
        return <UsageTime />
      case 'VideoPlayback':
        return <VideoPlayback />
      case 'WaterproofRating':
        return <WaterproofRating />
      case 'BrowsingTime':
        return <Clock />
      case 'InternetTime':
        return <Wifi />
      case 'OS':
        return <Os />
      case 'BANDTechnology':
        return <BANDTechnology />
      case 'Esim':
        return <Esim />
      default:
        return <DefaultIcon />
    }
  }

  const onAboutClick = () => {
    setModalUrl(phoneData.booklet.url)
    onOpen()
  }

  const onManualClick = () => {
    if (phoneData.manual.url.toLowerCase().endsWith('pdf')) {
      setModalUrl(phoneData.manual.url)
      onOpen()
    } else {
      window.open(phoneData.manual.url, '_blank')
    }
  }
  return (
    <PageLayout name={name} navbarData={navbarData}>
      {phoneData && (
        <Stack
          direction={[
            'column-reverse',
            'column-reverse',
            'row',
            'column-reverse',
            'row',
          ]}
          maxW={1800}
        >
          <Box w='full'>
            <Heading variant='contactTitles' as='h1'>
              {phoneData?.phone?.name}
            </Heading>
            {phoneData?.featurevaluepairs?.length > 0 && (
              <Text cursor={'default'} variant='showAll'>
                {t('technical_specifications')}
              </Text>
            )}
            <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
              gap={6}
              mt={8}
              overflowX='auto'
            >
              {phoneData?.featurevaluepairs.map(
                (el: { feature: string; featuretype: string }, i: number) => (
                  <GridItem key={i} placeItems='center'>
                    <Flex gap={4}>
                      {getIcons(String(findImageFeatures(el)))}
                      <Box>
                        <Heading variant='phoneFeatureType' as='h4'>
                          {el?.featuretype}
                        </Heading>
                        <Text variant='phoneFeatures'>{el?.feature}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                ),
              )}
            </Grid>
            {phoneData?.features?.length > 0 && (
              <Text variant='showAll'>{t('features')}</Text>
            )}
            <Flex
              gap={10}
              mt={4}
              overflowX='auto'
            >
              <Box>
                {phoneData.features
                  .slice(0, Math.floor(phoneData?.features?.length / 3))
                  .map((el, i) => (
                    <Text my={2} variant='phoneFeature' key={i}>
                      {el?.feature}
                    </Text>
                  ))}
              </Box>
              <Box>
                {phoneData.features
                  .slice(
                    Math.floor(phoneData?.features?.length / 3),
                    2 * Math.floor(phoneData?.features?.length / 3),
                  )
                  .map((el, i) => (
                    <Text my={2} variant='phoneFeature' key={i}>
                      {el?.feature}
                    </Text>
                  ))}
              </Box>
              <Box>
                {phoneData?.features
                  .slice(
                    2 * Math.floor(phoneData?.features?.length / 3),
                    phoneData?.features?.length - 1,
                  )
                  .map((el, i) => (
                    <Text my={2} variant='phoneFeature' key={i}>
                      {el?.feature}
                    </Text>
                  ))}
              </Box>
            </Flex>
          </Box>
          <Flex flexDir='column' align='center' gap={4} w={{ '2xl': '60%' }}>
            <Box w={[150, 150, 180]} position='relative'>
              <picture>
                <source srcSet={phoneData?.image?.url} type='image/webp' />
                <img src={`${phoneData?.image?.url}`} alt='phone' />
              </picture>
            </Box>
            {phoneData?.manual?.url && (
              <Button variant='phoneButton' onClick={onManualClick}>
                {t('userManual')}
              </Button>
            )}
            {phoneData?.booklet?.url && (
              <Button variant='phoneButton' onClick={onAboutClick}>
                {t('aboutPhone')}
              </Button>
            )}
          </Flex>
        </Stack>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay alignItems='center' />
        <ModalContent>
          <ModalHeader>
            <Text>
              {phoneData?.phone?.manufacturer +
                ' ' +
                phoneData?.phone?.vanity_name +
                ' ' +
                phoneData?.phone?.name}
            </Text>
            <Link
              href={modalUrl}
              target='_blank'
              color='gray.600'
              fontSize={16}
            >
              {t('openInNewTab')}
            </Link>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody borderY={'1px'} borderColor={'gray.100'}>
            <Box border='2px solid' borderColor='gray.400' my={2}>
              <iframe
                src={modalUrl}
                width='100%'
                height={500}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </PageLayout>
  )
}

export async function getStaticPaths() {
  const locales = getI18nPaths()
  const customer = customersObj[process.env.CUSTOMER].contentCustomerId

  const products = locales.map(async ({ params }) => {
    const data = await getProducts({
      language: params.locale,
      customer,
    })
    return data
  })

  const productsFulfilled = await Promise.all(products)

  const pathArray = locales.reduce<Paths[]>(
    (acc, next) => [
      ...acc,
      ...productsFulfilled[0].map(
        ({
          customerID,
          manufacturer,
        }: {
          customerID: string
          manufacturer: string
        }) => ({
          params: {
            id: manufacturer,
            phone: `${customerID}`,
            locale: next.params.locale,
          },
        }),
      ),
    ],
    [],
  )
  const paths = pathArray.filter((el) => el.params.id !== '')
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({
    params: { phone, locale },
  }: {
    params: { phone: string; locale: string }
  }) => {
    const customer = customersObj[process.env.CUSTOMER].contentCustomerId
    let phoneData = null
    let navbarData = null
    let name = null
    try {
      phoneData = await getPhone({
        deviceRef: String(phone) + (locale == 'en' ? '' : 'S'),
        customer,
      })
      const products = await getProducts({
        language: locale,
        customer,
      })
      const phoneInfo = products.find(
        (el: { customerID: string; id: number; name: string }) =>
          el.customerID === phone ||
          el.customerID === phone + 'S' ||
          (phone.charAt(phone.length - 1) === 'S' && el.customerID === phone.slice(0, -1)),
      )
      if (!phoneInfo) throw new Error('no phone')
      name = phoneInfo.name
      navbarData = await getContentByProduct({
        customer,
        phoneId: `${phoneInfo?.id}`,
        language: locale,
      })
    } catch (error) {
      console.log(error)
    }

    return {
      props: {
        phoneData,
        navbarData,
        name,
      },
    }
  },
)

export default Phone
