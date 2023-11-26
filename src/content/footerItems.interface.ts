export interface FooterItems {
  footerItems1:
  | [
    {
      linkText: string
      linkUrl: string
    },
  ]
  | []
  footerItems2:
  | [
    {
      linkText: string
      linkUrl: string
    },
  ]
  | []
  shopLinks:
  | [
    {
      linkText: string
      linkUrl: string
    },
  ]
  | []
  currentCustomers:
  | [
    {
      linkText: string
      linkUrl: string
    },
  ]
  | []
  support: {
    linkText: string
    linkUrl: string
    onClick?: () => void
    withoutBlank: boolean
  }[]
  aboutTracfone:
  | [
    {
      linkText: string
      linkUrl: string
    },
  ]
  | []
  footerInc: {
    text: string
  }
  checkBalance: {
    [key: string]: {
      text: string
    }
  }
}
