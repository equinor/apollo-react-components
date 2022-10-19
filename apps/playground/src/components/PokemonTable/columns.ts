import { createColumnHelper } from '@tanstack/react-table'
import { ChipsCell } from 'ui'
import { Pokemon } from '../../data'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns = [
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor((row) => row.type.join(', '), {
    id: 'Type',
    cell: (value) => ChipsCell({ values: value.getValue().split(', ') }),
  }),
  columnHelper.accessor('base.hp', { header: 'HP' }),
  columnHelper.accessor('base.attack', { header: 'Attack' }),
  columnHelper.accessor('base.defense', { header: 'Defense' }),
  columnHelper.accessor('base.specialAttack', { header: 'Sp. Attack' }),
  columnHelper.accessor('base.specialDefense', { header: 'Sp. Defense' }),
  columnHelper.accessor('base.speed', { header: 'Speed' }),
]
