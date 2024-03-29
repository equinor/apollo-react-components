import { Button, Dialog as EDS, Icon, TextField } from '@equinor/eds-core-react'
import { arrow_up } from '@equinor/eds-icons'
import { ChangeEvent, useState } from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { PopoverCell, stopPropagation } from '../cells'
import { FormMeta, useEditMode } from '../form-meta'
import { EditableCellBaseProps } from './types'
import { getHelperTextProps } from './utils'

interface EdtiableTextAreaProps<T extends FormMeta> extends EditableCellBaseProps<T, string> {
  title: string
}

export function EditableTextAreaCell<T extends FormMeta>({
  title,
  error: errorFromProps,
  onChange: onChangeFromProps,
  ...context
}: EdtiableTextAreaProps<T>) {
  const [textareaValue, setTextareaValue] = useState<string>(context.getValue())
  const [open, setOpen] = useState(false)
  const editMode = useEditMode()

  const name = context.column.id

  if (!editMode)
    return <PopoverCell id={name + 'popover'} value={context.getValue()} title={title} />

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return (
    <Controller
      name={name}
      render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => (
        <>
          {/* Inline input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <StyledTextField
              id={field.name}
              onChange={onChange}
              ref={ref}
              {...field}
              {...getHelperTextProps({ error: errorFromProps ?? error })}
            />
            <IconButton variant="ghost_icon" onClick={stopPropagation(openDialog)}>
              <Icon data={arrow_up} size={24} style={{ transform: 'rotateZ(45deg)' }} />
            </IconButton>
          </div>

          {/* Dialog */}
          <EDS
            open={open}
            onClose={() => {
              closeDialog()
              onChange(textareaValue)
              onChangeFromProps?.(textareaValue)
            }}
            isDismissable
            style={{ width: 'min(50rem, calc(100vw - 4rem))' }}
          >
            <EDS.Header>
              <EDS.Title>{title}</EDS.Title>
            </EDS.Header>
            <EDS.Content>
              <TextField
                style={{
                  maxWidth: '100%',
                  marginTop: '1rem',
                }}
                id={field.name + 'modal'}
                multiline
                rows={8}
                name={field.name + 'modal'}
                value={textareaValue}
                onChange={(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
                  setTextareaValue(e.target.value)
                }}
              />
            </EDS.Content>
            <EDS.Actions style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={() => {
                  closeDialog()
                  onChange(textareaValue)
                  onChangeFromProps?.(textareaValue)
                }}
              >
                Submit
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  closeDialog()
                  setTextareaValue(context.getValue())
                }}
              >
                Cancel
              </Button>
            </EDS.Actions>
          </EDS>
        </>
      )}
    />
  )
}

const StyledTextField = styled(TextField)`
  & input {
    padding-right: 40px;
    letter-spacing: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const IconButton = styled(Button)`
  position: absolute;
  height: 32px;
  width: 32px;
  right: 4px;
`
