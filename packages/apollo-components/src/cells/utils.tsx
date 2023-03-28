import { Icon } from '@equinor/eds-core-react'
import { Variants } from '@equinor/eds-core-react/dist/types/components/types'
import { error_filled, warning_filled } from '@equinor/eds-icons'
import { SyntheticEvent } from 'react'
import { FieldError } from 'react-hook-form'

/**
 * Generate a HSL color based on a given string.
 *
 * @param str - Any given string
 * @returns A valid hsl color
 */
export function stringToHslColor(str: string, s = 80, l = 85) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}

/** Wrap an event handler and stop event propagation */
export function stopPropagation<T extends HTMLElement>(handler: (e: SyntheticEvent<T>) => void) {
  return (e: SyntheticEvent<T>) => {
    e.stopPropagation()
    handler(e)
  }
}

interface GetHelperTextPropsProps {
  error?: FieldError
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
