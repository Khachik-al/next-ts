import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Text: ComponentStyleConfig = {
  variants: {
    faqLink: {
      fontWeight: 700,
      mt: 6,
      fontSize: 'md',
      mx: 4,
    },
    homeFaqLink: {
      fontWeight: 700,
      fontSize: 'md',
    },
    footerText: {
      textAlign: 'center',
      fontSize: 'md',
      fontWeight: 400,
    },
    tutorialLink: {
      ml: 5,
      mt: 8,
      fontSize: 'md',
      fontWeight: 700,
      cursor: 'pointer',
    },
    phonesNav: {
      borderBottom: '2px solid',
      borderColor: 'black',
      fontWeight: 400,
      pb: 2,
    },
    brand: {
      fontSize: 20,
      fontWeight: 700,
      color: 'black',
      width: [24, 24, 24, 32],
    },
    selectedBrand: {
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: 'nowrap',
      textAlign: 'left',
      mr: 2,
    },
    phoneModel: {
      fontSize: 14,
      fontWeight: 700,
      textAlign: 'center',
    },
    selectedBrandTitle: {
      fontSize: 12,
      fontWeight: 400,
    },
    footerSubText: {
      fontSize: [12, 16],
      ml: 0,
      mb: 0,
    },
    contactText: {
      fontWeight: 400,
      mt: 4,
    },
    faqListItems: {
      color: 'black',
      pb: 4,
      borderBottom: '2px solid',
      borderColor: 'gray.100',
      mt: 4,
      mx: 2,
    },
    showAll: {
      mt: 4,
      fontSize: 'md',
      fontWeight: 700,
      cursor: 'pointer',
    },
    phoneFeatures: {
      fontSize: 'sm',
      color: 'gray.500',
      mt: 1,
    },
    phoneFeature: {
      fontSize: 'sm',
      color: 'gray.500',
    },
    topic: {
      my: 2,
      cursor: 'pointer',
      fontWeight: 400,
      pb: 4,
      textAlign: 'left',
    },
    answers: {
      private_article: {
        ol: {
          pl: 8,
        },
      },
      ol: {
        pl: 8,
      },
      ul: {
        listStyle: 'circle',
        pl: 10,
      },
    },
    searchItem: {
      _hover: { color: 'footerIcon' },
      cursor: 'pointer',
      textAlign: 'center',
      my: 1,
    },
    navText: {
      color: 'text.header',
      fontWeight: 'bold',
      cursor: 'pointer',
      _hover: { color: 'gray.600' },
    },
    headerList: {
      color: 'headerHelmet.text',
      fontSize: 'xs',
      cursor: 'pointer',
      _hover: { textDecoration: 'underline' },
    },
    mobileHeaderList: {
      fontSize: 'sm',
      cursor: 'pointer',
      padding: 3,
    },
    activeAccordionButton: {
      color: 'text.header',
      fontWeight: 'bold',
      cursor: 'pointer',
      position: 'relative',
      _after: {
        content: '""',
        border: 'solid transparent',
        left: '24%',
        bottom:
          typeof window !== 'undefined' &&
            document.documentElement.offsetWidth < 1120
            ? '-43px'
            : '-29px',
        width: '20px',
        height: '0',
        position: 'absolute',
        display: 'block',
        borderColor: 'transparent',
        borderBottomColor: 'gray.100',
        borderWidth: '10px',
      },
    },
    inactiveAccordionButton: {
      fontWeight: 'bold',
      color: 'text.header',
      cursor: 'pointer',
      position: 'relative',
      _after: {},
    },
    navShowMore: {
      pt: 2,
      textAlign: 'center',
      fontWeight: 'bold',
      cursor: 'pointer',
      position: 'relative',
      _hover: {
        textDecor: 'underline',
      },
      borderTop: '1px solid',
      borderColor: 'black.200',
    },
  },
}
