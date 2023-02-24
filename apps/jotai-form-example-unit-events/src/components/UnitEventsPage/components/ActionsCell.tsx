import { Button, Icon } from '@equinor/eds-core-react'
import { close, edit, save } from '@equinor/eds-icons'
import { CellContext } from '@tanstack/react-table'
import { UnitEvent } from 'mock-data'
import { useUnitEventMutation } from '../../../hooks/useUnitEventMutation'
import { unitEventFormUtils } from '../utils'

export function ActionsCell({ row }: CellContext<UnitEvent, unknown>) {
  const pokemonFormState = unitEventFormUtils.useFormState({ id: row.id })
  const { initializeForm, resetForm } = unitEventFormUtils.useFormMutations({ id: row.id })
  const mutatePokemon = useUnitEventMutation(row.original)

  function handleEdit() {
    initializeForm(row.original)
  }

  function handleSubmit() {
    if (pokemonFormState) {
      mutatePokemon(pokemonFormState)
    }
    handleCancel()
  }

  function handleCancel() {
    resetForm()
  }

  return (
    <div style={{ display: 'inline-flex' }}>
      <Button
        variant="ghost_icon"
        disabled={pokemonFormState && !pokemonFormState?.isValid}
        onClick={() => (!pokemonFormState ? handleEdit() : handleSubmit())}
      >
        <Icon data={!pokemonFormState ? edit : save} />
      </Button>
      <Button variant="ghost_icon" onClick={() => handleCancel()}>
        <Icon data={close} />
      </Button>
    </div>
  )
}
