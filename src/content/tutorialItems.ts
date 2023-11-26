import { TutorialItems } from './tutorialItems.interface'

export const tutorialItems: TutorialItems[] = [
  {
    name: 'Getting Started',
    children: [
      { name: 'Setting up your new phone' },
      { name: 'Transfering your Contacts' },
      { name: 'Insert sim card' },
      { name: 'Setup wireless internet' },
      { name: 'Setup mobile data' },
      { name: 'Setup payments' },
    ],
  },
  {
    name: 'Troubleshooting',
    children: [
      { name: 'Connecting to Wi-fi' },
      { name: 'Using mobile data' },
      { name: 'Setting up apple ID' },
      { name: 'Downloading applications' },
      { name: 'Using cloud services' },
      { name: 'Forgot passcode' },
    ],
  },
  {
    name: 'Using Your Phone',
    children: [
      { name: 'Browsing the web' },
      { name: 'Downloading applications' },
      { name: 'Paying with your phone' },
      { name: 'Uploading images to the cloud' },
      { name: 'Protect your phone' },
      { name: 'Using social media' },
    ],
  },
  {
    name: 'Mobile Data',
    children: [
      { name: 'Downloading applications' },
      { name: 'Mobile data rates' },
      { name: 'Using mobile data' },
      { name: 'Cannot connect to the internet' },
      { name: 'Internet speed slow?' },
      { name: 'List Item 1' },
    ],
  },
]
