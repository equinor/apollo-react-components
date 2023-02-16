import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Pokemon } from 'mock-data'
import { ChangeEvent } from 'react'
import { pokemonFormUtils } from '../utils'

export function NumberCell(context: CellContext<Pokemon, unknown>) {
  const pokemonFormState = pokemonFormUtils.useFormState({ id: context.row.id })

  const updatePokemonForm = pokemonFormUtils.useUpdateFormMutation({ id: context.row.id })
  const columnId = context.column.id as keyof Pokemon

  if (!pokemonFormState) return context.getValue()

  const formValues = pokemonFormState.values
  const formErrors = pokemonFormState.errors?.get(columnId)

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
