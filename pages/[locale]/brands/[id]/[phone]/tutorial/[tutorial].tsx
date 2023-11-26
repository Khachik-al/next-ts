import { Button, Heading, Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { PageLayout } from '../../../../../../src/components/pageLayout/pageLayout'
import { TouchButton } from '../../../../../../src/components/touchButton/touchButton'
import { Language } from '../../../../../../src/content/locale.interface.js'
import { Paths } from '../../../../../../src/content/paths.interface'
import {
  getI18nPaths,
  makeStaticProps,
} from '../../../../../../src/lib/getStatic.js'
import { SelectedTutorials } from '../../../../../../src/content/knowledgeBaseInterface.interface.js'
import { SelectedFaqItem } from '../../../../../../src/content/layout.interface.js'
import {
  getProducts,
  getPhone,
  getContent,
  getTutorialById,
  getContentByRef,
} from '../../../../../../src/services'
import { postAnalytics } from '../../../../../../src/analytics'
import { useRouter } from 'next/router'
import { customersObj } from '../../../../../../customer-config'
type TurotrialItem = {
  buttonScreenImages: { [key: string]: number }[]
  packageFile: { location: string }
  tutorialstep: {
    step: string
    swipeOrAction: 'NULL' | 'NONE' | '' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
    imageLocation: string
    outputOrder: number
    lcdButton: 0 | 1
  }
  tutorial: { name: string }
  phoneScreenImage: {
    faceplate_behind: number
    imageLocation: string
    screenXSize: number
    screenXUpperLeft: number
    screenYSize: number
    screenYUpperLeft: number
  }
}
type TutorialSelected = {
  tutorials: TurotrialItem[]
  navbarData: {
    faqs: SelectedFaqItem[]
    tutorials: SelectedTutorials[]
  }
  name: string
}

const Tutorial: NextPage<TutorialSelected> = ({
  tutorials,
  name,
  navbarData,
}) => {
  const { query } = useRouter()
  const [selectedItem, setSelectedItem] = useState(0)
  const [selectedFilteredItem, setSelectedFilteredItem] = useState(0)
  const [tutorialItems, setTutorialItems] = useState<TurotrialItem[]>([])

  const typeOFAnimation = () => {
    if (tutorials && tutorials[0] && tutorials[0].buttonScreenImages[0]) {
      return Object.values(tutorials[0]?.buttonScreenImages[0]).reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue
        },
      )
    }
    return 0
  }

  const selectingItem = (
    type: string,
    origin: 'component' | 'subComponent',
  ) => {
    if (origin === 'component') {
      switch (type) {
        case 'next':
          tutorials.forEach((el, i) => {
            if (
              el.tutorialstep.step ===
              tutorialItems[selectedFilteredItem + 1]?.tutorialstep?.step
            ) {
              setSelectedItem(i)
            }
          })
          postAnalytics({
            data: {
              event_category: 'tutorials',
              action: 'ControlPlayNext',
              step_to: selectedFilteredItem + 2,
              step: selectedFilteredItem + 1,
            },
            category: 'tutorials',
          })
          return setSelectedFilteredItem(selectedFilteredItem + 1)
        case 'previous':
          tutorials.forEach((el, i) => {
            if (
              el.tutorialstep.step ===
              tutorialItems[selectedFilteredItem - 1]?.tutorialstep?.step
            ) {
              setSelectedItem(i)
            }
          })
          postAnalytics({
            data: {
              event_category: 'tutorials',
              step_to: selectedFilteredItem,
              action: 'ControlPlayPrevious',
              step: selectedFilteredItem + 1,
            },
            category: 'tutorials',
          })
          return setSelectedFilteredItem(selectedFilteredItem - 1)
      }
    } else if (origin === 'subComponent') {
      tutorialItems.forEach((el) => {
        if (
          el.tutorialstep.step === tutorials[selectedItem]?.tutorialstep?.step
        ) {
          postAnalytics({
            data: {
              event_category: 'tutorials',
              action: 'OnDeviceClick',
              step_to: selectedFilteredItem + 2,
              step: selectedFilteredItem + 1,
            },
            category: 'tutorials',
          })
          setSelectedFilteredItem(selectedFilteredItem + 1)
        } else {
          postAnalytics({
            data: {
              event_category: 'tutorials',
              step_to: selectedFilteredItem + 1,
              action: 'OnDeviceClick',
              step: selectedFilteredItem + 1,
            },
            category: 'tutorials',
          })

          setSelectedItem(selectedItem + 1)
        }
      })
    } else {
      postAnalytics({
        data: {
          event_category: 'tutorials',
          step_to: selectedItem + 1,
          action: 'OnDeviceClick',
          step: selectedItem + 1,
        },
        category: 'tutorials',
      })
      setSelectedItem(selectedItem + 1)
    }
  }

  useEffect(() => {
    setTutorialItems(
      tutorials?.filter((el) => el.tutorialstep.outputOrder === 1),
    )
  }, [tutorials])

  useEffect(() => {
    postAnalytics({
      data: {
        event_category: 'tutorials',
        step_to: selectedFilteredItem + 1,
        action: 'view',
        step: selectedFilteredItem + 1,
      },
      category: 'tutorials',
    })
  }, [selectedFilteredItem, selectedItem])

  useEffect(() => {
    setSelectedFilteredItem(0)
    setSelectedItem(0)
  }, [query.tutorial])

  return (
    <PageLayout name={name} navbarData={navbarData} step={selectedFilteredItem}>
      {tutorials && (
        <Box maxW={1300}>
          <Heading variant='contactTitles' as='h1'>
            {tutorials[0]?.tutorial?.name}
          </Heading>
          <Box mt={6}>
            <Flex align='center' justify='space-around' wrap='wrap'>
              {tutorials[selectedItem] && (typeOFAnimation() <= 0 ? (
                <Box width={300} height={600}>
                  {tutorials[selectedItem]?.packageFile?.location && <iframe
                    src={`${tutorials[selectedItem]?.packageFile?.location}`}
                    width={300}
                    height={600}
                  />}
                </Box>
              ) : !(
                tutorials[selectedItem]?.phoneScreenImage?.imageLocation &&
                    tutorials?.[selectedItem]?.tutorialstep?.imageLocation
              ) ? (
                  <Box width={300} height={600} />
                ) : (
                <Box position='relative' float='left' display='block'>
                  <picture>
                    <source
                      srcSet={
                        tutorials[selectedItem]?.phoneScreenImage?.imageLocation
                      }
                      type='image/webp'
                    />
                    <img
                      style={{ zIndex: 2, position: 'relative' }}
                      alt='tutorialImage'
                      src={
                        tutorials?.[selectedItem]?.phoneScreenImage
                          ?.imageLocation
                      }
                    />
                  </picture>
                  <picture>
                    <source
                      srcSet={
                        tutorials[selectedItem]?.tutorialstep?.imageLocation
                      }
                      type='image/webp'
                    />
                    <img
                      style={{
                        zIndex: tutorials?.[selectedItem]?.phoneScreenImage
                          ?.faceplate_behind === 0 ? 1 : 3,
                        position: 'absolute',
                        float: 'left',
                        top: tutorials[selectedItem]?.phoneScreenImage
                          ?.screenYUpperLeft,
                        height:
                          tutorials[selectedItem]?.phoneScreenImage
                            ?.screenYSize,
                        width:
                          tutorials[selectedItem]?.phoneScreenImage
                            ?.screenXSize,
                        left: tutorials[selectedItem]?.phoneScreenImage
                          ?.screenXUpperLeft,
                      }}
                      height={
                        tutorials[selectedItem]?.phoneScreenImage?.screenYSize
                      }
                      width={
                        tutorials[selectedItem]?.phoneScreenImage?.screenXSize
                      }
                      alt='tutorialImage'
                      src={
                        tutorials?.[selectedItem]?.tutorialstep?.imageLocation
                      }
                    />
                  </picture>
                  {selectedItem < tutorials.length - 1 && (
                    <TouchButton
                      top={`${
                        tutorials[selectedItem]?.tutorialstep.lcdButton === 1
                          ? tutorials[selectedItem]?.buttonScreenImages[0]
                            ?.buttonYUpperLeft +
                            tutorials[selectedItem].phoneScreenImage
                              .screenYUpperLeft
                          : tutorials[selectedItem]?.buttonScreenImages[0]
                            ?.buttonYUpperLeft
                      }px`}
                      toLeft={`${
                        tutorials[selectedItem]?.tutorialstep.lcdButton === 1
                          ? tutorials[selectedItem]?.buttonScreenImages[0]
                            ?.buttonXUpperLeft +
                            tutorials[selectedItem].phoneScreenImage
                              .screenXUpperLeft
                          : tutorials[selectedItem]?.buttonScreenImages[0]
                            ?.buttonXUpperLeft
                      }px`}
                      swipe={
                        tutorials[selectedItem]?.tutorialstep?.swipeOrAction
                      }
                      nextTutorial={
                        selectedItem < tutorials.length - 1
                          ? () => selectingItem('next', 'subComponent')
                          : undefined
                      }
                    />
                  )}
                </Box>
                ))}
              <Box w={320}>
                <Box display={'flex'}>{`${selectedFilteredItem + 1} of `}
                  <Box ml={2}>
                    {tutorialItems?.length}
                  </Box></Box>
                <Flex gap={4} align='flex-end' my={4}>
                  {tutorialItems?.map((el, i) => (
                    <Box
                      key={i}
                      width={6}
                      height={selectedFilteredItem === i ? 1 : '1px'}
                      bg={selectedFilteredItem === i ? 'bot.bg' : 'gray'}
                    ></Box>
                  ))}
                </Flex>
                <Flex gap={4}>
                  {tutorialItems && (
                    <Box
                      dangerouslySetInnerHTML={{
                        __html:
                          tutorialItems[selectedFilteredItem]?.tutorialstep
                            ?.step,
                      }}
                    />
                  )}
                </Flex>
                <Flex justify='flex-end' gap={8}>
                  <Button
                    variant='unstyled'
                    borderRadius={0}
                    _focus={{ boxShadow: 'none' }}
                    borderBottom={
                      selectedFilteredItem > 0 ? '1px solid red' : 'none'
                    }
                    borderColor={'bot.bg'}
                    disabled={selectedFilteredItem <= 0 ? true : false}
                    onClick={() => selectingItem('previous', 'component')}
                  >
                    Previous
                  </Button>
                  <Button
                    variant='unstyled'
                    borderRadius={0}
                    _focus={{ boxShadow: 'none' }}
                    borderBottom={
                      selectedFilteredItem < tutorialItems?.length - 1
                        ? '1px solid'
                        : 'none'
                    }
                    borderColor={'bot.bg'}
                    disabled={
                      selectedFilteredItem >= tutorialItems?.length - 1
                        ? true
                        : false
                    }
                    onClick={() => selectingItem('next', 'component')}
                  >
                    Next
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </PageLayout>
  )
}

export async function getStaticPaths() {
  type IncomingTutorials = {
    tutorials: [{ children: [{ pk: number | string }] }]
  }

  const locales = getI18nPaths()

  const customer = customersObj[process.env.CUSTOMER].contentCustomerId
  const products = locales.map(async ({ params }) => {
    const data = await getProducts({
      customer,
      language: params.locale,
    })
    return data
  })

  const productsFulfilled = await Promise.all(products)

  const getPaths = async ({
    customerID,
    manufacturer,
    locale,
  }: {
    customerID: string
    manufacturer: string
    locale: Language | string
  }) => {
    const getPhonePromises = []
    const tutorialItems: Array<Promise<IncomingTutorials>> = []

    getPhonePromises.push(
      getPhone({
        customer,
        deviceRef: String(customerID),
      }),
    )
    const phoneIds = await Promise.all(getPhonePromises)
    phoneIds.forEach((el) => {
      tutorialItems.push(
        getContent({
          customer,
          language: locale,
          phoneId: `${el.phone.pk}`,
          type: 'tutorials',
        }),
      )
    })

    const tutorials = await Promise.all(tutorialItems)
    return tutorials.map((el) => {
      return el.tutorials.map((elem) => {
        return elem.children.map((element) => {
          return {
            params: {
              id: manufacturer,
              phone: `${customerID}`,
              tutorial: `${element.pk}`,
              locale,
            },
          }
        })
      })
    })
  }

  const pathsArray = locales.reduce<Promise<Paths[][][]>[]>(
    (acc, next) => [
      ...acc,
      ...productsFulfilled[0].map(
        ({
          customerID,
          manufacturer,
        }: {
          customerID: string
          manufacturer: string
        }) => getPaths({ customerID, manufacturer, locale: next.params.locale }),
      ),
    ],
    [],
  )

  const pathsItems: Paths[] = []
  const parsingPathsArray = await Promise.all(pathsArray)
  for (let i = 0; i < parsingPathsArray.length; i++) {
    const element = parsingPathsArray[i]
    if (element.length) {
      for (let ind = 0; ind < element.length; ind++) {
        const elem = element[ind]
        for (let index = 0; index < elem.length; index++) {
          const elementItem = elem[index]
          pathsItems.push(...elementItem)
        }
      }
    }
  }
  const paths = pathsItems.filter((el) => el.params.id !== '')

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = makeStaticProps(
  ['header', 'footer', 'common'],
  async ({
    params: { locale, tutorial, phone },
  }: {
    params: { tutorial: string; locale: Language; phone: string }
  }) => {
    const customer = customersObj[process.env.CUSTOMER].contentCustomerId
    try {
      const tutorials = await getTutorialById({
        customer,
        language: locale,
        tutorialId: tutorial,
      })
      const c = await getContentByRef({
        customer,
        ref: phone,
        language: locale,
      })
      return {
        props: {
          name: c.phoneData.phone.name,
          navbarData: c.content,
          tutorials,
        },
      }
    } catch (error) {
      console.log(error)
    }
  },
)

export default Tutorial
