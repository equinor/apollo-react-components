import { Checkbox, EdsProvider } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Controller, useFormContext } from 'react-hook-form'
import { FormMeta, useEditMode } from '../form-meta'

export function EditableCheckboxCell<T extends FormMeta>(context: CellContext<T, boolean>) {
  const editMode = useEditMode()
  const { control } = useFormContext()

  if (!editMode)
    return (
      <EdsProvider density="compact">
        <Checkbox
          enterKeyHint="next"
          aria-label="readonly"
          readOnly={true}
          checked={context.getValue()}
          disabled={true}
        />
      </EdsProvider>
    )

  return (
    <Controller
      control={control}
      name={context.column.id}
      render={({ field: { value, ...field } }) => (
        <EdsProvider density="compact">
          <Checkbox enterKeyHint="send" aria-label="editable" checked={value} {...field} />
        </EdsProvider>
      )}
    />
  )
}
