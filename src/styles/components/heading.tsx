import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Heading: ComponentStyleConfig = {
  variants: {
    contact: {
      mt: 5,
      mb: 4,
      fontSize: '2xl',
    },
    helpful: {
      fontSize: 'xl',
      mr: 6,
    },
    knowledgeHeading: {
      pb: 4,
      mt: 4,
      mb: 4,
      borderBottom: '1px solid',
      borderColor: 'gray.200',
      fontWeight: 700,
      fontSize: ['2xl', '3xl', '3xl', '3xl', '4xl'],
      height: 'auto',
    },
    tutorialHeading: {
      fontSize: 20,
      mb: 4,
      ml: 3,
      borderBottom: '1px solid',
      borderColor: 'gray.200',
      pb: 4,
      height: 14,
    },
    faqHeading: {
      mt: 10,
      mb: 4,
      fontSize: 20,
      textAlign: 'center',
    },
    totalSupport: {
      fontSize: ['2xl', '2xl', '4xl'],
      mt: [5, 5, 5, 10, 10],
      mb: [5, 5, 5, 41, 10],
      textAlign: 'center',
    },
    phonesNav: {
      textAlign: 'center',
      fontSize: [20, 24],
      mb: 8,
    },
    navItem: {
      fontSize: 16,
    },
    footerTitle: {
      fontWeight: 1000,
      my: 0,
      ml: 0,
    },
    footerText_straigthtalk: {
      fontSize: 18,
      fontWeight: 'semibold',
      textAlign: 'center',
      mb: 3,
    },
    footerSubTitles: {
      fontSize: [20, 20, 24, 24],
      fontWeight: 950,
      my: 0,
      pb: 5,
    },
    contactTitles: {
      fontSize: 24,
      fontWeight: 700,
    },
    faqTitles: {
      fontSize: 'xl',
      fontWeight: 700,
    },
    knowledgeFaq: {
      my: 4,
      fontSize: 18,
    },
    knowledgeTitles: {
      fontSize: 24,
      fontWeight: 700,
      ml: 4,
      my: 4,
    },
    individualFaq: {
      fontSize: 20,
      my: 8,
    },
    phoneFeatureType: {
      fontSize: 'sm',
    },
    faqsTitles: {
      fontSize: 24,
      fontWeight: 700,
      mb: 4,
    },
    navbarHead: {
      textAlign: ['start', 'start', 'start', 'center'],
      my: 4,
      fontSize: 24,
    },
    searchingHeader: {
      fontSize: 18,
      my: 4,
      cursor: 'pointer',
      _hover: {
        textDecoration: 'underline',
        textDecorationThickness: 2,
      },
      display: 'inline-block',
    },
    refillHeading: {
      borderBottomColor: 'black.100',
      borderBottom: '1px solid',
      textAlign: 'center',
      fontSize: 'lg',
      width: 225,
      pb: 3,
      mb: 3,
    },
  },
}
