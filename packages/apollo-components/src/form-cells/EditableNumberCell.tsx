import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { ChangeEvent } from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { TypographyCustom } from '../cells'
import { FormMeta, useEditMode } from '../form-meta'
import { getHelperTextProps } from './utils'

export function EditableNumberCell<T extends FormMeta>(context: CellContext<T, number>) {
  const editMode = useEditMode()

  if (!editMode) return <TypographyCustom truncate>{context.getValue()}</TypographyCustom>

  return (
    <Controller
      name={context.column.id}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <>
          <InlineTextField
            id={context.column.id}
            type="number"
            autoComplete="none"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.valueAsNumber)}
            {...field}
            {...getHelperTextProps({ error })}
          />
        </>
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