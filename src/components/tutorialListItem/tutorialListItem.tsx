import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { TutorialList } from '../../content/TutorialListItem.interface'

export const TutorialListItem = ({ title, child }: TutorialList) => {
  const [showAll, setShowAll] = useState(false)
  const { query } = useRouter()
  const { t } = useTranslation('common')

  return (
    <Box>
      <Heading variant='tutorialHeading'>{title}</Heading>
      <UnorderedList variant='contentList'>
        {child
          .filter((el) => el.name)
          .map((elem, index) => {
            if (!showAll && index > 4) {
              return
            } else {
              return (
                <ListItem
                  mb={4}
                  listStyleType='none'
                  color='gray.900'
                  fontWeight={400}
                  key={index}
                >
                  <Link
                    href={`/${query.locale}/brands/${query.id}/${query.phone}/tutorial/${elem.pk}`}
                  >
                    {elem.name}
                  </Link>
                </ListItem>
              )
            }
          })}
        {child.filter((el) => el.name).length > 4 && !showAll && (
          <Text variant='showAll' onClick={() => setShowAll(true)}>
            {t('showAll')}
          </Text>
        )}
      </UnorderedList>
    </Box>
  )
}
