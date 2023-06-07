import { Variants } from '@equinor/eds-core-react/dist/types/components/types'

export interface GetHelperTextPropsProps {
  error?: { message?: string }
  warning?: { message: string }
  helperText?: string
}

export interface GetHelperTextProps {
  variant?: Variants
  helperText?: string
  helperIcon: JSX.Element | null
}
