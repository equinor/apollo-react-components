import { Icon } from '@equinor/eds-core-react'
import { error_filled, warning_filled } from '@equinor/eds-icons'
import { GetHelperTextProps, GetHelperTextPropsProps } from './types'

export const WARNING_PREFIX = 'WARNING'

export function getHelperTextProps({
  error,
  warning,
  helperText,
}: GetHelperTextPropsProps): GetHelperTextProps {
  if (error) {
    if (error.message?.startsWith(WARNING_PREFIX)) {
      return {
        variant: 'warning',
        helperText: error.message.substring(WARNING_PREFIX.length),
        helperIcon: <Icon data={warning_filled} size={16} />,
      }
    }
    return {
      variant: 'error',
      helperText: error.message,
      helperIcon: <Icon data={error_filled} size={16} />,
    }
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
