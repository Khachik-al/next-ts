export interface Topics {
  generalFaqs: Array<{
    name: string
    icon: string
    children: Array<{
      name: string
      children: Array<{ name: string; val: string }>
    }>
  }>
}
