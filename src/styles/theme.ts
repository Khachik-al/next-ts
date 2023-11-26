import { extendTheme } from '@chakra-ui/react'
import { Container } from './components/container'
import { Button } from './components/button'
import { Heading } from './components/heading'
import { Text } from './components/text'
import { Link } from './components/link'
import { UnorderedList } from './components/unorderedList'
import { Image } from './components/image'
import { themes as allThemes } from './themes/index'
import { Input } from './components/input'
import { Customer } from '../customer.interface'

export const theme = (retailer: Customer) => {
  const themes = allThemes(retailer)
  return extendTheme({
    colors: {
      header: themes.header,
      headerHelmet: themes.headerHelmet,
      footer: themes.footer,
      footerIcon: themes.footerIcon,
      text: themes.text,
      title: themes.title,
      badge: themes.badge,
      bot: themes.bot,
      contact: themes.contact,
      logo: themes.logo,
      categoryFaq: themes.categoryFaq,
      primary: themes.primary,
      gray: {
        100: '#F6F6F6',
        200: '#D8DADA',
        500: '#747676',
        900: '#333333',
      },
      red: {
        100: '#D52B1E',
      },
      blue: {
        100: '#0077B4',
      },
      green: {
        100: 'rgba(98, 187, 70, 0.8)',
      },
      black: {
        100: '#D8DADA',
        200: '#000000',
        300: '#0000009c',
        400: '#343131',
      },
      mainWhite: '#FFFFFF',
    },
    components: {
      Container,
      Button,
      Heading,
      Text,
      UnorderedList,
      Link,
      Image,
      Input,
    },
  })
}
