import { ChipsCell } from '@equinor/apollo-components'
import { createColumnHelper } from '@tanstack/react-table'
import { Pokemon } from '../../data'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns = [
  columnHelper.accessor('id', { header: 'ID', sortingFn: 'basic' }),
  columnHelper.accessor('name', { header: 'Name' }),
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
  columnHelper.accessor('base.speed', { header: 'Speed' }),
]
