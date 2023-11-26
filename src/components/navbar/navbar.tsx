import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Container,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { SelectedBrand } from '../selectedBrand/selectedBrand'
import {
  SelectedFaqItem,
  SelectedTutorialItem,
} from '../../content/layout.interface'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type NavbarProps = {
  faqItems: SelectedFaqItem[]
  tutorialItems: SelectedTutorialItem[]
  modelName: string
  mobile?: boolean
  showBrand?: boolean
}

export const Navbar = ({
  faqItems,
  tutorialItems,
  modelName,
  mobile = false,
  showBrand = false,
}: NavbarProps) => {
  const { query } = useRouter()
  const { t } = useTranslation('common')
  const [tutorialShowMore, setTutorialShowMore] = useState(false)
  const [faqShowMore, setFaqShowMore] = useState(false)
  const filteredFaqItems = faqItems
    .filter(item => !!item.children
      .filter(title => !!title.children
        .filter(value => !!value.name).length)
      .length)

  const toggleTutorialShowMore: () => void = () => {
    setTutorialShowMore(!tutorialShowMore)
  }
  const toggleFaqShowMore: () => void = () => {
    setFaqShowMore(!faqShowMore)
  }

  // eslint-disable-next-line react/display-name
  const renderLink = (contentType: 'faq' | 'tutorial') => (a: { name?: string, pk?: number }, ix: number) => {
    if (!a.name || !a.pk) return null
    return (
      <UnorderedList key={ix}>
        <ListItem
          listStyleType='none'
          color='black'
          my={2}
          _hover={{ color: 'bot.bg' }}
        >
          <Link
            href={`/${query.locale}/brands/${query.id}/${query.phone}/${contentType}/${a.pk}`}
          >
            {a.name}
          </Link>
        </ListItem>
      </UnorderedList>
    )
  }
  return (
    <Box
      pl={[0, 0, 0, 5]}
      background={['none', 'none', 'none', 'gray.100']}
      display={[
        mobile ? 'block' : 'none',
        mobile ? 'block' : 'none',
        mobile ? 'block' : 'none',
        'block',
      ]}
    >
      <Container
        variant='navSelectedItem'
        display={showBrand ? 'flex' : 'none'}
      >
        <SelectedBrand title={modelName} from='navbar' diractionColumn />
      </Container>
      {tutorialItems.length > 0 && (
        <Box>
          <Heading variant='navbarHead'>{t('tutorials')}</Heading>
          <Accordion allowToggle mb={8}>
            {tutorialItems.map((el, i) =>
              <AccordionItem
                key={i}
                borderColor='black.200'
                display={!tutorialShowMore && i > 4 ? 'none' : 'block'}
                borderBottomWidth='none'
              >
                <AccordionButton my={2} _focus={{ boxShadow: 'none' }}>
                  <Box flex={1} textAlign='left'>
                    <Heading variant='navItem'>{el.name}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {el.children.map(renderLink('tutorial'))}
                </AccordionPanel>
              </AccordionItem>,
            )}
            {tutorialItems.length > 5 && (
              <Text onClick={toggleTutorialShowMore} variant='navShowMore'>
                {tutorialShowMore ? t('showLess') : t('showMore')}
              </Text>
            )}
          </Accordion>
        </Box>
      )}
      {filteredFaqItems.length > 0 && (
        <Box>
          <Heading variant='navbarHead'>FAQ's</Heading>
          <Accordion allowToggle>
            {faqItems.map((el, i) =>
              <AccordionItem
                key={i}
                borderColor='black.200'
                display={!faqShowMore && i > 4 ? 'none' : 'block'}
                borderBottomWidth='none'
              >
                <AccordionButton my={2} _focus={{ boxShadow: 'none' }}>
                  <Box flex={1} textAlign='left'>
                    <Heading variant='navItem'>{el.name}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                {el?.name !== el?.children[0].name
                  ? el.children.map((elem, index) => (
                    <AccordionPanel key={index}>
                      <Accordion allowToggle>
                        <AccordionItem>
                          <AccordionButton _focus={{ boxShadow: 'none' }}>
                            <Box flex={1} textAlign='left'>
                              <Heading variant='navItem'>
                                {elem.name}
                              </Heading>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel>
                            {elem.children.map(renderLink('faq'))}
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </AccordionPanel>
                  ))
                  : el?.children.map((elem, index) => (
                    <AccordionPanel key={index} m={0} p={0}>
                      {elem.children.map((element, ind) => (
                        <UnorderedList key={ind}>
                          <ListItem
                            listStyleType='none'
                            my={2}
                            color='black'
                          >
                            <Link
                              href={`/${query.locale}/brands/${query.id}/${query.phone}/faq/${element.pk}`}
                            >
                              <a>{element.name}</a>
                            </Link>
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </AccordionPanel>
                  ))}
              </AccordionItem>,
            )}
            {faqItems.length > 5 && (
              <Text onClick={toggleFaqShowMore} variant='navShowMore'>
                {faqShowMore ? t('showLess') : t('showMore')}
              </Text>
            )}
          </Accordion>
        </Box>
      )}
    </Box>
  )
}
