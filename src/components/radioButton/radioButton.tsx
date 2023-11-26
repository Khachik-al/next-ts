import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const RadioButton = ({
  text,
  value,
  selectFilteredSearchNavbar,
  removeFilter,
}: {
  text: string
  value: string | null
  selectFilteredSearchNavbar: () => void
  removeFilter: () => void
}) => {
  const handleClick = () => {
    if (value) {
      return removeFilter()
    } else {
      selectFilteredSearchNavbar()
      return
    }
  }
  return (
    <Flex
      gap={2}
      align='center'
      justify='flex-start'
      cursor='pointer'
      onClick={handleClick}
    >
      {text === value ? (
        <Box
          border='2px solid gray'
          width={4}
          minW={4}
          height={4}
          borderRadius='50%'
          bg='blue.500'
        />
      ) : (
        <Box
          border='2px solid gray'
          width={4}
          minW={4}
          height={4}
          borderRadius='50%'
        />
      )}
      <Text>{text}</Text>
    </Flex>
  )
}
