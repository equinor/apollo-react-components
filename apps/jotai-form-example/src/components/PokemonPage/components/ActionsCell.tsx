import { Button, Icon } from '@equinor/eds-core-react'
import { close, edit, save } from '@equinor/eds-icons'
import { CellContext } from '@tanstack/react-table'
import { Pokemon } from 'mock-data'
import { usePokemonMutation } from '../../../hooks/usePokemonMutation'
import { pokemonFormUtils } from '../utils'

export function ActionsCell({ row }: CellContext<Pokemon, unknown>) {
  const pokemonFormState = pokemonFormUtils.useFormState({ id: row.id })
  const { initializeForm, resetForm } = pokemonFormUtils.useFormMutations({ id: row.id })
  const mutatePokemon = usePokemonMutation(row.original)

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
