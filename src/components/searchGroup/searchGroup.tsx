import {
  Button,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { KeyboardEventHandler, useState } from 'react'
import Search from '../../../public/assets/search-normal.svg'
import { exportableLoader } from '../../image-loader'

type SearchGroupParams = {
  iconWidth: string | number
  height: string | number
  placeholder?: string
  containerWidth?: number | (number | string)[]
  font: string | number
  searchHandle: (e: string) => void
  onKeyPress?: KeyboardEventHandler<HTMLInputElement> | undefined
  onSearchIconClick?: () => void
  searchValue?: string | undefined
}

export const SearchGroup = ({
  iconWidth,
  height,
  placeholder,
  containerWidth,
  font,
  searchHandle,
  onKeyPress,
  onSearchIconClick,
  searchValue,
}: SearchGroupParams) => {
  const [value, setValue] = useState('')
  
  return (
    <Flex justify='center' w='full'>
      <InputGroup
        pr={0}
        borderColor='gray.200'
        w={containerWidth ?? [333, 333, 450, 552]}
      >
        <InputRightElement
          as='div'
          h={height}
          w={Number(iconWidth) + Number(iconWidth)}
        >
          <Flex justify='center' align='center' h={Number(height) - 2} w={iconWidth}
          bg='mainWhite'>
            <CloseButton
              size='sm'
              onClick={() => {
                setValue('')
                searchHandle('')
              }}
              _focus={{ boxShadow: '0 0 0 0.5px lightgrey' }}
            />
          </Flex>
          <Button h={height} w={iconWidth} variant='inputSearchButton' onClick={onSearchIconClick}>
            <Image
              unoptimized
              loader={exportableLoader}
              alt='search'
              src={Search}
              width={20.5}
              height={20.5}
            />
          </Button>
        </InputRightElement>
        <Input
          rounded={0}
          h={height}
          fontSize={[14, 16, font]}
          placeholder={placeholder}
          value={searchValue ?? value}
          onChange={(e) => {
            const v = e.target.value
            setValue(v)
            searchHandle(v)
          }}
          onKeyPress={onKeyPress}
        />
      </InputGroup>
    </Flex>
  )
}
