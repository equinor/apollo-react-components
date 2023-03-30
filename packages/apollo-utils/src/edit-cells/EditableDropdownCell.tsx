import { TypographyCustom } from '@equinor/apollo-components'
import { Autocomplete } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { FormMeta, useEditMode } from '../form-meta'

export interface Option {
  label: string
  value: string
}

export interface EditableDropdownCellProps<T extends FormMeta> extends CellContext<T, unknown> {
  /**
   * `Option.value` is used internally to get and update selection state. `Option.label` is *only* for visual purposes.
   */
  options: Option[]
}

function buildEmptyOption(): Option {
  return { label: '', value: '' }
}

export function EditableDropdownCell<T extends FormMeta>(props: EditableDropdownCellProps<T>) {
  const { options, ...context } = props
  const editMode = useEditMode()
  const { control } = useFormContext()
  if (!editMode) return <TypographyCustom truncate>{context.getValue() as any}</TypographyCustom>

  return (
    <Controller
      control={control}
      name={context.column.id}
      render={({ field: { value, onChange, ...field } }) => {
        const selectedOption = options.find((option) => option.value === value) ?? buildEmptyOption
        return (
          <AutocompleteCustom
            label=""
            // Casting is due to stying the Autocomplete, plain EDS Autocomplete works
            // Fixed when workaround is not needed anymore
            selectedOptions={selectedOption && ([selectedOption] as Option[])}
            options={options}
            optionLabel={(option) => (option as Option)?.label ?? ''}
            aria-required
            hideClearButton
            aria-autocomplete="none"
            onOptionsChange={(changes) => {
              const [change] = changes.selectedItems
              onChange((change as Option)?.value)
            }}
            {...field}
          />
        )
      }}
    />
  )
}

// Requested in https://github.com/equinor/design-system/issues/2804
export const AutocompleteCustom = styled(Autocomplete)`
  input[type='text'] {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: ${({ hideClearButton }) =>
      hideClearButton ? `calc(8px + (24px * 1))` : `calc(8px + (24px * 2))`};
  }
`
