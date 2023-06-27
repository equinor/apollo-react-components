import { Variants } from '@equinor/eds-core-react/dist/types/components/types'
import { CellContext } from '@tanstack/react-table'
import { FieldError } from 'react-hook-form'
import { FormMeta } from '../form-meta'

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

export interface EditableCellBaseProps<T extends FormMeta, Value> extends CellContext<T, Value> {
  /**
   * FieldError object used to overwrite react-hook-form validation result. It is prioritized over react-hook-form's validation. If prefixed with the exported `WARNING_PREFIX` it will be displayed as an warning.
   */
  error?: FieldError
  /**
   * Custom `onChange` called on input change after react-hook-form's `onChange`. E.g. used to trigger actions on change.
   */
  onChange?: (value: Value) => void
}
