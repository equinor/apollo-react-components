import { Button } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { Pokemon } from '../../data'

export function PokemonActionsCell({ row }: CellContext<Pokemon, unknown>) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Button onClick={() => console.log(`${row.id} action clicked`)}>Catch</Button>
    </div>
  )
}
