import type { NextPage } from 'next'
import { Contact } from '../../src/components/contact/contact'
import { TotalSupport } from '../../src/components/deviceSearchNavigation/totalSupport'
import { Footer } from '../../src/components/footer/footer'
import { Header } from '../../src/components/header/header'
import { HomePageNav } from '../../src/components/homePageNav/homePageNav'
import { PopularFAQ } from '../../src/content/popularFAQ.interface'
import { getStaticPaths, makeStaticProps } from '../../src/lib/getStatic.js'
import { getContent, getPopularFaqs } from '../../src/services'
import { FaqList } from '../../src/components/faqList/faqList'
import { PageMeta } from '../../src/components/pageMeta/PageMeta'
import { Language } from '../../src/content/locale.interface'
import { meta } from '../../src/content/meta'
import { CustomerSwitcher } from '../../src/components/customer-switch'
import { customersObj } from '../../customer-config'

type PopularFAQList = {
  topics: Array<{
    name: string
    icon: string
    children: Array<{
      name: string
      children: Array<{ name: string; val: string }>
    }>
  }>
  locale: Language
  faq: [{ name: string, children: [{ name: string, children: [] }], icon: string }]
  popularFaqs: PopularFAQ[]
}

const Homepage: NextPage<PopularFAQList> = ({
  topics,
  locale,
  faq,
  popularFaqs,
}) => {
  return (
    <>
      <PageMeta
        title={meta().home.title}
        description={meta().home.description}
      />
      <main>
        <CustomerSwitcher />
        <Header />
        <TotalSupport topics={topics} locale={locale} />
        <HomePageNav />
        <FaqList list={popularFaqs} faq={faq} />
        <Contact bgColor='contact.bg' />
        <Footer />
      </main>
    </>
  )
}

const getStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({ params: { locale } }: { params: { locale: Language } }) => {
    const customer = customersObj[process.env.CUSTOMER]
    const commonTopics = await getContent({
      customer: customer.contentCustomerId,
      language: locale,
      phoneId: customer.commonTopicsProductId,
      type: 'faqs',
    })

    const popularFaqs = await getPopularFaqs({ count: 5 })

    return {
      props: {
        popularFaqs: popularFaqs.results,
        topics: commonTopics.faqs.slice(3, 8),
        locale,
        faq: commonTopics.faqs,
      },
    }
  },
)

export { getStaticPaths, getStaticProps }

export default Homepage
