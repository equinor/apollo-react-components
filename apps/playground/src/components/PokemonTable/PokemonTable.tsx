import { DataTable } from '@equinor/apollo-components'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

export const PokemonTable = () => {
  return (
    <DataTable
      columns={pokemonColumns}
      config={{ sortable: true, virtual: true, height: '800px' }}
      data={pokemon}
      filters={{ globalFilter: true }}
      header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
    />
  )
}
