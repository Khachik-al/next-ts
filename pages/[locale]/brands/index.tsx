import { Box, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import { manufactures } from '../../../src/content/manufactures'
import { Header } from '../../../src/components/header/header'
import { PhonesNavigation } from '../../../src/components/phonesNavigation/phonesNavigation'
import { SearchGroup } from '../../../src/components/searchGroup/searchGroup'
import { BrandItem } from '../../../src/components/brand/brandItem'
import { Footer } from '../../../src/components/footer/footer'
import { makeStaticProps, getStaticPaths } from '../../../src/lib/getStatic.js'
import { useTranslation } from 'next-i18next'
import { Contact } from '../../../src/components/contact/contact'
import { getProducts } from '../../../src/services'
import { Language } from '../../../src/content/locale.interface'
import { Breadcrumbs } from '../../../src/components/breadcrumbs/breadcrumbs'
import { useRouter } from 'next/router'
import { PageMeta } from '../../../src/components/pageMeta/PageMeta'
import { meta } from '../../../src/content/meta'
import { customersObj } from '../../../customer-config'

const Brands: NextPage<{ includedBrands: string[] }> = ({ includedBrands }) => {
  const { t } = useTranslation('common')
  const { query } = useRouter()
  const [brands, setBrands] = useState<string[]>(
    manufactures.filter((brand) => includedBrands.includes(brand)),
  )

  const filterBrands = (s: string) => {
    setBrands(
      includedBrands.filter(
        (brand) => brand.toLowerCase().includes(s.toLowerCase()),
      ),
    )
  }

  return (
    <>
      <PageMeta
        title={meta().brand.title}
        description={meta().brand.description}
      />
      <Header />
      <Box my={4} ml={[8, 10, 14]}>
        <Breadcrumbs
          list={[
            { name: t('support.support', { support: 'common' }), link: `/${query.locale}/` },
            { name: t('brand') },
          ]}
        />
      </Box>
      <Container mb={8} py={[0, 1]}>
        <PhonesNavigation from='brand' />
        <SearchGroup
          iconWidth={14}
          height={14}
          placeholder={t('brandSearch')}
          font='md'
          searchHandle={filterBrands}
        />
        <Container variant='brands'>
          {brands.map((el, i) => (
            <BrandItem key={i} imageSrc={`/assets/${el}.png`} text={el} />
          ))}
        </Container>
      </Container>
      <Contact bgColor='white' />
      <Footer />
    </>
  )
}

const getStaticProps: GetStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({ params: { locale } }: { params: { locale: Language } }) => {
    const customer = customersObj[process.env.CUSTOMER]
    const res = await getProducts({
      language: locale,
      customer: customer.contentCustomerId,
    })
    const brands: Set<string> = new Set()
    res.forEach((el) => { brands.add(el.manufacturer) })
    const includedBrands = Array.from(brands)
    return {
      props: { includedBrands },
    }
  },
)

export { getStaticPaths, getStaticProps }

export default Brands
