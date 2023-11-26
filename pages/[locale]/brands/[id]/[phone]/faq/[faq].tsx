import React, { useMemo } from 'react'
import type { NextPage } from 'next'
import { Box, Container, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaqsSelected } from '../../../../../../src/content/faqsSelected.interface'
import { PageLayout } from '../../../../../../src/components/pageLayout/pageLayout'
import {
  getContent,
  getPhone,
  getProducts,
  getContentByRef,
} from '../../../../../../src/services'
import {
  getI18nPaths,
  makeStaticProps,
} from '../../../../../../src/lib/getStatic.js'
import { Language } from '../../../../../../src/content/locale.interface'
import { Paths } from '../../../../../../src/content/paths.interface'
import { customersObj } from '../../../../../../customer-config'

const Faq: NextPage<FaqsSelected> = ({ faqs, navbarData, name }) => {
  const { query } = useRouter()
  const value: {
    name: string
    val?: string
    pk?: number
  } | void = useMemo(() => {
    let values: {
      name: string
      val?: string
      pk?: number
    } = { name: '', val: '', pk: undefined }
    faqs?.forEach((element) =>
      element?.children?.forEach((elem) =>
        elem?.children?.forEach((el) => {
          if (String(el?.pk) === query?.faq) {
            values = el
          }
        }),
      ),
    )
    return values
  }, [query, faqs])
  return (
    <PageLayout
      name={name}
      navbarData={navbarData}
    >
      {faqs && (
        <Box>
          <Heading variant='contactTitles' as='h1'>
            {value?.name}
          </Heading>
          {value?.val && (
            <Container
              variant='faqBullets'
              px={6}
              mt={6}
              dangerouslySetInnerHTML={{ __html: value?.val }}
            />
          )}
        </Box>
      )}
    </PageLayout>
  )
}

export async function getStaticPaths() {
  const locales = getI18nPaths()
  const customer = customersObj[process.env.CUSTOMER].contentCustomerId
  const products = locales.map(async ({ params }) => {
    const data = await getProducts({
      customer,
      language: params.locale,
    })
    return data
  })

  const productsFulfilled = await Promise.all(products)

  const getPaths = async ({
    customerID,
    manufacturer,
    locale,
  }: {
    customerID: string
    manufacturer: string
    locale: Language | string
  }) => {
    const getPhonePromises = []
    const faqItems: Array<Promise<FaqsSelected>> = []

    getPhonePromises.push(
      getPhone({
        customer,
        deviceRef: String(customerID),
      }),
    )
    const phoneIds = await Promise.all(getPhonePromises)
    phoneIds?.forEach((el) => {
      faqItems.push(
        getContent({
          customer,
          language: locale,
          phoneId: `${el.phone.pk}`,
          type: 'faqs',
        }),
      )
    })
    const faqs = await Promise.all(faqItems)
    return faqs.map((el) => {
      return el.faqs.map((elem) =>
        elem.children.map((child) =>
          child.children.map((element) => {
            return {
              params: {
                id: manufacturer,
                phone: `${customerID}`,
                faq: `${element.pk}`,
                locale,
              },
            }
          }),
        ),
      )
    })
  }

  const pathsArray = locales.reduce<Promise<Paths[][][][]>[]>(
    (acc, next) => [
      ...acc,
      ...productsFulfilled[0].map(
        ({
          customerID,
          manufacturer,
        }: {
          customerID: string
          manufacturer: string
        }) => getPaths({ customerID, manufacturer, locale: next.params.locale }),
      ),
    ],
    [],
  )

  const pathsItems: Paths[] = []
  const parsingPathsArray = await Promise.all(pathsArray)

  for (let i = 0; i < parsingPathsArray.length; i++) {
    const element = parsingPathsArray[i]
    if (element.length) {
      for (let ind = 0; ind < element.length; ind++) {
        const elem = element[ind]
        for (let index = 0; index < elem.length; index++) {
          const elementItem = elem[index]
          elementItem.forEach(childElemItem=> {
            pathsItems.push(...childElemItem)
          })
        }
      }
    }
  }
  const paths = pathsItems.filter((el) => el.params.id !== '')

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({
    params: { phone, locale },
  }: {
    params: { phone: string; locale: Language }
  }) => {
    const customer = customersObj[process.env.CUSTOMER].contentCustomerId
    try {
      const c = await getContentByRef({
        customer,
        ref: phone,
        language: locale,
      })
      return {
        props: {
          name: c.phoneData.phone.name,
          navbarData: c.content,
          ...c.content,
        },
      }
    } catch (error) {
      console.log(error)
    }
  },
)

export default Faq
