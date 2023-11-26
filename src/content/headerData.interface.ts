import { Language } from './locale.interface'

export interface LanguageNavigationItems {
  active: boolean
  children: []
  country: string
  description: string
  language: Language
  lastModified: number
  level: number
  locale: Language
  path: string
  title: string
  url: string
}

interface Links {
  linkText: string
  linkUrl: string
  linkAltText: string
  doNotFollowLink: string
}

interface ChildrenItem extends Item {}

export interface Item {
  title: string
  flyoutHeader: string
  children: { url: string, title: string, children: ChildrenItem[] }[]
  url: string
  quickLinksHeading: string
  quickLinks: { ctaText: string, ctaPath: string }[]
}

export interface HeaderData {
  brandName: string
  cartIconUrl: string
  countOfTopKeywords: string
  doNotFollow: string
  durationInDays: string
  fileReference: string
  fileReferenceDeskSm: string
  fileReferenceMobile: string
  items: {
    navigation: {
      item: Item[],
      navigationLinks: [
        { linkUrl: string; linkAltText: string; linkText: string }, 
      ]
    }
    languagenavigation: {
      items: LanguageNavigationItems[]
    }
  }
  links: Links[] | []
}
