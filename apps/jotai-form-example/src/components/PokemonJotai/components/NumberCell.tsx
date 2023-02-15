import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { ChangeEvent } from 'react'
import { Pokemon } from 'trpc-pokemon'
import { usePokemonForm } from '../atoms'
import { pokemonFormUtils } from '../utils'

export function NumberCell(context: CellContext<Pokemon, unknown>) {
  const [pokemonForm] = usePokemonForm({ id: context.row.id })
  const updatePokemonForm = pokemonFormUtils.useUpdateFormMutation({ id: context.row.id })
  const columnId = context.column.id as keyof Pokemon

  if (!pokemonForm) return context.getValue()

  const formValues = pokemonForm.values
  const formErrors = pokemonForm.errors?.get(columnId)

  return (
    <TextField
      id={`${context.row.id}-${columnId}`}
      type="number"
      value={formValues[columnId].toString()}
      variant={formErrors ? 'error' : undefined}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        updatePokemonForm({
          [columnId]: event.target.valueAsNumber,
        })
      }}
    />
  )
}
