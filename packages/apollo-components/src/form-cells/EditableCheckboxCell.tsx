import { Checkbox } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Controller } from 'react-hook-form'
import { FormMeta, useEditMode } from '../form-meta'

export function EditableCheckboxCell<T extends FormMeta>(context: CellContext<T, boolean>) {
  const editMode = useEditMode()

  if (!editMode)
    return (
      <Checkbox
        enterKeyHint="next"
        aria-label="readonly"
        readOnly={true}
        checked={context.getValue()}
        disabled={true}
      />
    )

  return (
    <Controller
      name={context.column.id}
      render={({ field: { value, ...field } }) => (
        <Checkbox enterKeyHint="send" aria-label="editable" checked={value} {...field} />
      )}
    />
  )
}
