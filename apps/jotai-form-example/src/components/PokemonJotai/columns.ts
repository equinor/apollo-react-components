import { capitalizeHeader } from '@equinor/apollo-components'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Pokemon } from 'trpc-pokemon'
import { ActionsCell, NumberCell } from './components'
import { AbilitySelectCell } from './components/AbilitySelectCell'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns: ColumnDef<Pokemon, any>[] = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (cell) => cell.getValue().split('-').join(' '),
  }),
  columnHelper.accessor('abilities', {
    id: 'abilities',
    header: capitalizeHeader,
    cell: AbilitySelectCell,
    enableSorting: false,
  }),
  columnHelper.accessor('weight', { header: capitalizeHeader, cell: NumberCell }),
  columnHelper.accessor('height', { header: capitalizeHeader, cell: NumberCell }),
  columnHelper.display({
    header: 'Actions',
    cell: ActionsCell,
    meta: { sticky: true },
  }),
]
