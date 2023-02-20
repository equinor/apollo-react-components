import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Pokemon } from 'mock-data'
import { ActionsCell, NumberCell, TypeSelectCell } from './components'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns: ColumnDef<Pokemon, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor((row) => row.type.join(', '), {
    id: 'Type',
    cell: TypeSelectCell,
    enableSorting: false,
  }),
  columnHelper.accessor('hp', { header: 'HP', cell: NumberCell }),
  columnHelper.accessor('attack', { header: 'Attack', cell: NumberCell }),
  columnHelper.accessor('defense', { header: 'Defense', cell: NumberCell }),
  columnHelper.accessor('specialAttack', { header: 'Sp. Attack', cell: NumberCell }),
  columnHelper.accessor('specialDefense', { header: 'Sp. Defense', cell: NumberCell }),
  columnHelper.accessor('speed', {
    header: 'Speed',
  }),
  columnHelper.display({
    header: 'Actions',
    cell: ActionsCell,
    meta: { sticky: true },
  }),
]
