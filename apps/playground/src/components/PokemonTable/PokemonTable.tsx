import { DataGrid } from 'ui'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

export const PokemonTable = () => {
  return (
    <DataGrid
      columns={pokemonColumns}
      data={pokemon}
      stickyHeader
      globalFilter
      tableCaption="Pokédex"
    />
  )
}
