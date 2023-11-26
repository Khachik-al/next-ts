import { Flex } from '@chakra-ui/react'
import React from 'react'
import { SearchItem } from '../../content/searchItems.interface'
import { CustomModal } from '../search/modal'
import { SearchGroup } from './searchGroup'

interface SearchGroupInterface {
  width: number
  height: number
  placeholder: string
  containerWidth: number
  font: string
  searchHandle: (e: string) => void
  value?: string
  searchClick?: () => void
  openModal: (open: () => void) => void
  searchItems: SearchItem[]
  isSelected: boolean
  msearchHandle: () => void
  findedItems: Array<{ key: string }>
  setSearchQuery: (letter: string) => void
  searchStatus: 'init' | 'pending' | 'done'
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
}

export const SearchIndexPage = ({
  width,
  height,
  placeholder,
  containerWidth,
  font,
  searchHandle,
  value,
  searchClick,
  openModal,
  searchItems,
  isSelected,
  msearchHandle,
  findedItems,
  setSearchQuery,
  searchStatus,
  disclosure,
}: SearchGroupInterface) => {
  return (
    <Flex justify='center'>
      {openModal ? (
        <CustomModal
          disclosure={disclosure}
          height={height}
          width={width}
          searchItems={searchItems}
          modalOpen={openModal}
          isSelected={isSelected}
          searchHandle={searchHandle}
          value={value}
          msearchHandle={msearchHandle}
          findedItems={findedItems}
          setSearchQuery={setSearchQuery}
          font={font}
          containerWidth={containerWidth}
          placeholder={placeholder}
          searchStatus={searchStatus}
        />
      ) : (
        <SearchGroup
          iconWidth={height}
          height={height}
          font={font}
          searchHandle={(val) => searchHandle(val)}
          searchValue={value}
          containerWidth={[300, 350, containerWidth]}
          onSearchIconClick={searchClick}
          placeholder={placeholder}
        />
      )}
    </Flex>
  )
}
