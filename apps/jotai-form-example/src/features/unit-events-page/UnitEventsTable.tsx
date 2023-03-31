import { DataTable } from '@equinor/apollo-components'
import { useMemo, useState } from 'react'
import { unitEventColumns } from './columns'
import { usePokemonQuery } from './hooks'
import { FormsCache, UnitEvent } from './types'
import { UnitEventActions } from './UnitEventActions'
import { UnitEventFormWrapper } from './UnitEventsFormContext'

export function UnitEventsTable() {
  const { data, isLoading, isFetching, fetchNextPage } = usePokemonQuery()
  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0
  const totalFetched = flatData.length

  const canFetchNextPage = !isFetching && totalFetched < totalDBRowCount

  const [formsCache, setFormsCache] = useState<FormsCache<UnitEvent>>({})
  const [newRows, setNewRows] = useState<UnitEvent[]>([])

  const tableHasEditRows = Boolean(Object.keys(formsCache).length) || Boolean(newRows.length)

  const handleRemoveNewUnitEventForm = (id: string) => {
    setNewRows((old) => old.filter((unitEvent) => unitEvent.id !== id))
  }

  const handleAddNewRows = ([unitEvent]: UnitEvent[]) => {
    if (!unitEvent) return
    setNewRows((old) => [unitEvent, ...old])
  }

  const handleCancelAll = () => {
    setFormsCache({})
    setNewRows([])
  }

  console.log(data)

  return (
    <div>
      <DataTable
        tableCaption="Unit Events"
        columns={unitEventColumns}
        data={newRows.length ? [...newRows, ...flatData] : flatData}
        infiniteScroll={{
          onBottomScroll: () => canFetchNextPage && fetchNextPage(),
        }}
        isLoading={isLoading}
        tableLayout="fixed" // Required for using columns with fixed width
        height="80vh"
        virtual
        rowSelection={{
          mode: 'multiple',
          selectColumn: 'default',
        }}
        getRowId={(row) => row.id.toString()}
        sorting={{
          enableSorting: true,
          manualSorting: true,
        }}
        stickyHeader={true}
        bannerConfig={{
          enableColumnSelect: true,
          totalRowCount: totalDBRowCount,
          customActions: () =>
            isLoading ? null : (
              <UnitEventActions
                hasEditRows={tableHasEditRows}
                onCancelAll={handleCancelAll}
                addRows={handleAddNewRows}
              />
            ),
        }}
        rowConfig={{
          rowWrapper: (props) =>
            UnitEventFormWrapper({
              ...props,
              onRemove: handleRemoveNewUnitEventForm,
              formsCache,
              setFormsCache,
            }),
        }}
      />
    </div>
  )
}
