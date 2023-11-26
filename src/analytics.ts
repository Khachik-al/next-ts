import { v4 as uuidv4 } from 'uuid'
import { DefaultConf, TupleArr } from './content/analytics.interface.js'
import debounce from './lib/debounceAndAttachBrowserInfo.js'

const isClient = typeof window !== 'undefined'

const appStartTime = new Date()

const initAnalyticsIdentifiers = (localStorage: Storage | false) => {
  if (isClient && localStorage) {
    let instId = localStorage.getItem('appInstanceId')
    let userId = localStorage.getItem('userId')

    if (!instId) {
      instId = uuidv4()
      localStorage.setItem('appInstanceId', instId)
    }

    if (!userId) {
      userId = uuidv4()
      localStorage.setItem('userId', userId)
    }
    const sessionId = uuidv4()
    return { instId, userId, sessionId }
  }
}

export const ids = initAnalyticsIdentifiers(isClient && localStorage)

export const getDefaultBrowserConfig = ({
  appId,
  sessionId,
  brand,
  customer,
  ip,
}: DefaultConf) => ({
  app_instance_id: appId,
  app_instance_time: new Date().valueOf() - appStartTime.valueOf(),
  page_url: isClient && window.location.href,
  user_agent: isClient && navigator.userAgent,
  timestamp: (new Date()).toISOString(),
  session_id: sessionId,
  permanent_id: ids?.userId,
  ip_address: ip,
  customer,
  brand,
})

const payloadToSend = async (tupleArr: TupleArr[]) => {
  fetch(`${process.env.analytics}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(tupleArr),
  })
}

export const postAnalytics = debounce(payloadToSend, 5000)
