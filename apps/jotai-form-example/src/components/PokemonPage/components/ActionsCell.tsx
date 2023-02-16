import { Button, Icon } from '@equinor/eds-core-react'
import { close, edit, save } from '@equinor/eds-icons'
import { CellContext } from '@tanstack/react-table'
import { Pokemon } from 'mock-data'
import { pokemonFormUtils } from '../utils'

export function ActionsCell({ row }: CellContext<Pokemon, unknown>) {
  const pokemonFormState = pokemonFormUtils.useFormState({ id: row.id })
  const { initializeForm, resetForm } = pokemonFormUtils.useFormMutations({ id: row.id })

  function handleEdit() {
    initializeForm(row.original)
  }

  function handleSubmit() {
    if (pokemonFormState) {
      console.group('Submit ' + row.original.name)
      console.dir(pokemonFormState)
      console.groupEnd()
    }
    handleCancel()
  }

  function handleCancel() {
    resetForm()
  }

  return (
    <div>
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
