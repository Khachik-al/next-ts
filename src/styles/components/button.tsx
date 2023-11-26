import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Button: ComponentStyleConfig = {
  variants: {
    contact: {
      rounded: 50,
      mt: 8,
      border: '1px solid',
      _focus: { boxShadow: 'none' },
      width: 200,
      height: 50,
    },
    phoneButton: {
      rounded: 50,
      border: '1px solid',
      _focus: {
        boxShadow: 'none',
        opacity: 0.7,
      },
      _hover: {
        opacity: 0.7,
        borderColor: 'gray.500',
      },
      width: 'full',
      height: 12,
      maxW: 190,
    },
    helpful: {
      rounded: 50,
      border: '1px solid black',
      _focus: {
        opacity: 0.7,
        borderColor: 'gray.500',
        boxShadow: 'none',
      },
      _hover: {
        opacity: 0.7,
        borderColor: 'gray.500',
      },
      width: 115,
      height: 45,
      mr: 3,
    },
    helpfulIcon: {
      _hover: { 
        backgroundColor: 'none',
      },
      outline: 'none',
      backgroundColor: 'none',
      p: 0,
      minW: 7,
    },
    globalFaq: {
      fontSize: 'md',
      whiteSpace: 'wrap',
    },
    topics: {
      bg: 'gray.100',
      borderRadius: 0,
      fontSize: 'xs',
      _focus: {
        opacity: 0.7,
        boxShadow: 'none', 
      },
    },
    zipModalButton: {
      width: 210,
      borderRadius: 50,
      h: 10,
      bgColor: 'black',
      textColor: 'white',
      fontSize: 'lg',
      mr: 3,
    },
    inputSearchButton: {
      p: 0,
      borderRadius: 0,
      bg: 'footerIcon',
      _focus: {
        opacity: 0.7,
        boxShadow: 'none',
      },
      _hover: {
        opacity: 0.7,
      },
      _active: {
        opacity: 0.7,
      },
    },
  },
}
