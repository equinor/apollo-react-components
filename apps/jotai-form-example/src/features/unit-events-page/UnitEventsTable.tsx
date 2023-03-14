import { DataTable } from '@equinor/apollo-components'
import { useMemo } from 'react'
import { unitEventColumns } from './columns'
import { usePokemonQuery } from './hooks'

export function UnitEventsTable() {
  const { data, isLoading, isFetching, fetchNextPage } = usePokemonQuery()
  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0
  const totalFetched = flatData.length

  const canFetchNextPage = !isFetching && totalFetched < totalDBRowCount

  return (
    <div>
      <DataTable
        columns={unitEventColumns}
        infiniteScroll={{
          onBottomScroll: () => canFetchNextPage && fetchNextPage(),
        }}
        data={flatData}
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
