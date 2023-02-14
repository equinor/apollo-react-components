import { CellContext } from '@tanstack/react-table'
import { Pokemon } from 'trpc-pokemon'
import { usePokemonForm } from './atoms'

export function WeightCell(cell: CellContext<Pokemon, unknown>) {
  const [pokemonForm] = usePokemonForm({ id: cell.row.id })

  if (!pokemonForm) return cell.getValue()

  return <div>{pokemonForm['weight']}</div>
}
