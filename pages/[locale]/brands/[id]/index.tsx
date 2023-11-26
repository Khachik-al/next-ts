import { Box, Container, Flex } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import type { NextPage } from 'next'
import { PhoneInfo } from '../../../../src/content/models.interface'
import { getProducts } from '../../../../src/services'
import { Header } from '../../../../src/components/header/header'
import { PhonesNavigation } from '../../../../src/components/phonesNavigation/phonesNavigation'
import { SelectedBrand } from '../../../../src/components/selectedBrand/selectedBrand'
import { SearchGroup } from '../../../../src/components/searchGroup/searchGroup'
import { PhoneModel } from '../../../../src/components/phoneModel/phoneModel'
import { Footer } from '../../../../src/components/footer/footer'
import { manufactures } from '../../../../src/content/manufactures'
import {
  getI18nPaths,
  makeStaticProps,
} from '../../../../src/lib/getStatic.js'
import { Language } from '../../../../src/content/locale.interface'
import { Paths } from '../../../../src/content/paths.interface'
import { useTranslation } from 'next-i18next'
import { Contact } from '../../../../src/components/contact/contact'
import { Breadcrumbs } from '../../../../src/components/breadcrumbs/breadcrumbs'
import { useRouter } from 'next/router'
import { PageMeta } from '../../../../src/components/pageMeta/PageMeta'
import { meta } from '../../../../src/content/meta'
import { customersObj } from '../../../../customer-config'

const Models: NextPage<{
  id: string
  products: PhoneInfo[]
}> = ({ products, id }) => {
  const { t } = useTranslation('common')
  const { query, push } = useRouter()
  const [filteredProducts, setProducts] = useState(products)

  const phoneSearch = (s: string) =>
    products.filter((p) =>
      p.name.toLowerCase().includes(s.toLowerCase()) ||
      p.vanity_name?.toLowerCase().includes(s.toLowerCase()) ||
      p.manufacturer?.toLowerCase().includes(s.toLowerCase()),
    )

  const filterModels = (s: string) => {
    setProducts(phoneSearch(s))
  }

  return (
    <>
      <PageMeta
        title={meta(id).model.title}
        description={meta(id).model.description}
      />
      <Box>
        <Header />
        <Box my={4} ml={[8, 10, 14]}>
          <Breadcrumbs
            list={[
              {
                name: t('support.support', { support: 'common' }),
                link: `/${query.locale}/`,
              },
              { name: t('brand'), link: `/${query.locale}/brands/` },
              { name: t('model') },
            ]}
          />
        </Box>
        <Box>
          <PhonesNavigation from='models' onBrandClick={() => push(`/${query.locale}/brands/`)} />
          <Flex justify='center' pl={4} pb={4}>
            <SelectedBrand title={id} from='brand' />
          </Flex>
          <SearchGroup
            iconWidth={14}
            height={14}
            placeholder={t('selectModel')}
            font='md'
            searchHandle={filterModels}
          />
          <Container variant='models'>
            {products &&
              filteredProducts.map((el) => (
                <PhoneModel
                  imgSrc={`${process.env.imageUrlBase}${el.image_location}`}
                  modelName={
                    (el.manufacturer ?? '') +
                    ' ' +
                    (!!el.vanity_name ? `(${el.vanity_name}) ` : '') +
                    (el.name ?? '')
                  }
                  key={el.id}
                  customerID={el.customerID}
                />
              ))}
          </Container>
          <Contact bgColor='white' />
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({
    params: { locale, id },
  }: {
    params: { locale: Language, id: string }
  }) => {
    const customer = customersObj[process.env.CUSTOMER].contentCustomerId
    const res = await getProducts({
      language: locale,
      customer,
    })
    const products = res.filter((a) => a.manufacturer.includes(id))
    return {
      props: { products, id, locale },
    }
  },
)

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = getI18nPaths()
  const paths = locales.reduce<Paths[]>(
    (acc, next) => [
      ...acc,
      ...manufactures.map((brand) => ({
        params: {
          id: brand,
          locale: next.params.locale,
        },
      })),
    ],
    [],
  )

  return {
    paths,
    fallback: false,
  }
}

export default Models
