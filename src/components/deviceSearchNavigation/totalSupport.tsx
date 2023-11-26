import {
  Box,
  Heading,
  Button,
  Flex,
  Text,
  Container,
  useDisclosure,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { search, typeahead } from '../../services'
import { Language } from '../../content/locale.interface'
import { SearchIndexPage } from '../searchGroup/searchIndexPage'
import { postAnalytics } from '../../analytics'
import { useRouter } from 'next/router'
import { ConfCtx } from '../../context/conf'
import slugify from 'slugify'
import { customersObj } from '../../../customer-config'

export const TotalSupport = ({
  topics,
  locale,
}: {
  topics: Array<{
    name: string
    icon: string
    children: Array<{
      name: string
      children: Array<{ name: string; val: string }>
    }>
  }>
  locale: Language
}) => {
  const { query } = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchItems, setSearchItems] = useState<Array<{ key: string }>>([])
  const [selectedSearchItems, setSelectedSearchItems] = useState([])
  const [searchStatus, setSearchStatus] = useState<'init' | 'pending' | 'done'>('init')
  const [isSelected, setIsSelected] = useState(false)
  const { retailer } = useContext(ConfCtx)
  const custumerId = customersObj[retailer].contentCustomerId
  const { t } = useTranslation('common')
  const disclosure = useDisclosure()
  const { onOpen } = disclosure
  useEffect(() => {
    (async () => {
      const content: { key: string }[] = await typeahead(searchQuery, locale, custumerId)
      const ids = content?.map((o) => o.key.replaceAll('’', '').replaceAll("'", ''))
      const uniqueData = content?.filter(
        ({ key }, index) =>
          !ids.includes(key.replaceAll('’', '').replaceAll("'", ''), index + 1),
      )

      if (uniqueData?.length > 0) {
        setSearchItems(uniqueData)
      } else {
        setSearchItems(content)
      }

      if (searchQuery.length > 1) {
        postAnalytics({
          data: {
            event_category: 'search',
            search_term: searchQuery,
            page_url: location.href,
          },
          category: 'search',
        })
      }

    })()
  }, [searchQuery])

  const searchHandle = (value: string) => {
    setSearchQuery(value)
  }

  const msearchHandle = async (input?: string) => {
    setSearchStatus('pending')
    const { responses } = await search({ searchQuery: input ?? searchQuery, language: locale, customer: custumerId })
    setSearchStatus('done')
    setSelectedSearchItems(responses?.[0]?.hits?.hits)
  }

  const clickHandler = (open: () => void) => {
    open()
    msearchHandle()
  }

  setIsSelected(false)

  const selectedSearchItem = (letter: string) => {
    setSearchQuery(letter)
    setIsSelected(true)
    onOpen()
    msearchHandle(letter)
  }

  return (
    <Box>
      <Heading as='h1' variant='totalSupport'>
        {t(`support.${retailer}`, { support: 'common' })}
      </Heading>
      <SearchIndexPage
        disclosure={disclosure}
        width={12}
        height={12}
        placeholder={t('searchPromptText')}
        containerWidth={550}
        font='xl'
        searchHandle={searchHandle}
        value={searchQuery}
        openModal={clickHandler}
        searchItems={selectedSearchItems}
        isSelected={isSelected}
        msearchHandle={msearchHandle}
        findedItems={searchItems}
        setSearchQuery={setSearchQuery}
        searchStatus={searchStatus}
      />
      <Flex my={1} justify='center'>
        <Container bg='gray.100' w={['90%', '80%', 550]}>
          {searchItems?.map((el) => (
            <Text
              variant='searchItem'
              key={el.key}
              onClick={() => selectedSearchItem(el.key)}
            >
              {el.key}
            </Text>
          ))}
        </Container>
      </Flex>
      <Container overflowX='auto' whiteSpace='nowrap' mb={2} pb={3}>
        <HStack spacing={4} px={4} mt={[3, 3, 5]} justify={['start', 'start', 'center']}>
          <Heading as='h2' fontSize={12}>
            {t('topics')}
          </Heading>
          {topics?.map((el, i) => (
            <Box key={i}>
              <Link
                passHref
                href={`/${query.locale}/topics?topicName=${slugify(el.name, { lower: true, strict: true })}&subtopic=${
                  slugify(topics.filter(faq => faq.name === el.name)[0].children[0].name, { lower: true, strict: true })
                }`}
              >
                <Button variant='topics'>{el.name}</Button>
              </Link>
            </Box>
          ))}
        </HStack>
      </Container>
    </Box>
  )
}
