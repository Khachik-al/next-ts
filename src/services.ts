import { Language } from './content/locale.interface'
import { PhoneInfo } from './content/models.interface'

interface AsyncGetItems {
  headers: { [key: string]: string }
  URL: string
}

const getDataItems = async ({ headers, URL }: AsyncGetItems) => {
  const res = await fetch(URL, {
    headers,
  })
  if (res.status === 200) {
    const list = await res.json()
    return list
  }
  return null
}

export const getSwimlane = ({
  customer,
  count,
  language,
}: {
  customer: string
  count: number
  language: string
}) => {
  const headers = {
    Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
    'x-api-key': `${process.env.NEXT_API_KEY}`,
  }
  return getDataItems({
    headers,
    URL: `${process.env.swimlane}/v1/swimlane?language=${
      language === 'en' ? 1 : 3
    }&phone=${process.env.commonTopicsProductId}&customer=${customer}&count=${count}`,
  })
}

export const getProducts = async ({
  language,
  customer,
}: {
  language: Language | string
  customer: string
}): Promise<PhoneInfo[]> => {
  const headers = {
    Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
  }
  const list = await getDataItems({
    headers,
    URL: `${process.env.contentBase}/v1/phones?language=${
      language === 'en' ? 1 : 3
    }&customer=${customer}`,
  })
  return list?.filter(
    (elem: PhoneInfo) => !elem.name.toLowerCase().includes('general'),
  )
}

export const getPhone = ({
  deviceRef,
  customer,
}: {
  deviceRef: string
  customer: string
}) => {
  const headers = {
    Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
  }
  return getDataItems({
    headers,
    URL: `${process.env.productInfoBase}/deviceinfo?deviceRef=${deviceRef}&customer=${customer}`,
  })
}

export const getTutorialList = ({
  deviceRef,
  customer,
}: {
  deviceRef: string
  customer: string
}) => {
  const headers = {
    Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
  }
  return getDataItems({
    headers,
    URL: `${process.env.productInfoBase}/deviceinfo?deviceRef=${deviceRef}&customer=${customer}`,
  })
}

export const getContent = ({
  phoneId,
  language,
  customer,
  type,
}: {
  phoneId: string
  language: string
  customer: string
  type: string
}) => {
  const headers = {
    Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
  }
  return getDataItems({
    headers,
    URL: `${process.env.contentBase}/v1/${type}?language=${
      language === 'en' ? 1 : 3
    }&phoneId=${phoneId}&customer=${customer}`,
  })
}

export const getContentByProduct = async ({
  phoneId,
  language,
  type,
  customer,
}: {
  phoneId: string
  language: string
  type?: 'faqs' | 'tutorials',
  customer: string
}) => {
  let r = {}
  if (type === 'faqs' || !type) {
    const { faqs } = await getContent({
      customer: `${customer}`,
      language: language,
      phoneId,
      type: 'faqs',
    })
    r = { ...r, faqs }
  }
  if (type === 'tutorials' || !type) {
    const { tutorials } = await getContent({
      customer: `${customer}`,
      language: language,
      phoneId,
      type: 'tutorials',
    })
    r = { ...r, tutorials }
  }
  return r
}

export const getContentByRef = async (
  { ref, language, type, customer }: { ref: string, language: string, type?: 'faqs' | 'tutorials', customer: string },
) => {
  const phoneData = await getPhone({
    deviceRef: ref,
    customer: customer,
  })
  const phoneId = phoneData.phone.pk
  const content = await getContentByProduct({
    customer,
    phoneId,
    language,
    type,
  })
  return { content, phoneData }
}

export const getFooterItems = async (language: string | undefined, link: string) => {
  const res = await fetch(
    `${link}/${language}/footer.model.json`,
  )
  const list = await res.json()
  return list
}

export const getHeaderItems = async (language: string | undefined, link: string) => {
  const res = await fetch(
    `${link}/${language}/header.model.json`,
  )
  const list = await res.json()
  return list
}

