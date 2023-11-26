import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { PopularFAQ } from '../../content/popularFAQ.interface'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { postAnalytics } from '../../analytics'

type PopularFAQList = {
  list: PopularFAQ[]
  faq: [
    { name: string; children: [{ name: string; children: AnswersArrList[] }]; icon: string },
  ]
}

interface AnswersArrList {
  name: string
  phoneFk: number
  pk: number
  val: string
  contentKey: number
  contentTitle: string
}

const valueConverter = (value: string) => {
  if (value.includes('href="/expresshelp/?showBot=textCallIssues"')) {
    value = value.replaceAll(
      'href="/expresshelp/?showBot=textCallIssues"',
      'onclick="window.botpressWebChat.sendEvent({ type: \'show\' })"',
    )
  }
  return value
}

export const FaqList = ({ list, faq }: PopularFAQList) => {
  const { t } = useTranslation('common')
  const { asPath, query } = useRouter()
  let faqs: AnswersArrList[] = []

  faq.forEach((el) => {
    el?.children?.forEach((elem) => {
      elem?.children?.forEach((element) => {
        list?.forEach((popularFaq) => {
          if (popularFaq.contentTitle === element.name) {
            faqs.push(element)
          }
        })
      })
    })
  })

  return (
    <Box my={10} mt={10}>
      <Heading variant='faqHeading'>{t('commonQuestions')}</Heading>
      <Flex justify='center' px={4}>
        <Container variant='faqBox'>
          <Accordion allowToggle>
            {faqs.map((el, i) => (
              <AccordionItem key={i} borderColor={'gray.100'}>
                <AccordionButton _focus={{ bg: 'blackAlpha.100', boxShadow: 'none' }}>
                  <Text variant='topic' key={el.contentKey}>
                    {el.name}
                  </Text>
                </AccordionButton>
                <AccordionPanel>
                  <Box ml={4}>
                    <Container
                      variant='answers'
                      dangerouslySetInnerHTML={{
                        __html: valueConverter(el.val),
                      }}
                    ></Container>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))}
            <Flex justify='center'>
              <Link href={asPath + 'topics'} passHref>
                <Button
                  variant='contact'
                  onClick={() =>
                    postAnalytics({
                      data: {
                        source: 'Related-swimlane',
                        event_category: 'navigation',
                        link_to: `${query.locale}/topics`,
                      },
                      category: 'navigation',
                    })
                  }
                >
                  <Text variant='homeFaqLink'>{t('showAll')}</Text>
                </Button>
              </Link>
            </Flex>
          </Accordion>
        </Container>
      </Flex>
    </Box>
  )
}
