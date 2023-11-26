import { Customer } from '../customer.interface'
import { HomePageNav } from './homePageNav.interface'

export const homePageNav = (retailer: Customer): HomePageNav[] => [
  {
    title: 'phoneModel',
    desc: 'phoneModelText',
    path: 'brands',
    type: 'phones',
  },
  {
    title: 'browseFaq',
    desc: `browseFaqText.${retailer}`,
    path: 'topics',
    type: 'faq',
  },
  {
    title: 'needHelp',
    desc: 'needHelpText',
    path: 'brands',
    type: 'chat',
  },
]
