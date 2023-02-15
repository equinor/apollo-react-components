import { Button, Icon } from '@equinor/eds-core-react'
import { close, edit, save } from '@equinor/eds-icons'
import { CellContext } from '@tanstack/react-table'
import { Pokemon } from 'trpc-pokemon'
import { pokemonFormUtils } from '../utils'

export function ActionsCell({ row }: CellContext<Pokemon, unknown>) {
  const pokemonFormValues = pokemonFormUtils.useFormState({ id: row.id })
  const { initializeForm, resetForm } = pokemonFormUtils.useFormMutations({ id: row.id })

  function handleEdit() {
    initializeForm(row.original)
  }

  function handleSubmit() {
    console.log(pokemonFormValues)
    handleCancel()
  }

  function handleCancel() {
    resetForm()
  }

  return (
    <div>
      <Button
        variant="ghost_icon"
        onClick={() => (!pokemonFormValues ? handleEdit() : handleSubmit())}
        disabled={pokemonFormValues && !pokemonFormValues?.isValid}
      >
        <Icon data={!pokemonFormValues ? edit : save} />
      </Button>
      <Button variant="ghost_icon" onClick={() => handleCancel()}>
        <Icon data={close} />
      </Button>
    </div>
  )
}
