import { Autocomplete } from '@equinor/eds-core-react'
import { Controller } from 'react-hook-form'
import { TypographyCustom } from '../cells'
import { FormMeta, useEditMode } from '../form-meta'
import { HelperText } from './FormHelperText'
import { EditableCellBaseProps } from './types'
import { getHelperTextProps } from './utils'

export interface Option {
  label: string
  value: string
}

export interface EditableDropdownSingleCellProps<T extends FormMeta>
  extends Omit<EditableCellBaseProps<T, unknown>, 'onChange'> {
  /**
   * `Option.value` is used internally to get and update selection state. `Option.label` is *only* for visual purposes.
   */
  options: Option[]
  onChange?: (value: Option) => void
}

function buildEmptyOption(): Option {
  return { label: '', value: '' }
}

export function EditableDropdownSingleCell<T extends FormMeta>({
  options,
  error: errorFromProps,
  onChange: onChangeFromProps,
  ...context
}: EditableDropdownSingleCellProps<T>) {
  const editMode = useEditMode()

  if (!editMode) return <TypographyCustom truncate>{context.getValue() as any}</TypographyCustom>

  return (
    <Controller
      name={context.column.id}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
        const selectedOption =
          options.find((option) => option.value === value) ?? buildEmptyOption()
        return (
          <>
            <Autocomplete
              label=""
              // Casting is due to stying the Autocomplete, plain EDS Autocomplete works
              // Fixed when workaround is not needed anymore
              selectedOptions={selectedOption && [selectedOption]}
              options={options}
              optionLabel={(option) => option?.label ?? ''}
              aria-required
              hideClearButton
              aria-autocomplete="none"
              onOptionsChange={(changes) => {
                const [change] = changes.selectedItems
                onChange(change?.value)
                onChangeFromProps?.(change)
              }}
              {...field}
            />
            <HelperText {...getHelperTextProps({ error: errorFromProps ?? error })} />
          </>
        )
      }}
    />
  )
}
