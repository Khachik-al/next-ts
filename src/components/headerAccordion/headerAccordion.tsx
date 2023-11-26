import { useRef } from 'react'
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useOutsideClick,
} from '@chakra-ui/react'

interface HeaderAccordionInterface {
  onHandleToggleAccordion: (index: number) => void
  collapsedAccordion: { index: number; isCollapsed: boolean }
  children: React.ReactNode
  panelRef: any
  title: string
  index: number
}

export const HeaderAccordion = ({
  onHandleToggleAccordion,
  collapsedAccordion,
  children,
  panelRef,
  title,
  index,
}: HeaderAccordionInterface) => {
  const ref = useRef(null)
  const isShop = index === 0

  useOutsideClick({
    ref: panelRef,
    enabled: document.documentElement.offsetWidth > 990,
    handler: () => onHandleToggleAccordion(-1),
  })

  return (
    <Accordion
      allowToggle
      index={
        !collapsedAccordion.isCollapsed && collapsedAccordion.index === index
          ? 0
          : -1
      }
    >
      <AccordionItem border='none' p={0} position={'relative'}>
        {({ isExpanded }: { isExpanded: boolean }) => (
          <>
            <AccordionButton
              onClick={() => onHandleToggleAccordion(index)}
              _hover={{
                background: 'none',
                textDecoration: 'underline',
              }}
              _expanded={{ border: '1px', borderColor: 'text.header' }}
              py={0}
              px={3}
              ref={ref}
            >
              <Text
                variant={
                  isExpanded
                    ? 'activeAccordionButton'
                    : 'inactiveAccordionButton'
                }
              >
                {title}
              </Text>
            </AccordionButton>
            <AccordionPanel
              boxShadow={'1px 10px 15px 1px #b8b8b8'}
              width={isShop ? ['90vw', '90vw', '85vw', '78vw', '67vw'] : 'auto'}
              backgroundColor={'gray.100'}
              left={isShop ? -200 : -83}
              position={'absolute'}
              ml={'auto'}
              mr={'auto'}
              top={53}
              textColor={'black'}
            >
              {children}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
