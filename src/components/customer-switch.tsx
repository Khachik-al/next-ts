import { useContext, useMemo, useState } from 'react'
import { ConfSetCtx } from '../../src/context/conf'
import { Button, Flex, Select } from '@chakra-ui/react'
import { supportedCustomers } from '../../src/customer.interface'
import { useRouter } from 'next/router'

export const CustomerSwitcher = () => {
  const { query } = useRouter()
  const [visible, setVisible] = useState(true)
  const { setCustomer } = useContext(ConfSetCtx)

  const allowed = useMemo(() => (
    process.env.NODE_ENV === 'development'
  ), [process.env.NODE_ENV, query, query.preview_options])
  if (!allowed || !visible) return null

  return (
    <>
      <Flex>
      <Button onClick={() => setVisible(!visible)}>hide</Button>
      <Select onChange={(e) => setCustomer(e.target.value)}>
        {supportedCustomers.map(c => <option value={c} key={c}>{c}</option>)}
      </Select>
      </Flex>
    </>
  )
}
