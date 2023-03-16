import { DataTable } from '@equinor/apollo-components'
import { Button } from '@equinor/eds-core-react'
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
        tableCaption="Unit Events"
        columns={unitEventColumns}
        infiniteScroll={{
          onBottomScroll: () => canFetchNextPage && fetchNextPage(),
        }}
        data={flatData}
        isLoading={isLoading}
        tableLayout="fixed" // Required for using columns with fixed width
        height="80vh"
        virtual
        rowSelection={{
          mode: 'multiple',
          selectColumn: 'default',
        }}
        getRowId={(row) => row.id.toString()}
        sorting={{ enableSorting: true }}
        headerConfig={{ sticky: true }}
        actionsRow={{
          showColumnSelect: true,
          totalRowCount: totalDBRowCount,
          customActions: () => (
            <>
              <Button>Helllo</Button>
              <Button variant="ghost">Helllo</Button>
            </>
          ),
        }}
      />
    </div>
  )
}
