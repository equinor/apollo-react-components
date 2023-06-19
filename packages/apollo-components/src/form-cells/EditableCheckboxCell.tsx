import { Checkbox } from '@equinor/eds-core-react'
import { Controller } from 'react-hook-form'
import { FormMeta, useEditMode } from '../form-meta'
import { EditableCellBaseProps } from './types'

export function EditableCheckboxCell<T extends FormMeta>({
  onChange: onChangeFromProps,
  ...context
}: EditableCellBaseProps<T, boolean>) {
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
      render={({ field: { value, onChange, ...field } }) => (
        <Checkbox
          enterKeyHint="send"
          aria-label="editable"
          checked={value}
          {...field}
          onChange={(e) => {
            onChange(e)
            onChangeFromProps?.(e.target.checked)
          }}
        />
      )}
    />
  )
}