export const getTutorialById = async ({
  customer,
  tutorialId,
  language,
}: {
  customer: string
  tutorialId: string
  language: string
}) => {
  const headers = {
    Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
    'x-api-key': `${process.env.NEXT_API_KEY}`,
  }
  const data = await getDataItems({
    headers,
    URL: `${process.env.contentBase}/v1/tutorialsteps?language=${
      language === 'en' ? 1 : 3
    }&tutorialId=${tutorialId}&customer=${customer}`,
  })
  return data
}

export const getPopularFaqs = ({ count } : { count: number }) => {
  const headers = {
    'x-api-key': `${process.env.NEXT_API_KEY}`,
  }
  return getDataItems({
    headers,
    URL: `${process.env.popularFaqsBase}/v1/top?type=faq&customer=totalwireless&count=${count}&phone=TWaccounthelp`,
  })
}

export const typeahead = async (searchQuery: string, locale: Language, customer: string) => {
  const language = locale === 'en' ? 1 : 3
  const response = await fetch(`${process.env.searchTypeaheadBase}/${customer}/_search`, {
    method: 'POST',
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
    },
    body: JSON.stringify({
      size: 0,
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: searchQuery,
                fields: [
                  'phrase_starts_with_language_11.75',
                  'heading_bigrams_1',
                  'term_starts_with_language_1',
                ],
                minimum_should_match: '4<-85% 6<-95%',
              },
            },
          ],
          filter: {
            bool: {
              must: [{ term: { language } }, { term: { deleted: 0 } }],
            },
          },
        },
      },
      aggs: {
        headings: {
          terms: {
            field: `suggestion_language_${language}`,
            order: { max_score: 'desc' },
          },
          aggs: {
            max_score: {
              max: { script: { lang: 'painless', inline: '_score' } },
            },
          },
        },
      },
    }),
  })
  const content = await response.json()
  const contentArray: { key: string }[] =
    content?.aggregations?.headings?.buckets

  return contentArray?.filter(
    (el, i, arr) => i === arr.findIndex((item) => item.key === el.key),
  )
}

export const search = async ({ searchQuery, language, customer } : { searchQuery: string, language: Language, customer: string }) => {
  const locale = language === 'en' ? 1 : 3
  const response = await fetch(`${process.env.searchBase}/${customer}/_msearch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}`,
    },
    body: `{"preference":"SearchResult"}
{"query":{"bool":{"must":[{"bool":{"must":[{"bool":{"disable_coord":true,"should":[{"function_score":{"query":{"bool":{"should":[{"constant_score":{"filter":{"match":{"classification_language_${locale}":"${searchQuery}"}},"boost":3}},{"function_score":{"query":{"match_phrase":{"heading_language_${locale}":"${searchQuery}"}},"boost":2}},{"match":{"device":"${searchQuery}"}}]}},"boost":12}},{"term":{"device":"general"}},{"query_string":{"query":"${searchQuery}","default_field":"heading_language_${locale}","minimum_should_match":"95%","boost":6}},{"query_string":{"query":"${searchQuery}","default_field":"heading_language_${locale}","minimum_should_match":"2","boost":4}},{"query_string":{"query":"${searchQuery}","default_field":"heading_language_${locale}","boost":2}}],"must":[{"match":{"all_content_language_${locale}":{"query":"${searchQuery}","minimum_should_match":"3<-75% 9<-85%"}}}],"filter":{"bool":{"should":[],"must":[{"term":{"language":${locale}}},{"term":{"deleted":0}}]}}}}]}}]}},"collapse":{"field":"pk"},"stored_fields":["heading_language_${locale}","description_language_${locale}"],"highlight":{"fields":{"heading_language_${locale}":{"number_of_fragments":0},"description_language_${locale}":{"highlight_query":{"match":{"description_language_${locale}":"${searchQuery}"}}}}},"size":10,"_source":{"includes":["*"],"excludes":[]},"from":0}
`,
  })
  const res = await response.json()
  return res
}

export const openCloseChat = (value: 'show' | 'hide' ) => {
  if (typeof window !== 'undefined') {
    window?.botpressWebChat?.sendEvent({ type: value })
  }
}

export const getUserIp = async () => {
  const res = await fetch('https://api.ipify.org?&callback=getIP')
  const ip = await res.text()
  return ip
}

