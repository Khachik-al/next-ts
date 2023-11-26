import {
  Button,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { postAnalytics } from '../../analytics'

export const HelpfulContent = ({ step }: { step: number | undefined }) => {
  const { t } = useTranslation('common')
  const [isPositive, setIsPositive] = useState(true)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const sendAnalyticsData = (type: 'posit' | 'negat') => {
    if (type === 'posit') {
      setIsPositive(true)
      onOpen()
      postAnalytics(
        step
          ? {
            data: {
              event_category: 'tutorials',
              feedback_helpful: 'posit',
              step: step + 1,
            },
            category: 'tutorials',
          }
          : {
            data: {
              event_category: 'landing',
              feedback_helpful: 'posit',
            },
            category: 'landing',
          },
      )
    }

    if (type === 'negat') {
      setIsPositive(false)
      onOpen()
      postAnalytics(
        step
          ? {
            data: {
              event_category: 'tutorials',
              feedback_helpful: 'negat',
              step: step + 1,
            },
            category: 'tutorials',
          }
          : {
            data: {
              event_category: 'landing',
              feedback_helpful: 'negat',
            },
            category: 'landing',
          },
      )
    }
  }

  return (
    <Container mt={5} p={0} py={6} borderTop={'1px'} borderBottom={'1px'} borderColor={'gray.200'}>
      <Flex alignItems={'center'}>
        <Heading variant='helpful'>{t('helpful')}</Heading>
        <Flex>
          <Button onClick={() => sendAnalyticsData('posit')} variant='helpful'>
            {t('positive')}
          </Button>
          <Button onClick={() => sendAnalyticsData('negat')} variant='helpful'>
            No
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay alignItems={'center'} />
        <ModalContent>
          <ModalHeader>{isPositive ? t('issueResolved') : t('issueNotResolved')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody borderY={'1px'} borderColor={'gray.100'}>
            {isPositive ? t('glad') : t('pleaseContactSupport')}
          </ModalBody>
          <ModalFooter pt={8} justifyContent={'center'}>
            <Button onClick={onClose} variant={'zipModalButton'}>
              {t('close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}
