import { Customer } from '../../customer.interface'

export const themes = (retailer: Customer) => {
  switch (retailer) {
    case 'tbv':
      return {
        header: '#FFFFFF',
        headerHelmet: { bg: '#FFFFFF', text: '#000000' },
        footer: '#FFFFFF',
        footerIcon: '#000000',
        search: '#000000',
        text: { header: '#000000', footer: '#000000' },
        title: '#000000',
        badge: { bg: '#F0F0F0', text: '#000000', icon: '#000000' },
        bot: { bg: '#D52B1E', color: '#FFFFFF' },
        contact: { bg: '#F0F0F0', icon: '#000000', text: '#000000' },
        logo: 'totalLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#000000', text: '#000000' },
        primary: '#000000',
        favicon: 'tbv.svg',
      }
    case 'wfm':
      return {
        header: '#397BBD',
        headerHelmet: { bg: '#397BBD', text: '#FFFFFF' },
        footer: '#397BBD',
        footerIcon: '#397BBD',
        text: { header: '#FFFFFF', footer: '#FFFFFF' },
        title: '#000000',
        badge: { bg: '#397BBD', text: '#FFFFFF', icon: '#F1BC4F' },
        search: '#397BBD',
        bot: { bg: '#397BBD', color: '#F1BC4F' },
        contact: { bg: '#397BBD', icon: '#F1BC4F', text: '#FFFFFF' },
        logo: 'walmartLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#397BBD', text: '#397BBD' },
        primary: '#397BBD',
        favicon: 'tbv.svg',
      }
    case 'gosmart':
      return {
        header: '#000000',
        headerHelmet: { bg: '#000000', text: '#FFFFFF' },
        footer: '#000000',
        footerIcon: '#C7D75B',
        search: '#C7D75B',
        text: { header: '#FFFFFF', footer: '#FFFFFF' },
        title: '#000000',
        badge: { bg: '#000000', text: '#FFFFFF', icon: '#C7D75B' },
        bot: { bg: '#C7D75B', color: '#000000' },
        contact: { bg: '#C7D75B', icon: '#000000', text: '#000000' },
        logo: 'goSmartLogo.png',
        categoryFaq: { bg: '#C7D75B', border: '#C7D75B', text: '#000000' },
        primary: '#C7D75B',
        favicon: 'go.ico',
      }
    case 'net10':
      return {
        header: '#FFFFFF',
        headerHelmet: { bg: '#FFFFFF', text: '#000000' },
        footer: '#FFFFFF',
        footerIcon: '#53ABE9',
        search: '#53ABE9',
        text: { header: '#000000', footer: '#000000' },
        title: '#000000',
        badge: { bg: '#53ABE9', text: '#FFFFFF', icon: '#000000' },
        bot: { bg: '#53ABE9', color: '#000000' },
        contact: { bg: '#53ABE9', icon: '#000000', text: '#FFFFFF' },
        logo: 'net10Logo.png',
        categoryFaq: { bg: '#53ABE9', border: '#53ABE9', text: '#000000' },
        primary: '#53ABE9',
        favicon: 'nt.ico',
      }
    case 'pageplus':
      return {
        header: '#FFFFFF',
        headerHelmet: { bg: '#D33033', text: '#FFFFFF' },
        footer: '#FFFFFF',
        footerIcon: '#D33033',
        search: '#D33033',
        text: { header: '#000000', footer: '#000000' },
        title: '#000000',
        badge: { bg: '#626469', text: '#FFFFFF', icon: '#FFFFFF' },
        bot: { bg: '#D33033', color: '#000000' },
        contact: { bg: '#D33033', icon: '#000000', text: '#FFFFFF' },
        logo: 'pagePlusLogo.png',
        categoryFaq: { bg: '#D33033', border: '#D33033', text: '#FFFFFF' },
        primary: '#D33033',
        favicon: 'pp.ico',
      }
    case 'simplemobile':
      return {
        header: '#A3D240',
        headerHelmet: { bg: '#221F20', text: '#FFFFFF' },
        footer: '#A3D240',
        footerIcon: '#A3D240',
        search: '#A3D240',
        text: { header: '#000000', footer: '#000000' },
        title: '#000000',
        badge: { bg: '#A3D240', text: '#000000', icon: '#FFFFFF' },
        bot: { bg: '#A3D240', color: '#000000' },
        contact: { bg: '#A3D240', icon: '#FFFFFF', text: '#000000' },
        logo: 'simpleMobileLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#A3D240', text: '#A3D240' },
        primary: '#A3D240',
        favicon: 'sm.ico',
      }
    case 'straigthtalk':
      return {
        header: '#C7E64E',
        headerHelmet: { bg: '#221F20', text: '#FFFFFF' },
        footer: '#231f20',
        footerIcon: '#C7E64E',
        search: '#C7E64E',
        text: { header: '#000000', footer: '#FFFFFF' },
        title: '#000000',
        badge: { bg: '#C7E64E', text: '#000000', icon: '#FFFFFF' },
        bot: { bg: '#C7E64E', color: '#000000' },
        contact: { bg: '#C7E64E', icon: '#FFFFFF', text: '#000000' },
        logo: 'straigthTalkLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#C7E64E', text: '#C7E64E' },
        primary: '#C7E64E',
        favicon: 'st.ico',
      }
    case 'tracfone':
      return {
        header: '#012979',
        headerHelmet: { bg: '#F0F0F0', text: '#000000' },
        footer: '#04109e',
        footerIcon: '#FFFFFF',
        search: '#012979',
        text: { header: '#FFFFFF', footer: '#FFFFFF' },
        title: '#000000',
        badge: { bg: '#012979', text: '#FFFFFF', icon: '#FFFFFF' },
        bot: { bg: '#012979', color: '#FFFFFF' },
        contact: { bg: '#012979', icon: '#FFFFFF', text: '#FFFFFF' },
        logo: 'tracfoneLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#012979', text: '#012979' },
        primary: '#012979',
        favicon: 'tf.ico',
      }
    case 'safelink':
      return {
        header: '#FFFFFF',
        headerHelmet: { bg: '#F0F0F0', text: '#000000' },
        footer: '#F0F0F0',
        footerIcon: '#FDBB30',
        search: '#FDBB30',
        text: { header: '#000000', footer: '#000000' },
        title: '#000000',
        badge: { bg: '#FDBB30', text: '#000000', icon: '#FFFFFF' },
        bot: { bg: '#FDBB30', color: '#FFFFFF' },
        contact: { bg: '#F0F0F0', icon: '#FDBB30', text: '#000000' },
        logo: 'safeLinkLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#FDBB30', text: '#FDBB30' },
        primary: '#FDBB30',
        favicon: 'sf.ico',
      }
    default:
      return {
        header: '#FFFFFF',
        headerHelmet: { bg: '#FFFFFF', text: '#000000' },
        footer: '#FFFFFF',
        footerIcon: '#000000',
        search: '#000000',
        text: { header: '#000000', footer: '#000000' },
        title: '#000000',
        badge: { bg: '#F0F0F0', text: '#000000', icon: '#000000' },
        bot: { bg: '#D52B1E', color: '#FFFFFF' },
        contact: { bg: '#F0F0F0', icon: '#000000', text: '#000000' },
        logo: 'totalLogo.png',
        categoryFaq: { bg: '#FFFFFF', border: '#000000', text: '#000000' },
        primary: '#000000',
        favicon: 'tbv.svg',
      }
  }
}
