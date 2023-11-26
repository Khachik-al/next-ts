import { Box, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaqItemInterface } from '../../content/faqItem.interface'

export const FaqItem = ({ title, subTitles }: FaqItemInterface) => {
  const [showAll, setShowAll] = useState(false)
  const { query } = useRouter()
  const { t } = useTranslation('common')

  return (
    <Box mt={4}>
      <Heading as='h3' variant='faqTitles'>
        {title}
      </Heading>
      {subTitles.map((el, i) => {
        if (!showAll && i > 4) {
          return
        } else {
          return (
            <Text
              key={i}
              variant='faqListItems'
              border={(i === subTitles.length - 1) ? 'none' : ''}
            >
              <Link
                href={`/${query.locale}/brands/${query.id}/${query.phone}/faq/${el.pk}`}
              >
                <a>{el.name}</a>
              </Link>
            </Text>
          )
        }
      })}
      {subTitles.length > 4 && !showAll && (
        <Text pl={3} variant='showAll' onClick={() => setShowAll(true)}>
          {t('showAll')}
        </Text>
      )}
    </Box>
  )
}
