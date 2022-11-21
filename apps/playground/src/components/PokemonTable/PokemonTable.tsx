import { DataTable } from '@equinor/apollo-components'
import { EdsProvider } from '@equinor/eds-core-react'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

export const PokemonTable = () => {
  return (
    <EdsProvider density="compact">
      <DataTable
        columns={pokemonColumns}
        config={{ sortable: true, virtual: true, height: '800px', enableRowSelection: true }}
        data={pokemon}
        filters={{ globalFilter: true }}
        header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
      />
    </EdsProvider>
  )
}
