import { ChipsCell } from '@equinor/apollo-components'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Pokemon } from '../../data'
import { PokemonActionsCell } from './PokemonActionsCell'

const columnHelper = createColumnHelper<Pokemon>()

export const pokemonColumns: ColumnDef<Pokemon, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
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
    id: 'test',
  }),
  columnHelper.display({
    header: 'Actions',
    enablePinning: true,
    cell: PokemonActionsCell,
  }),
]
