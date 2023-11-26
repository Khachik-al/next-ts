export const useAnalyticsPathParam = () => {
  const ARR = ['faq', 'tutorial', 'knowledgeBase']

  let pagePath

  const getPagePath = () => {
    const path =
      typeof window !== 'undefined' ? location.pathname.split('/') : ''

    if (ARR.some((i) => path.includes(i))) {
      return path[5]
    }

    if (path[4]) {
      return 'phone'
    }

    if (path.includes('brands')) {
      return path[2]
    }

    return 'homepage'
  }

  pagePath = getPagePath()

  return pagePath
}
