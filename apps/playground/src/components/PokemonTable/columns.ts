import { ChipsCell, HierarchyCell, StickyCell } from '@equinor/apollo-components'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Pokemon } from '../../data'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns: ColumnDef<Pokemon, any>[] = [
  columnHelper.accessor('name', { header: 'Name', cell: HierarchyCell }),
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
    cell: () => StickyCell({ children: 'Actions actions backtions' as any }),
    meta: { sticky: true },
  }),
]
