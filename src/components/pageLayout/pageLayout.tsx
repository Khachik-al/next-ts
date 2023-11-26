import {
  Box,
  Container,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../content/layout.interface'
import { Contact } from '../contact/contact'
import { Footer } from '../footer/footer'
import { Header } from '../header/header'
import { Navbar } from '../navbar/navbar'
import { HelpfulContent } from '../helpfulContent/helpfulContent'
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'
import { useTranslation } from 'next-i18next'
import { PageMeta } from '../pageMeta/PageMeta'
import { meta } from '../../content/meta'

export const PageLayout = ({ children, navbarData, name, step }: Layout) => {
  const { push, query } = useRouter()
  const { t } = useTranslation('common')
  useEffect(() => {
    if (!navbarData) {
      push(`/${query.locale}/404`)
    }
  }, [navbarData, push, query])

  if (!navbarData) return <></>
  const { faqs, tutorials } = navbarData

  return (
    <>
      <PageMeta
        title={meta(name).phone.title}
        description={meta(name).phone.description}
      />
      <Header />
      <Grid
        h='auto'
        templateRows='repeat(1, 1fr)'
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(1, 1fr)',
          'repeat(1, 1fr)',
          'repeat(5, 1fr)',
        ]}
      >
        <GridItem rowSpan={1} bg='gray.100' pb={[0, 0, 0, 24]} minW={350}>
          <Navbar
            showBrand
            modelName={name}
            tutorialItems={tutorials}
            faqItems={faqs.filter((el) => el.name !== 'Parent Category')}
          />
        </GridItem>
        <GridItem colSpan={4} bg='white'>
          <Box my={6} mx={4}>
            <Breadcrumbs
              list={[
                { name: t('support.support', { support: 'common' }), link: `/${query.locale}/` },
                { name: t('brand'), link: `/${query.locale}/brands/` },
                { name: t('model'), link: `/${query.locale}/brands/${query.id}/` },
                { name: name, link: `/${query.locale}/brands/${query.id}/${query.phone}/` },
              ]}
            />
          </Box>
          <Container p={'0'}>
            <Container>
              <Box mt={8}>{children}</Box>
              {query.faq || query.tutorial ? <HelpfulContent step={step} /> : null}
                <Container m={0} p={0} display={['block', 'block', 'block', 'none']}>
                  <Navbar
                    mobile
                    modelName={name}
                    tutorialItems={tutorials}
                    faqItems={faqs.filter((el) => el.name !== 'Parent Category')}
                  />
                </Container>
              <Contact bgColor='white' paddingRight={[0, 0, 0, 0, 0, '25%']} />
            </Container>
            <Footer paddingRight={[0, 0, 0, 0, 0, '25%']}  />
          </Container>
        </GridItem>
      </Grid>
    </>
  )
}
