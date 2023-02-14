import { capitalizeHeader, ChipsCell } from '@equinor/apollo-components'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Pokemon } from 'trpc-pokemon'
import { ActionsCell } from './ActionsCell'
import { WeightCell } from './WeightCell'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns: ColumnDef<Pokemon, any>[] = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (cell) => cell.getValue().split('-').join(' '),
  }),
  columnHelper.accessor('abilities', {
    id: 'abilities',
    header: capitalizeHeader,
    cell: (cell) =>
      ChipsCell({ values: cell.row.original.abilities.map((ability) => ability.name) }),
    enableSorting: false,
  }),
  columnHelper.accessor('weight', { header: capitalizeHeader, cell: WeightCell }),
  columnHelper.accessor('height', { header: capitalizeHeader }),
  columnHelper.display({
    header: 'Actions',
    cell: ActionsCell,
    meta: { sticky: true },
  }),
]
