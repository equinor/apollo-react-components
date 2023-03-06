import { DataTable } from '@equinor/apollo-components'
import { pokemonColumns } from './columns'
import { usePokemonQuery } from './hooks'

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
          tableLayout: 'fixed', // Required for using columns with fixed width
          height: '80vh',
          selectColumn: 'default',
          getRowId: (row) => row.id.toString(),
        }}
        sortConfig={{ enableSorting: true }}
        header={{ stickyHeader: true }}
        filters={{ globalFilter: true, columnSelect: true }}
      />
    </div>
  )
}
