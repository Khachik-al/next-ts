import { AppProps } from 'next/app'
import { createContext, ReactNode, useState } from 'react'
import { customersObj } from '../../customer-config'
import { isCustomer } from '../customer.interface'


const defaultCustomer = process.env.customer
if (!isCustomer(defaultCustomer)) throw new Error(`unsupported customer '${defaultCustomer}'`)

const defaultCtx = customersObj[defaultCustomer]

const defaultConfSetCtx = {
  config: customersObj[defaultCustomer],
  setCustomer: (_: string): void => { throw new Error(`default ctx doesnt set customer ${_}`) },
}

const getCustomerConfig = (c: string) => {
  if (!isCustomer(c)) {
    throw new Error(`unsupported customer requested ${c}`)
  }
  return customersObj[c]
}


export const ConfCtx = createContext(defaultCtx)

export const ConfSetCtx = createContext(defaultConfSetCtx)

export const ConfSetCtxProvider: React.FC<{ children: ReactNode }> =
  ({ children }) => {

    const [config, setConfig] = useState(getCustomerConfig(defaultCustomer))
    const [confSet, setConfSet] = useState({
      config,
      setCustomer: (c: string) => {
        const conf = { ...getCustomerConfig(c) }
        setConfig(conf)
        setConfSet({  ...confSet, config: conf })
      },
    })


    return (
      <ConfSetCtx.Provider value={confSet}>
        <ConfCtx.Provider value={confSet.config}>
          {children}
        </ConfCtx.Provider>
      </ConfSetCtx.Provider>
    )
  }

export const withConf = <Props extends AppProps = AppProps>
  (WrappedComponent: React.ComponentType<Props>) => {
  const WithConf = (props: Props) => (
    <ConfSetCtxProvider>
      <WrappedComponent {...props} />
    </ConfSetCtxProvider>
  )
  return WithConf
}
