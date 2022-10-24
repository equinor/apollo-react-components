import { DataTable } from '@equinor/apollo-components'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

export const PokemonTable = () => {
  return (
    <DataTable
      columns={pokemonColumns}
      data={pokemon}
      stickyHeader
      globalFilter
      tableCaption="Pokédex"
      sortable
      height="800px"
      virtual
    />
  )
}
