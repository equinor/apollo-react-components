import { DataTable } from '@equinor/apollo-components'
import { usePokemonQuery } from '../../hooks'
import { pokemonColumns } from './columns'

export function PokemonTable() {
  const { data, isLoading } = usePokemonQuery()

  return (
    <div>
      <DataTable
        columns={pokemonColumns}
        data={data ?? []}
        isLoading={isLoading}
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
