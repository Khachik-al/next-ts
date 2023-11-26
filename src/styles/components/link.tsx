import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Link: ComponentStyleConfig = {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
  },
  variants: {
    navLink: {
      fontWeight: 'bold',
      cursor: 'pointer',
      _hover: { color: 'none', textDecoration: 'underline' },
    },
    mobileNavLink: {
      fontWeight: 'bold',
      cursor: 'pointer',
      borderBottom: '1px',
      borderColor: 'gray.200',
      pl: 5,
    },
  },
}
