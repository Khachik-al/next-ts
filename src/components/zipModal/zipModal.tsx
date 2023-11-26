import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import Image from 'next/image'
import { exportableLoader } from '../../image-loader'
import { useState } from 'react'
import { ZipData } from '../../content/zipData.interface'
import Check from '/public/assets/success.svg'

type ZipModalList = {
  isOpen: boolean
  onClose: () => void
  data: ZipData
}

export const ZipModal = ({ isOpen, onClose, data }: ZipModalList) => {
  const [isChecked, setIsChecked] = useState(false)

  const setNumber = ({ target }: { target: HTMLInputElement }) => {
    setIsChecked(false)
    if (target.value.length === 6) {
      setIsChecked(true)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay alignItems={'center'} />
      <ModalContent borderRadius={0}>
        <ModalHeader fontSize={'3xl'} fontWeight={700}>
          {data.locationtext}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {data.locationdesc}
          <FormControl pt={5}>
            <FormLabel fontSize={'sm'} fontWeight={400}>
              {data.locationlabel}
            </FormLabel>
            <InputGroup>
              <Input
                pos={'relative'}
                borderRadius={0}
                borderBottom={'1px solid #000'}
                height={42}
                width={234}
                focusBorderColor={'black.200'}
                maxLength={6}
                type={'number'}
                onChange={setNumber}
              />
              {isChecked && (
                <InputRightElement
                  pos={'absolute'}
                  right={165}
                >
                  <Image
                    unoptimized
                    loader={exportableLoader}
                    alt='Check'
                    src={Check}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter pt={8} justifyContent={'center'}>
          <Button
            variant={'zipModalButton'}
            onClick={onClose}
            isDisabled={!isChecked}
          >
            Enter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
