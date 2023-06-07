import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Controller, FieldError, FieldPath } from 'react-hook-form'
import styled from 'styled-components'
import { TypographyCustom } from '../cells'
import { FormMeta, useEditMode } from '../form-meta'
import { getHelperTextProps } from './utils'

interface EditableTextFieldCellProps<T extends FormMeta> extends CellContext<T, unknown> {
  /**
   * FieldError object used to overwrite react-hook-form validation result. It is prioritized over
   * react-hook-form's validation.
   */
  error?: FieldError
}

export function EditableTextFieldCell<T extends FormMeta>({
  error: errorFromProps,
  ...context
}: EditableTextFieldCellProps<T>) {
  const editMode = useEditMode()

  if (!editMode) return <TypographyCustom truncate>{context.getValue() as any}</TypographyCustom>

  return (
    <Controller
      name={context.column.id as FieldPath<T>}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <InlineTextField
          id={context.column.id}
          autoComplete="none"
          value={String(value ?? '')}
          {...field}
          {...getHelperTextProps({ error: errorFromProps ?? error })}
        />
      )}
    />
  )
}

const InlineTextField = styled(TextField)`
  /* 
  TODO: Improve input based on feedback from UX
  & > div {
    background: transparent;
    margin: 0 -0.5rem;
    padding: 0 0.5rem;
    box-shadow: none;
    width: auto;
  }

  input {
    padding: 0;
    letter-spacing: 0;
    font-weight: 400;
    color: inherit;

    ::placeholder {
      color: red;
    }
  } */
`
