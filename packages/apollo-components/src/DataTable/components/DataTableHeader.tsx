import { Typography } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { OnChangeFn, Table } from '@tanstack/react-table'
import styled from 'styled-components'
import { SetRequired } from 'type-fest'
import { DebouncedInput } from '../filters'
import { DataTableProps } from '../types'
import { ColumnSelect } from './ColumnSelect'

const DataTableHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`

interface DataTableHeaderProps<T> {
  table: Table<T>
  tableCaption: string
  actionsRow: SetRequired<DataTableProps<T>, 'actionsRow'>['actionsRow']
  globalFilter: { state: string; onChange: OnChangeFn<string> }
}

export function ActionsHeaderRow<T>({
  table,
  actionsRow,
  tableCaption,
  globalFilter,
}: DataTableHeaderProps<T>) {
  return (
    <DataTableHeaderWrapper className="--table-caption">
      <FilterContainer className="--filter-container-left">
        {actionsRow?.enableTableCaption && <Typography variant="h3">{tableCaption}</Typography>}
        {actionsRow?.customActions?.(table)}
      </FilterContainer>

      <FilterContainer className="--filter-container-right">
        <>
          {actionsRow?.enableGlobalFilterInput && (
            <DebouncedInput
              value={globalFilter.state}
              icon={search}
              placeholder={actionsRow.globalFilterPlaceholder ?? 'Search all columns'}
              onChange={(value) => globalFilter.onChange(String(value))}
            />
          )}
          {actionsRow?.enableColumnSelect && <ColumnSelect table={table} />}
          {actionsRow?.totalRowCount && (
            <span>
              {table.options.data.length.toLocaleString()} /{' '}
              {actionsRow.totalRowCount.toLocaleString()} rows
            </span>
          )}
        </>
      </FilterContainer>
    </DataTableHeaderWrapper>
  )
}
