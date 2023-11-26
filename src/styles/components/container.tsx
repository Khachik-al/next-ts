import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Container: ComponentStyleConfig = {
  baseStyle: {
    maxW: 'none',
  },
  sizes: {},
  variants: {
    header: {
      px: ['2%', '2%', '2%', 0, 0],
      bg: 'header',
      borderBottom: '1px solid',
      borderColor: 'gray.200',
      h: [14, 14, 14, 28],
      w: 'full',
      display: 'block',
    },
    mobileHeader: {
      color: 'black',
      px: [0, 0, 3],
      display: 'flex',
      flexDirection: 'column',
      borderTop: ['1px', '1px', 'none'],
      borderColor: ['gray.200', 'gray.200'],
    },
    shopList: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: ['row', 'row', 'column'],
      py: 4,
      borderTop: ['1px', '1px', 'none'],
      borderColor: ['gray.200', 'gray.200'],
      _last: { borderBottom: ['1px solid', '1px solid', 'none'], borderColor: ['gray.200', 'gray.200'] },
    },
    navText: {
      fontWeight: 'bold',
      cursor: 'pointer',
      _hover: { color: 'gray.600' },
      ml: 6,
      fontSize: 'sm',
      display: 'flex',
      p: 0,
    },
    KnowledgeBoxContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: ['column', 'column', 'column', 'row'],
      gap: 10,
      mt: [0, 0, 10],
      maxW: 1800,
      w: 'full',
      py: [0, 0, 10],
      px: 22,
      flexWrap: ['wrap', 'wrap', 'wrap', 'nowrap'],
      color: 'badge.text',
    },
    knowledgeBox: {
      bg: 'badge.bg',
      p: [10, 5, 5, 5, 10],
      maxW: 390,
      h: 'auto',
      cursor: 'pointer',
    },
    tutorialBox: {
      px: 20,
      py: 10,
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid',
      borderColor: 'gray.200',
      flexWrap: 'wrap',
      pb: 10,
      gap: 10,
    },
    contact: {
      pt: [35, 35, 65],
      pb: [35, 35, 65],
      mt: 10,
    },
    contactItem: {
      display: ['none', 'none', 'flex', 'none', 'flex'],
      justifyContent: 'center',
      maxW: 800,
      flexWrap: 'wrap',
      gap: 4,
    },
    footer: {
      pt: 16,
      pb: 16,
    },
    faqBox: {
      alignSelf: 'center',
      w: 610,
      p: 0,
    },
    phonesNav: {
      mt: 16,
      px: [2, 20],
    },
    phonesInfoIMEI: {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      gap: 8,
      flexWrap: 'wrap',
      mb: 4,
    },
    phonesNavigation: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      mb: 4,
    },
    brands: {
      maxW: 1800,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: [4, 10],
      mt: 10,
      p: [0, 1],
    },
    brand: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      w: [40, 44, 44, 72, 72],
      h: 24,
      bg: 'gray.100',
      gap: [3, 3, 3, 6],
      cursor: 'pointer',
      m: 0,
    },
    selectedBrandBox: {
      px: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 4,
    },
    selectedBrandItem: {
      border: '1px solid',
      borderColor: 'primary',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
      px: 2,
      py: 2,
      minH: 9,
    },
    selectedBrandIcon: {
      h: 4,
      w: 4,
      display: 'flex',
      justifyContent: 'center',
      p: 0,
    },
    models: {
      maxW: 1800,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
      gap: 8,
      flexWrap: 'wrap',
      my: 8,
      px: [4, 10, 20, 32],
    },
    navSelectedItem: {
      pl: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      borderBottom: '2px solid black',
      py: 8,
    },
    contactBox: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      p: [2, 4, 8],
      bg: 'gray.100',
      my: 8,
    },
    footerBlock: {
      pt: [8, 8, 8, 28],
      px: 0,
    },
    touchItem: {
      position: 'absolute',
      bg: 'black.300',
      borderRadius: '50%',
      border: '2px solid white',
      zIndex: 3,
    },
    topic: {
      cursor: 'pointer',
      w: 44,
      py: 4,
      _hover: { border: '1px solid', borderColor: 'black' },
      border: '1px solid #ffffff00',
    },
    answers: {
      a: {
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer',
        _hover: {
          opacity: '0.7',
        },
      },
      ul: {
        pl: 10,
      },
    },
    activeTopic: {
      cursor: 'pointer',
      w: 44,
      py: 4,
      bg: 'categoryFaq.bg',
      border: '1px solid',
      borderColor: 'categoryFaq.border',
    },
    mainHeaderBlock: {
      display: ['none', 'none', 'none', 'flex'],
      justifyContent: 'space-between',
      alignItems: 'center',
      width: ['70vw', '70vw', '70vw', '70vw', '60vw'],
      p: [0, 0, 0, 1, 4],
      margin: 0,
    },
    headerBlock: {
      display: ['none', 'none', 'none', 'flex'],
      justifyContent: 'center',
      alignItems: 'center',
      p: [0, 0, 0, 4, 4],
      gap: 4,
      width: 'auto',
      margin: 0,
    },
    shopListContainer: {
      justifyContent: 'flex-start',
      borderColor: 'gray.200',
      border: '1px solid',
      alignItems: 'center',
      bgColor: 'white',
      display: 'flex',
      width: ['full', 'full', 222],
      height: 66,
      margin: 0,
      px: 6,
      py: 4,
      mt: 3,
    },
    mobileBurgerMenu: {
      position: 'absolute',
      top: [20, 20, 36],
      right: 0,
      display: ['block', 'block', 'block', 'none'],
      zIndex: 7,
    },
    faqBullets: {
      'li': {
        marginLeft: 8,
      },
    },
    helpful: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      mt: 14,
    },
  },
}