import { DataTable } from '@equinor/apollo-components'
import { usePokemonQuery } from '../../hooks'
import { pokemonColumns } from './columns'

export function UnitEventsTable() {
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
          sortable: true,
          selectColumn: 'default',
          getRowId: (row) => row.id.toString(),
        }}
        header={{ stickyHeader: true }}
        filters={{ globalFilter: true, columnSelect: true }}
      />
    </div>
  )
}
