import languageDetector from '../../lib/languageDetector.js'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/react'

const LanguageSwitchLink = ({ locale, ...rest }) => {
  const router = useRouter()

  let href = rest.href || router.asPath
  let pName = router.pathname
  Object.keys(router.query).forEach((k) => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale)
      return
    }
    pName = pName.replace(`[${k}]`, router.query[k])
  })
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}/` : `${pName}/`
  }

  return (
    <Link href={href} onClick={() => languageDetector.cache(locale)}>
      {locale === 'en' ? 'English' : 'Español'}
    </Link>
  )
}

export default LanguageSwitchLink
