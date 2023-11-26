import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Heading,
  Text,
  Flex,
  RadioGroup,
  Stack,
  Button,
  CloseButton,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Container,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { exportableLoader } from '../../image-loader'
import { SearchItem } from '../../content/searchItems.interface'
import { CustomSpinner } from '../spinner/spinner'
import { useRouter } from 'next/router'
import { getProducts } from '../../services'
import Link from 'next/link'
import FilterIcon from '../../../public/assets/filterIcon.png'
import { RadioButton } from '../radioButton/radioButton'
import { postAnalytics } from '../../analytics'
import { useTranslation } from 'next-i18next'
import { SearchGroup } from '../searchGroup/searchGroup'
import { customersObj } from '../../../customer-config'
import { ConfCtx } from '../../context/conf'

export const CustomModal = ({
  disclosure,
  modalOpen,
  searchItems,
  height,
  isSelected,
  searchHandle,
  value,
  msearchHandle,
  findedItems,
  setSearchQuery,
  containerWidth,
  font,
  searchStatus,
  placeholder,
}: {
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  modalOpen: (open: () => void) => void
  searchItems: SearchItem[] | undefined
  height: number | string
  width: number | string
  isSelected?: boolean
  searchHandle?: (e: string) => void
  value?: string
  msearchHandle?: (input?: string) => void
  findedItems?: Array<{ key: string }>
  setSearchQuery?: (letter: string) => void
  placeholder?: string
  containerWidth: number
  font: string
  searchStatus: 'init' | 'pending' | 'done'
}) => {
  const { retailer } = useContext(ConfCtx)
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = disclosure
  const {
    query: { locale },
  } = useRouter()
  const [customers, setCustomers] =
    useState<Array<{ name: string; customerID: string; id: number }>>()
  const [searchedItems, setSearchedItems] = useState<SearchItem[] | undefined>(
    undefined,
  )
  const [searchedElements, setSearchedElements] = useState<{
    types: string[]
    manufacturers: string[]
    models: string[]
  }>({
    types: [],
    manufacturers: [],
    models: [],
  })
  const [filteredSearchItems, setFilteredSearchItems] = useState<{
    types: string | null
    manufacturers: string | null
    models: string | null
  }>({
    types: null,
    manufacturers: null,
    models: null,
  })

  const phoneTypes = new Set<string>()
  const phoneManufacturers = new Set<string>()
  const phoneModels = new Set<string>()

  const pathBuilder = (el: SearchItem) => {
    const model = customers?.filter((element) => element?.id === el?._source?.phonefk)[0]?.customerID
    if (
      el?._source?.manufacturer !== 'General' &&
      typeof window !== 'undefined' &&
      model
    ) {
      if (el._source.type === 'video') {
        const href = `/${locale}/brands/${el._source.manufacturer}/${
          locale === 'es' ? model.slice(0, -1) : model
        }`
        return href
      }
      const href = `/${locale}/brands/${el._source.manufacturer}/${
        locale === 'es' ? model.slice(0, -1) : model
      }/${el._source.type}/${el._source.pk}`
      return href
    } else {
      return
    }
  }

  const changeFilters = (filterValue: string | null, filterName: string) => {
    switch (filterName) {
      case 'types':
        setFilteredSearchItems({
          ...filteredSearchItems,
          types: filterValue,
        })
        break
      case 'manufacturers':
        setFilteredSearchItems({
          ...filteredSearchItems,
          manufacturers: filterValue,
        })
        break
      case 'models':
        setFilteredSearchItems({
          ...filteredSearchItems,
          models: filterValue,
        })
        break
      default:
        setFilteredSearchItems({ ...filteredSearchItems })
        break
    }
  }

  const clearFilters = () => {
    setFilteredSearchItems({
      types: null,
      manufacturers: null,
      models: null,
    })
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      clearFilters()
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    if (isSelected) {
      modalOpen(onOpen)
    }
  }, [isSelected, onOpen])

  useEffect(() => {
    clearFilters()
    setSearchedItems(searchItems)
  }, [searchItems])

  useEffect(() => {
    (async () => {
      const customer = customersObj[retailer].contentCustomerId
      const data = await getProducts({
        language: `${locale}`,
        customer,
      })
      setCustomers(data)
    })()
  }, [locale])

  useEffect(() => {
    if (Array.isArray(searchedItems)) {
      searchedItems
        .filter((elem) => elem._source.phone_type !== 'Account')
        ?.map((el) => {
          phoneTypes.add(el._source.phone_type)
          phoneManufacturers.add(el._source.manufacturer)
          phoneModels.add(el._source.model)
        })
      setSearchedElements({
        types: Array.from(phoneTypes),
        manufacturers: Array.from(phoneManufacturers),
        models: Array.from(phoneModels),
      })
    }
  }, [searchedItems])

  useEffect(() => {
    setSearchedItems(searchItems)
    let filtredItems = searchItems
    if (filteredSearchItems.types)
      filtredItems = filtredItems?.filter(
        (el) => el._source.phone_type === filteredSearchItems.types,
      )
    if (filteredSearchItems.manufacturers)
      filtredItems = filtredItems?.filter(
        (el) => el._source.manufacturer === filteredSearchItems.manufacturers,
      )
    if (filteredSearchItems.models) {
      filtredItems = searchedItems?.filter(
        (el) => el._source.model === filteredSearchItems.models,
      )
    }
    setSearchedItems(filtredItems)
  }, [filteredSearchItems])

  return (
    <>
      <SearchGroup
        placeholder={placeholder}
        iconWidth={height}
        height={height}
        font={font}
        searchHandle={(val) => searchHandle?.(val)}
        onKeyPress={(e) => e.key === 'Enter' && modalOpen(onOpen)}
        searchValue={value}
        containerWidth={['90%', '80%', containerWidth]}
        onSearchIconClick={() => {
          modalOpen(onOpen)
          postAnalytics({
            data: {
              event_category: 'search',
              search_term: value,
              page_url: location.href,
              action: 'submit',
            },
            category: 'search',
          })
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent
          maxWidth={[96, 'md', '2xl', '6xl']}
          p={5}
          m={5}
        >
          <ModalCloseButton _focus={{ boxShadow: 'none' }} />
          <ModalBody>
            <Flex
              justify='center'
              pb={10}
              borderBottom='2px solid gray'
              mb={10}
            >
              <SearchGroup
                placeholder={placeholder}
                iconWidth={height}
                height={height}
                font={font}
                searchHandle={(val) => searchHandle?.(val)}
                onKeyPress={(e) => e.key === 'Enter' && modalOpen(onOpen)}
                searchValue={value}
                containerWidth={[250, 250, 550]}
              />
            </Flex>
            <Flex justify='center' bg='gray.100' my={2}>
              <Box>
                {findedItems?.map((el) => (
                  <Text
                    variant='searchItem'
                    key={el.key}
                    onClick={() => {
                      setSearchQuery?.(el.key)
                      msearchHandle?.(el.key)
                    }}
                  >
                    {el.key}
                  </Text>
                ))}
              </Box>
            </Flex>
            <Accordion
              display={['block', 'block', 'block', 'none']}
              my={4}
              allowToggle
            >
              <AccordionItem border='none'>
                <AccordionButton _focus={{ boxShadow: 'none' }}>
                  <Text fontWeight={700}>Filter</Text>
                  <Image
                    alt='filterIcon'
                    src={FilterIcon}
                    width={16}
                    height={20}
                    unoptimized
                    loader={exportableLoader}
                  />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box>
                    <Box mt={6}>
                      <Text fontWeight={700} mb={4}>
                        Types
                      </Text>
                      <RadioGroup>
                        <Stack spacing={2}>
                          {searchedElements.types.map((el) => (
                            <RadioButton
                              key={el}
                              text={el}
                              value={filteredSearchItems.types}
                              selectFilteredSearchNavbar={() =>
                                changeFilters(el, 'types')
                              }
                              removeFilter={() => changeFilters(null, 'types')}
                            />
                          ))}
                        </Stack>
                      </RadioGroup>
                    </Box>
                    <Box mt={6}>
                      <Text fontWeight={700} mb={4}>
                        Manufacturers
                      </Text>
                      <RadioGroup>
                        <Stack spacing={2}>
                          {searchedElements.manufacturers.map((el) => (
                            <RadioButton
                              key={el}
                              text={el}
                              value={filteredSearchItems.manufacturers}
                              selectFilteredSearchNavbar={() =>
                                changeFilters(el, 'manufacturers')
                              }
                              removeFilter={() =>
                                changeFilters(null, 'manufacturers')
                              }
                            />
                          ))}
                        </Stack>
                      </RadioGroup>
                    </Box>
                    <Box mt={6}>
                      <Text fontWeight={700} mb={4}>
                        Models
                      </Text>
                      <RadioGroup>
                        <Stack spacing={2}>
                          {searchedElements.models.map((el) => (
                            <RadioButton
                              key={el}
                              text={el}
                              value={filteredSearchItems.models}
                              selectFilteredSearchNavbar={() =>
                                changeFilters(el, 'models')
                              }
                              removeFilter={() => changeFilters(null, 'models')}
                            />
                          ))}
                        </Stack>
                      </RadioGroup>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            {searchStatus !== 'done' && <CustomSpinner />}
            {searchedItems &&
              searchedItems?.length === 0 &&
              searchStatus === 'done' && <Text>{t('nothingFound')}</Text>}
            {searchedItems && searchedItems?.length > 0 && (
              <Flex gap={10}>
                <Box display={['none', 'none', 'none', 'block']}>
                  <Box mt={6}>
                    <Text fontWeight={700} mb={4}>
                      Types
                    </Text>
                    <RadioGroup>
                      <Stack spacing={2}>
                        {searchedElements.types.map((el) => (
                          <RadioButton
                            key={el}
                            text={el}
                            value={filteredSearchItems.types}
                            selectFilteredSearchNavbar={() => {
                              changeFilters(el, 'types')
                            }}
                            removeFilter={() => changeFilters(null, 'types')}
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Box mt={6}>
                    <Text fontWeight={700} mb={4}>
                      Manufacturers
                    </Text>
                    <RadioGroup>
                      <Stack spacing={2}>
                        {searchedElements.manufacturers.map((el) => (
                          <RadioButton
                            key={el}
                            text={el}
                            value={filteredSearchItems.manufacturers}
                            selectFilteredSearchNavbar={() =>
                              changeFilters(el, 'manufacturers')
                            }
                            removeFilter={() =>
                              changeFilters(null, 'manufacturers')
                            }
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Box mt={6}>
                    <Text fontWeight={700} mb={4}>
                      Models
                    </Text>
                    <RadioGroup>
                      <Stack spacing={2}>
                        {searchedElements.models.map((el) => (
                          <RadioButton
                            key={el}
                            text={el}
                            value={filteredSearchItems.models}
                            selectFilteredSearchNavbar={() =>
                              changeFilters(el, 'models')
                            }
                            removeFilter={() => changeFilters(null, 'models')}
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Box>
                <Box>
                  <Flex gap={4} flexDir={['column', 'column', 'row']}>
                    {filteredSearchItems.types && (
                      <Button variant='topics'>
                        {filteredSearchItems.types}
                        <CloseButton
                          size='sm'
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => changeFilters(null, 'types')}
                        />
                      </Button>
                    )}
                    {filteredSearchItems.manufacturers && (
                      <Button variant='topics'>
                        {filteredSearchItems.manufacturers}
                        <CloseButton
                          size='sm'
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => changeFilters(null, 'manufacturers')}
                        />
                      </Button>
                    )}
                    {filteredSearchItems.models && (
                      <Button variant='topics'>
                        {filteredSearchItems.models}
                        <CloseButton
                          size='sm'
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => changeFilters(null, 'models')}
                        />
                      </Button>
                    )}
                    {filteredSearchItems.types ||
                      filteredSearchItems.manufacturers ||
                      filteredSearchItems.models ? (
                      <Button variant='topics'>
                        clear all
                        <CloseButton
                          size='sm'
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => clearFilters()}
                        />
                      </Button>
                      ) : (
                      <Box></Box>
                      )}
                  </Flex>
                  {searchedItems?.map((el, i) =>
                    !!pathBuilder(el) ? (
                      <Box key={i}>
                        <Heading
                          onClick={() => {
                            postAnalytics({
                              data: {
                                event_category: 'search',
                                search_term: value,
                                page_url: location.href,
                                link_to: `${location.origin}/${pathBuilder(
                                  el,
                                )}`,
                                action: 'success',
                              },
                              category: 'search',
                            })
                          }}
                          variant='searchingHeader'
                        >
                          <Link href={pathBuilder(el) ?? '/'}>
                            {el?._source?.[locale === 'en' ? 'name' : 'name_language_3']}
                          </Link>
                        </Heading>
                        <Text fontWeight={600}>{el?._source?.model}</Text>
                        {el?._source?.[locale === 'en' ? 'steps_language_1' : 'steps_language_3'] ? (
                          <Container
                            p={0}
                            color='gray.600'
                            dangerouslySetInnerHTML={{
                              __html: el?._source?.[locale === 'en' ? 'steps_language_1' : 'steps_language_3'] ?? '',
                            }}
                          />
                        ) : (
                          el?._source?.[locale === 'en' ? 'val' : 'val_language_3'] && (
                            <Container
                              color='gray.600'
                              p={0}
                              dangerouslySetInnerHTML={{
                                __html: el?._source?.[locale === 'en' ? 'val' : 'val_language_3'] ?? '',
                              }}
                            />
                          )
                        )}
                      </Box>
                    ) : (
                      <></>
                    ),
                  )}
                </Box>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
