export type DefaultConf = {
  appId: string
  sessionId: string
  customer: string
  brand: string
  ip: string
}

export type TupleArr = {
  eventData: EventData
  eventName: string
}

type EventData = {
  app_instance_id: string
  session_id: number
  page_url: string
  user_agent: string
  brand: string
  customer: string
  app_instance_time: string
  page_title: string
}
