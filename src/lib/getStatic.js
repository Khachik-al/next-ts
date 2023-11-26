import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../../next-i18next.config.js'

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }))

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
})

export async function getI18nProps(ctx, ns = ['header']) {
  const locale = ctx?.params?.locale
  let props = {
    ...(await serverSideTranslations(locale, ns)),
  }
  return props
}

export const makeStaticProps = (ns, callback) => async (ctx) => {
  if (callback) {
    const data = await callback(ctx)
    const i18nProps = await getI18nProps(ctx, ns)
    return {
      props: { ...data.props, ...i18nProps },
    }
  }

  return {
    props: await getI18nProps(ctx, ns),
  }
}
