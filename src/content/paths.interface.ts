import { Language } from './locale.interface'

export interface Paths {
  params: {
    id: string
    locale: Language | string
    phone?: string
    tutorial?: string | undefined
  }
  length?: number | undefined
}
