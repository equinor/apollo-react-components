import { ChipsCell, HierarchyCell } from '@equinor/apollo-components'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Pokemon } from '../../data'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns: ColumnDef<Pokemon, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (context) => HierarchyCell(context, { getDisplayName: () => 'BING' }),
  }),
  columnHelper.accessor((row) => row.type.join(', '), {
    id: 'Type',
    cell: (value) => ChipsCell({ values: value.getValue().split(', ') }),
    enableSorting: false,
  }),
  columnHelper.accessor('base.hp', { header: 'HP' }),
  columnHelper.accessor('base.attack', { header: 'Attack' }),
  columnHelper.accessor('base.defense', { header: 'Defense' }),
  columnHelper.accessor('base.specialAttack', { header: 'Sp. Attack' }),
  columnHelper.accessor('base.specialDefense', { header: 'Sp. Defense' }),
  columnHelper.accessor('base.speed', {
    header: 'Speed',
  }),
  columnHelper.display({
    header: 'Actions',
    meta: { sticky: true },
  }),
]
