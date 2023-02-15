import { TextField } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { useFormContext, useFormState } from 'react-hook-form'
import { Pokemon } from 'trpc-pokemon'

export function NumberCellForm(context: CellContext<Pokemon, unknown>) {
  const { register } = useFormContext<Pokemon>() // retrieve all hook methods
  const columnId = context.column.id as keyof Pokemon
  const { isValid, errors } = useFormState({ name: columnId })

  return (
    <div>
      <TextField id={[context.row.id, columnId].join('-')} {...register(columnId)} />
      {!isValid && <div>{JSON.stringify(errors)}</div>}
    </div>
  )
}
