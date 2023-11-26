import React from 'react'
import Image from 'next/image'
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { ctaImage } from '../../content/ctaImage'
import { Item } from '../../content/headerData.interface'
import { exportableLoader } from '../../image-loader'

export const ShopAccordion = ({ headerData }: { headerData: Item[] }) => (
  <Box>
    <Flex
      p={[3, 3, 8]}
      gap={3}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      flexDir={['column-reverse', 'column-reverse', 'row']}
    >
      <Flex
        flexDir={['column', 'column', 'row']}
        gap={[0, 0, 6]}
        pt={[6, 6, 0]}
      >
        {headerData &&
          headerData[0].children.map((item, index) => (
            <Container key={index} variant='shopList'>
              <Heading
                mb={4}
                fontSize={'lg'}
                as='h3'
                w={['80%', '80%', '100%']}
              >
                {item.title}
              </Heading>
              <Container px={0} mx={0}>
                <UnorderedList listStyleType={'none'} ms={'0'}>
                  {item.children.map((child, i) => (
                    <ListItem
                      aria-label={child.title}
                      key={i}
                      pb={1.5}
                      fontSize={['sm', 'sm', 'xs']}
                    >
                      <Link href={child.url}>{child.title}</Link>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Container>
            </Container>
          ))}
      </Flex>

      <Flex
        key={1}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        flexDirection={'column'}
        pos='relative'
      >
        {document.documentElement.offsetWidth > 768 && (
          <Divider
            pos='absolute'
            left='-25'
            orientation='vertical'
            height={255}
          />
        )}
        <Heading fontSize={'lg'} as='h3'>
          {headerData[0].quickLinksHeading}
        </Heading>
        {headerData[0].quickLinks.map((cta, index) => (
          <Link
            href={cta.ctaPath}
            key={index}
            _hover={{ color: 'gray.500' }}
            width={'full'}
          >
            <Container variant={'shopListContainer'}>
              <Image
                width={34}
                height={55}
                src={ctaImage[index].src}
                unoptimized
                loader={exportableLoader}
                alt=''
              />
              <Container
                dangerouslySetInnerHTML={{
                  __html: cta.ctaText,
                }}
                variant={'navText'}
              />
            </Container>
          </Link>
        ))}
      </Flex>
    </Flex>
  </Box>
)
