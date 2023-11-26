import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Contact } from '../../src/components/contact/contact'
import { Footer } from '../../src/components/footer/footer'
import { Header } from '../../src/components/header/header'
import { Topics } from '../../src/content/topics.interface'
import Positive from '/public/assets/positive.svg'
import Negative from '/public/assets/negative.svg'
import Check from '/public/assets/check.svg'
import { exportableLoader } from '../../src/image-loader'
import { getContent } from '../../src/services'
import { getStaticPaths, makeStaticProps } from '../../src/lib/getStatic.js'
import { Language } from '../../src/content/locale.interface'
import { postAnalytics } from '../../src/analytics'
import { useRouter } from 'next/router'
import { Breadcrumbs } from '../../src/components/breadcrumbs/breadcrumbs'
import { PageMeta } from '../../src/components/pageMeta/PageMeta'
import { meta } from '../../src/content/meta'
import { customersObj } from '../../customer-config'
import slugify from 'slugify'

export { getStaticPaths }
const slugifyLower = (value: string) => slugify(value, { lower: true, strict: true })
const Commontopics = ({ generalFaqs }: Topics) => {
  const { t } = useTranslation()
  const { query, push } = useRouter()
  const pushWithoutScroll = (link: string) => {
    push(link, undefined, { scroll: false })
  }
  const [checkedFaq, setCheckedFaq] = useState('')
  const topicName =
    typeof query.topicName === 'string'
      ? query.topicName
      : slugifyLower(generalFaqs?.[0]?.name)
  const subtopic = !!query.subtopic && typeof query.subtopic === 'string' ?
    query.subtopic : slugifyLower(
      generalFaqs[
        generalFaqs?.findIndex((el) => slugifyLower(el.name) === topicName) ?? 0
      ].children[0].name,
    )
  const question = !!query.question && typeof query.question === 'string' ?
    slugifyLower(query.question) :
    slugifyLower(generalFaqs[0].children[0].children
      .filter((el) => el.val !== null)[0].name)

  const getIcons = (type: string) => {
    switch (type.toLowerCase().trim()) {
      case '611611 services': return '611611-services'
      case 'troubleshooting': return 'trouble-shooting'
      case 'verizon acquisition': return 'verizon-acquisition'
      case 'mobile protect': return 'mobile-protect'
      case 'general questions': return 'general-questions'
      case 'idnotify': return 'idnotify'
      case '5g': return '5g'
      case 'general information': return 'general-information'
      case 'getting started': return 'getting-started'
      case 'features': return 'features'
      case 'products': return 'products'
      case 'policies and procedures': return 'policies-and-procedures'
      case 'international long distance': return 'international-long-distance'
      case 'device trade-In': return 'device-trade-In'
      case 'transfer number': return 'transfer-number'
      case 'services': return 'services'
      case 'managing your account': return 'managing-your-account'
      case 'plans & services': return 'plans-and-services'
      case 'device management': return 'device-management'
      case 'total wireless legacy plans': return 'total-plans'
      case 'troubleshotting': return 'troubleshotting'
      case 'device support': return 'device-suport'
      default: return
    }
  }

  const valueConverter = (value: string) => {
    if (value?.includes('<strong>Note')) {
      const indexBegin = value.indexOf('<strong>Note')
      const lastIndex = value.length - 4
      const note = value.slice(indexBegin, lastIndex)
      value = value.slice(0, indexBegin) + `<ul><li>${note}</li></ul>` + '</p>'
    }
    if (value.includes('href="/expresshelp/?showBot=textCallIssues"')) {
      value = value.replaceAll(
        'href="/expresshelp/?showBot=textCallIssues"',
        'onclick="window.botpressWebChat.sendEvent({ type: \'show\' })"',
      )
    }
    return value
  }

  const sendFaqAnalyticsEvent = ({
    type,
    val,
  }: {
    type: 'posit' | 'negat'
    val: string
  }) => {
    postAnalytics({
      data: {
        feedback_helpful: type,
        action: 'QuickFeedback',
        event_category: 'faqs',
      },
      category: 'faqs',
    })

    setCheckedFaq(val)
  }

  const SelectedFaqData = generalFaqs?.filter((el) => slugifyLower(el.name) === topicName)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': SelectedFaqData[0]?.children
      .find(el => slugifyLower(el.name) === subtopic)?.children
      .filter((el) => el.val !== null)
      .map((el) => ({
        '@type': 'Question',
        'name': el.name,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': valueConverter(el.val),
        },
      })),
  }

  const onFaqClick = (name: string, subName: string) => {
    if (name === 'Device Support') {
      pushWithoutScroll(`/${query.locale}/brands/`)
    } else {
      pushWithoutScroll(
        `/${query.locale}/topics?topicName=${slugifyLower(name)}&subtopic=${slugifyLower(subName)}`,
      )
    }
    postAnalytics({
      data: {
        action: 'TogglePrimaryCategory',
        event_category: 'landing',
      },
      category: 'landing',
    })
  }

  const onQuestionClick = (questionValue: string) => {
    pushWithoutScroll(
      `/${query.locale}/topics?topicName=${topicName}&subtopic=${subtopic}&question=${slugifyLower(questionValue)
      }`,
    )
    postAnalytics({
      data: {
        action: 'ToggleSingleFAQ',
        event_category: 'landing',
      },
      category: 'landing',
    })
    postAnalytics({
      data: {
        action: 'ToggleSingleFAQ',
        event_category: 'faqs',
      },
      category: 'faqs',
    })
  }

  return (
    <>
      <PageMeta
        title={meta().topic.title}
        description={meta().topic.description}
        structuredData={JSON.stringify(schemaData)}
      />
      <Box>
        <Header />
        <Flex justify='center'>
          <Box px={[4, 6, 16]} w={['full', 'full', 'full', 1200]} pt={3}>
            <Box mb={6}>
              <Breadcrumbs
                list={[
                  { name: t('support.support'), link: `/${query.locale}/` },
                  { name: 'FAQs' },
                ]}
              />
            </Box>
            <Grid
              rowGap={4}
              templateColumns={[
                'repeat(2, 1fr)',
                'repeat(2, 1fr)',
                'repeat(4, 1fr)',
                'repeat(5, 1fr)',
                'repeat(5, 1fr)',
                'repeat(7, 1fr)',
              ]}
            >
              {generalFaqs?.map((el) => (
                <Container
                  as='button'
                  key={el.name}
                  variant={topicName === slugifyLower(el.name) ? 'activeTopic' : 'topic'}
                  onClick={() => onFaqClick(
                    el.name,
                    generalFaqs.filter(faq => faq.name === el.name)[0].children[0].name,
                  )}
                >
                  <Flex justify='center'>
                    <Box
                      color={topicName === slugifyLower(el.name) ? 'categoryFaq.text' : 'black'}
                    >
                      <Image
                        unoptimized
                        loader={exportableLoader}
                        width={39}
                        height={39}
                        alt={getIcons(el.name)}
                        src={getIcons(el.name) ? `/assets/${getIcons(el.name)}.svg` : el.icon}
                      />
                    </Box>
                  </Flex>
                  <Text
                    fontWeight={topicName === slugifyLower(el.name) ? 700 : 400}
                    color={topicName === slugifyLower(el.name) ? 'categoryFaq.text' : 'black'}
                    textAlign='center'
                    mt={4}
                  >
                    {el.name}
                  </Text>
                </Container>
              ))}
            </Grid>
            <Flex my={12} wrap='wrap' gap={4}>
              {SelectedFaqData[0]?.children?.map((el, i) => (
                <Button
                  bg={subtopic === slugifyLower(el.name) ? 'primary' : 'gray.100'}
                  color={subtopic === slugifyLower(el.name) ? 'white' : 'black'}
                  variant='globalFaq'
                  key={i}
                  onClick={() =>
                    pushWithoutScroll(
                      `/${query.locale}/topics?topicName=${topicName}&subtopic=${slugifyLower(el.name)}`,
                    )
                  }
                >
                  {el.name}
                </Button>
              ))}
            </Flex>
            <Box>
              <Accordion allowToggle index={!query.question ? [] : [
                SelectedFaqData[0]?.children
                  .find(el => slugifyLower(el.name) === subtopic)?.children
                  .filter((el) => el.val !== null)
                  .findIndex(el => slugifyLower(el.name) === question) ?? 0,
              ]}>
                {SelectedFaqData[0]?.children
                  .find(el => slugifyLower(el.name) === subtopic)?.children
                  .filter((el) => el.val !== null)
                  .map((el, i) => (
                    <AccordionItem key={i}>
                      <Heading as='h2'>
                        <AccordionButton
                          as='button'
                          _focus={{ boxShadow: 'none', bg: 'blackAlpha.50' }}
                          w='full'
                          onClick={() => onQuestionClick(el.name)}
                        >
                          <Text variant='topic'>{el.name}</Text>
                        </AccordionButton>
                      </Heading>
                      <AccordionPanel>
                        <Box ml={4}>
                          <Container
                            variant='answers'
                            dangerouslySetInnerHTML={{
                              __html: valueConverter(el.val),
                            }}
                          ></Container>
                        </Box>
                        {checkedFaq === el.val ? (
                          <Flex
                            alignItems={'center'}
                            justifyContent={'flex-end'}
                            gap={5}
                            mt={14}
                          >
                            <Text fontWeight={'700'} fontSize={'sm'}>
                              {t('thanks')}
                            </Text>
                            <Image
                              unoptimized
                              loader={exportableLoader}
                              width={23}
                              height={23}
                              alt='Check'
                              src={Check}
                            />
                          </Flex>
                        ) : (
                          <Container variant={'helpful'}>
                            <Text fontWeight={'700'} fontSize={'sm'} mr={3}>
                              {t('faqHelpful')}
                            </Text>
                            <Flex>
                              <Button
                                variant={'helpfulIcon'}
                                onClick={() =>
                                  sendFaqAnalyticsEvent({
                                    type: 'posit',
                                    val: el.val,
                                  })
                                }
                              >
                                <Image
                                  unoptimized
                                  loader={exportableLoader}
                                  width={17}
                                  height={17}
                                  alt='positive'
                                  src={Positive}
                                />
                              </Button>
                              <Button
                                variant={'helpfulIcon'}
                                onClick={() =>
                                  sendFaqAnalyticsEvent({
                                    type: 'negat',
                                    val: el.val,
                                  })
                                }
                              >
                                <Image
                                  unoptimized
                                  loader={exportableLoader}
                                  width={15}
                                  height={15}
                                  alt='negative'
                                  src={Negative}
                                />
                              </Button>
                            </Flex>
                          </Container>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Box>
          </Box>
        </Flex>
        <Contact bgColor='contact.bg' />
        <Footer />
      </Box>
    </>
  )
}

export const getStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({ params: { locale } }: { params: { locale: Language } }) => {
    const customer = customersObj[process.env.CUSTOMER]
    const getGeneralFaqs = await getContent({
      customer: customer.contentCustomerId,
      language: locale,
      phoneId: customer.commonTopicsProductId,
      type: 'faqs',
    })
    const generalFaqs = await getGeneralFaqs.faqs
    return {
      props: { generalFaqs },
    }
  },
)

export default Commontopics
