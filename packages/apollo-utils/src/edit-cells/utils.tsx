import { Icon } from '@equinor/eds-core-react'
import { Variants } from '@equinor/eds-core-react/dist/types/components/types'
import { error_filled, warning_filled } from '@equinor/eds-icons'

interface GetHelperTextPropsProps {
  error?: { message?: string }
  warning?: { message: string }
  helperText?: string
}

interface GetHelperTextProps {
  variant?: Variants
  helperText?: string
  helperIcon: JSX.Element | null
}

export function getHelperTextProps({
  error,
  warning,
  helperText,
}: GetHelperTextPropsProps): GetHelperTextProps {
  if (error)
    return {
      variant: 'error',
      helperText: error.message,
      helperIcon: <Icon data={error_filled} size={16} />,
    }

  if (warning)
    return {
      variant: 'warning',
      helperText: warning.message,
      helperIcon: <Icon data={warning_filled} size={16} />,
    }

  return {
    helperText,
    helperIcon: null,
  }
}
