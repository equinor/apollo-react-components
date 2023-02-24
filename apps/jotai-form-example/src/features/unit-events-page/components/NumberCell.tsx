import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { UnitEvent } from 'mock-data'
import { ChangeEvent } from 'react'
import { unitEventFormUtils } from '../utils'

export function NumberCell(context: CellContext<UnitEvent, number>) {
  const pokemonFormState = unitEventFormUtils.useFormState({ id: context.row.id })

  const updatePokemonForm = unitEventFormUtils.useUpdateFormMutation({ id: context.row.id })
  const columnId = context.column.id as keyof UnitEvent

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
