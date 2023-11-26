import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import type { NextPage } from 'next'
import { KnowledgeBaseInterface } from '../../../../../../src/content/knowledgeBaseInterface.interface'
import { PageLayout } from '../../../../../../src/components/pageLayout/pageLayout'
import { TutorialListItem } from '../../../../../../src/components/tutorialListItem/tutorialListItem'
import { FaqItem } from '../../../../../../src/components/faqItem/faqItem'
import { getProducts, getContentByRef } from '../../../../../../src/services'
import {
  getI18nPaths,
  makeStaticProps,
} from '../../../../../../src/lib/getStatic.js'
import { Language } from '../../../../../../src/content/locale.interface'
import { Paths } from '../../../../../../src/content/paths.interface'
import { customersObj } from '../../../../../../customer-config'

const KnowledgeBase: NextPage<KnowledgeBaseInterface> = ({
  faqs,
  tutorials,
  navbarData,
  name,
}) => (
  <PageLayout name={name} navbarData={navbarData}>
    {faqs && tutorials && (
      <Box>
        <Heading variant='contactTitles' as='h2'>
          Total Knowledge Base
        </Heading>
        <Box mt={8}>
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
            ]}
            gap={8}
          >
            {tutorials.map((el, i) => (
              <GridItem key={i} colSpan={1}>
                <TutorialListItem title={el?.name} child={el?.children} />
              </GridItem>
            ))}
          </Grid>
        </Box>
        <Box mt={8}>
          {faqs.length > 0 && (
            <Heading variant='faqsTitles' as='h2'>
              FAQ’s
            </Heading>
          )}
          <Accordion allowToggle>
            {faqs.map((elem, index) => (
              <AccordionItem
                key={index}
                borderColor={'gray.100'}
                borderBottom={index === faqs.length - 1 ? 'none' : ''}
              >
                <AccordionButton _focus={{ boxShadow: 'none' }} py={0}>
                  <Heading variant='knowledgeFaq'>{elem.name}</Heading>
                </AccordionButton>
                <AccordionPanel py={0}>
                  {elem.children.map((el, i) => (
                    <FaqItem
                      key={i}
                      title={el.name !== elem.name ? el.name : ''}
                      subTitles={el.children}
                    />
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Box>
    )}
  </PageLayout>
)

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
    params: { locale, phone },
  }: {
    params: { phone: string; locale: Language };
  }) => {
    const customer = customersObj[process.env.CUSTOMER].contentCustomerId
    try {
      const c = await getContentByRef({ ref: phone, language: locale, customer })
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

export default KnowledgeBase
