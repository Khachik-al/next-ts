import { Flex, Select, Text } from '@chakra-ui/react'
import React from 'react'
import sortingData from '../../content/select.json'

export const SortSelect = () => {
  return (
    <Flex align='center' ml={48}>
      <Text whiteSpace='nowrap'>Sort by:</Text>
      <Select variant='unstyled' placeholder='Release Year (Newest to Oldest)'>
        {sortingData.selectData.map((el, i) => (
          <option color='gray.500' key={i} value={el}>
            {el}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
