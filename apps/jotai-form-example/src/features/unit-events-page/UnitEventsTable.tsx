import { DataTable } from '@equinor/apollo-components'
import { unitEventColumns } from './columns'
import { usePokemonQuery } from './hooks'

export function UnitEventsTable() {
  const { data, isLoading } = usePokemonQuery()

  return (
    <div>
      <DataTable
        columns={unitEventColumns}
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
