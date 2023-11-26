import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { TutorialList } from '../../../../../../src/content/tutorialList.interface'
import { PageLayout } from '../../../../../../src/components/pageLayout/pageLayout'
import {
  getProducts,
  getContentByRef,
} from '../../../../../../src/services'
import {
  getI18nPaths,
  makeStaticProps,
} from '../../../../../../src/lib/getStatic.js'
import { Language } from '../../../../../../src/content/locale.interface'
import { Paths } from '../../../../../../src/content/paths.interface'
import useMemoizeQueryParams from '../../../../../../utils/hooks/useMemoizeQueryParams'
import { customersObj } from '../../../../../../customer-config'

const Tutorial: NextPage<TutorialList> = ({ tutorials, navbarData, name }) => {
  const [tutorialItem] = tutorials || []
  const [path, params] = useMemoizeQueryParams()

  return (
    <PageLayout
      name={name}
      navbarData={navbarData}
    >
      {tutorialItem && (
        <Box>
          <Heading variant='contactTitles' as='h1'>
            {tutorialItem.name}
          </Heading>
          <Box mt={8}>
            {tutorialItem.children
              .filter((elem) => elem.name)
              .map((el, i) => (
                <Text key={i} variant='faqListItems'>
                  <Link
                    href={`${path}${el.pk}${params}&tutorialId=${el.pk}`}
                  >
                    <a>{el?.name}</a>
                  </Link>
                </Text>
              ))}
          </Box>
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
    params: { phone: string; locale: Language };
  }) => {
    const customer = customersObj[process.env.CUSTOMER].contentCustomerId
    try {
      const c = await getContentByRef({
        ref: phone,
        language: locale,
        customer,
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

export default Tutorial
