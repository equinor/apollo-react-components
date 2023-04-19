import { Autocomplete } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Controller, useFormContext } from 'react-hook-form'
import { TypographyCustom } from '../cells'
import { FormMeta, useEditMode } from '../form-meta'

export interface Option {
  label: string
  value: string
}

export interface EditableDropdownSingleCellProps<T extends FormMeta>
  extends CellContext<T, unknown> {
  /**
   * `Option.value` is used internally to get and update selection state. `Option.label` is *only* for visual purposes.
   */
  options: Option[]
}

function buildEmptyOption(): Option {
  return { label: '', value: '' }
}

export function EditableDropdownSingleCell<T extends FormMeta>(
  props: EditableDropdownSingleCellProps<T>
) {
  const { options, ...context } = props
  const editMode = useEditMode()
  const { control } = useFormContext()
  if (!editMode) return <TypographyCustom truncate>{context.getValue() as any}</TypographyCustom>

  return (
    <Controller
      control={control}
      name={context.column.id}
      render={({ field: { value, onChange, ...field } }) => {
        const selectedOption =
          options.find((option) => option.value === value) ?? buildEmptyOption()
        return (
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
            }}
            {...field}
          />
        )
      }}
    />
  )
}
