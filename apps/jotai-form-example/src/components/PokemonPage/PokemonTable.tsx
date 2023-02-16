import { DataTable } from '@equinor/apollo-components'
import { pokemonData } from 'mock-data'
import { pokemonColumns } from './columns'

export function PokemonTable() {
  return (
    <div>
      <DataTable
        columns={pokemonColumns}
        data={pokemonData}
        config={{
          virtual: true,
          height: '80vh',
          sortable: true,
          selectColumn: 'default',
          getRowId: (row) => row.id.toString(),
        }}
        filters={{ globalFilter: true, columnSelect: true }}
      />
    </div>
  )
}
