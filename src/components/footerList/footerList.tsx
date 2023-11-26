import { Heading, ListItem, UnorderedList, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FooterListInterface } from '../../content/footerListInterface'
import { ConfCtx } from '../../context/conf'

export const FooterList = ({ title, subItems }: FooterListInterface) => {
  const { retailer } = useContext(ConfCtx)
  return (
    <UnorderedList ml={0}>
      {retailer === 'straigthtalk' || retailer === 'tracfone' ? (
        <Heading as='h3' variant={'footerText_straigthtalk'}>
          {title}
        </Heading>
      ) : (
        <Heading
          as='h3'
          fontSize={[20, 20, 20, 24]}
          variant={'footerSubTitles'}
        >
          {title}
        </Heading>
      )}
      <Box>
        {subItems.map((el, i) => (
          <ListItem
            _hover={{ color: 'gray.600', textDecoration: 'underline' }}
            key={i}
            listStyleType='none'
            my={0}
            pb={3}
            fontSize={'xs'}
          >
            {el.linkUrl ? (
              <Link href={el.linkUrl} passHref>
                <a
                  color='black'
                  target={el.withoutBlank ? undefined : '_blank'}
                  rel='noreferrer'
                  onClick={el.onClick ?? undefined}
                >
                  {el.linkText}
                </a>
              </Link>
            ) : (
              <Text cursor='pointer' onClick={el.onClick ?? undefined}>
                {el.linkText}
              </Text>
            )}
          </ListItem>
        ))}
      </Box>
    </UnorderedList>
  )
}
