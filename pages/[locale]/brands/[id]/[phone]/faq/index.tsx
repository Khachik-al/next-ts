import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { PageLayout } from '../../../../../../src/components/pageLayout/pageLayout'
import { FaqsSelected } from '../../../../../../src/content/faqsSelected.interface'
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

const Faq: NextPage<FaqsSelected> = ({ faqs, navbarData, name }) => {
  const [path] = useMemoizeQueryParams()

  return (
    <PageLayout
      name={name}
      navbarData={navbarData}
    >
      <Accordion mt={8} allowToggle variant='unstyled'>
        {faqs?.map((faqItem, i) => (
          <AccordionItem key={i}>
            <AccordionButton _focus={{ boxShadow: 'none' }}>
              <Box flex={1} textAlign='left'>
                <Heading as='h1' variant='navItem'>{faqItem?.name}</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Accordion allowToggle>
                {faqItem?.name !== faqItem?.children[0].name
                  ? faqItem?.children.map((elem, index) => (
                    <AccordionItem key={index} py={2}>
                      <AccordionButton _focus={{ boxShadow: 'none' }}>
                        <Flex flex={1} textAlign='left' align='center'>
                          <AccordionIcon />
                          <Text ml={4}>{elem.name}</Text>
                        </Flex>
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        {elem.children.map((element, ind) => (
                          <UnorderedList key={ind}>
                            <ListItem
                              listStyleType='none'
                              my={2}
                              color='black'
                            >
                              <Link href={`${path}${element.pk}`}>
                                <a>{element.name}</a>
                              </Link>
                            </ListItem>
                          </UnorderedList>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                  : faqItem?.children.map((elem, index) => (
                    <React.Fragment key={index}>
                      {elem.children.map((element, ind) => (
                        <UnorderedList key={ind}>
                          <ListItem listStyleType='none' my={2} color='black'>
                            <Link href={`${path}${element.pk}`}>
                              <a>{element.name}</a>
                            </Link>
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </React.Fragment>
                  ))}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
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
