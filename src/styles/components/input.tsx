import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'
import defaultTheme from '@chakra-ui/theme'

export const Input: ComponentStyleConfig = {
  variants: {
    'outline': (props: StyleFunctionProps) => ({
      ...defaultTheme.components.Input.variants.outline(props),
      field: {
        ...defaultTheme.components.Input.variants.outline(props).field,
        _placeholder: { color: 'gray.500' },
      },
    }),
  },
  defaultProps: {
    variant: 'outline',
  },
}
