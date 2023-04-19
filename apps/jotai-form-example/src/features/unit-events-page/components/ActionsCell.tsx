import {
  removeFormMeta,
  useEditMode,
  useGetIsNew,
  useHasRemoteChange,
  useSetFormMeta,
} from '@equinor/apollo-components'
import { Button, Icon, Progress } from '@equinor/eds-core-react'
import { close, edit, save } from '@equinor/eds-icons'
import { useFormContext, useFormState } from 'react-hook-form'
import { useUnitEventMutation } from '../hooks/useUnitEventMutation'
import { UnitEvent } from '../types'
import { useUnitEventFormContext } from '../UnitEventsFormContext'

export function ActionsCell() {
  const mutateUnitEvent = useUnitEventMutation()

  const { setEditMode } = useUnitEventFormContext()
  const { handleSubmit } = useFormContext<UnitEvent>()
  const { isSubmitting, isValidating } = useFormState<UnitEvent>()

  const hasRemoteChange = useHasRemoteChange()
  const editMode = useEditMode()
  const getIsNew = useGetIsNew()
  const setFormMeta = useSetFormMeta()

  function handleEdit() {
    setEditMode(true)
  }

  function handleCancel() {
    setEditMode(false)
  }

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        const newValues = removeFormMeta(data)

        const isNew = getIsNew()
        console.log(`Mutating ${isNew ? 'new' : 'updated'} Unit Event`, newValues)
        await mutateUnitEvent([newValues])

        // Cleanup
        setFormMeta({ _isNew: false })
        setEditMode(false)
      } catch (e) {
        console.log(e)
      }
    },
    (errors) => {
      console.log(errors)
    }
  )

  if (!editMode) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Button variant="ghost_icon" onClick={handleEdit}>
          <Icon data={edit} />
        </Button>
      </div>
    )
  }

  const inProgress = isSubmitting || isValidating
  const disableSaveButton = inProgress || hasRemoteChange

  return (
    <div style={{ display: 'inline-flex' }}>
      <Button variant="ghost_icon" disabled={disableSaveButton} onClick={onSubmit}>
        {inProgress ? <Progress.Circular size={24} color="primary" /> : <Icon data={save}></Icon>}
      </Button>

      <Button variant="ghost_icon" disabled={isSubmitting} onClick={handleCancel}>
        <Icon data={close} />
      </Button>
    </div>
  )
}
