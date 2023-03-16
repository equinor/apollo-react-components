import { DataTable } from '@equinor/apollo-components'
import { pokemonColumns } from './columns'
import { usePokemonQuery } from './hooks'

export function PokemonTable() {
  const { data, isLoading } = usePokemonQuery()

  return (
    <div>
      <DataTable
        tableCaption="Pokemon"
        columns={pokemonColumns}
        data={data ?? []}
        isLoading={isLoading}
        getRowId={(row) => row.id.toString()}
        virtual
        tableLayout="fixed" // Required for using columns with fixed width
        height="80vh"
        rowSelection={{
          selectColumn: 'default',
        }}
        sorting={{ enableSorting: true }}
        headerConfig={{ sticky: true }}
        actionsRow={{
          showGlobalFilter: true,
          showColumnSelect: true,
          showTableCaption: true,
        }}
      />
    </div>
  )
}
