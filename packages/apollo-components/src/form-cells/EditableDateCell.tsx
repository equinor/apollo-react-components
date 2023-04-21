import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { ChangeEvent, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { TypographyCustom } from '../cells'
import { FormMeta, useEditMode } from '../form-meta'
import { getHelperTextProps } from './utils'

export interface EditableDateCellProps<T extends FormMeta> extends CellContext<T, unknown> {
  dateStringFormatter?: (date: string) => string
}

export function EditableDateCell<T extends FormMeta>(props: EditableDateCellProps<T>) {
  const { dateStringFormatter, ...context } = props
  const rawValue = context.getValue<string>()

  const editMode = useEditMode()

  const formattedValue = useMemo(
    () => dateStringFormatter?.(rawValue) ?? rawValue,
    [rawValue, dateStringFormatter]
  )

  if (!editMode) return <TypographyCustom truncate>{formattedValue}</TypographyCustom>

  return (
    <Controller
      name={context.column.id}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <InlineTextField
          id={context.column.id}
          type="date"
          autoComplete="none"
          value={value ? parseISODate(value) : ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value ? parseISODate(e.target.value) : '')
          }
          {...getHelperTextProps({ error })}
          {...field}
        />
      )}
    />
  )
}

/**
 * Formats a date string into `yyyy-mm-dd` format.
 */
function parseISODate(dateString: string) {
  const date = new Date(dateString)
  const offset = date.getTimezoneOffset()
  const dateWithoutOffset = new Date(date.getTime() - offset * 60 * 1000)
  return dateWithoutOffset.toISOString().split('T')[0]
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
