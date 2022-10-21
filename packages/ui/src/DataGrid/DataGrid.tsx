import { Table, Typography } from '@equinor/eds-core-react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import styled from 'styled-components'
import { TableHeader } from './components'
import { DebouncedInput, fuzzyFilter } from './filters'
import { enableOrUndefined } from './utils'

const TableWrapper = styled.div<{ width?: string; captionPadding?: string }>`
  & > div {
    padding: 1rem;
  }
  table {
    width: ${(props) => props.width ?? '100%'};
  }
  .--table-caption {
    & > * + * {
      margin-top: 0.5rem;
    }
    gap: 0.5rem;
    padding: ${(props) => props.captionPadding ?? '1rem'};
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export interface DataGridProps<T> {
  className?: string
  columns: ColumnDef<T, any>[]
  data: T[]
  tableCaption?: string
  captionPadding?: string
  globalFilter?: boolean
  globalFilterPlaceholder?: string
  stickyHeader?: boolean
  tableWidth?: string
  sortable?: boolean
}

export function DataGrid<T>(props: DataGridProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('')

  function enableGlobalFilter<T>(value: T) {
    return enableOrUndefined(props.globalFilter, value)
  }

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns: props.columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableGlobalFilter(getFilteredRowModel()),
    globalFilterFn: enableGlobalFilter(fuzzyFilter),
    state: {
      globalFilter: enableGlobalFilter(globalFilter),
      sorting: sorting,
    },
    enableSorting: props.sortable,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: enableGlobalFilter(setGlobalFilter),
  })

  return (
    <TableWrapper
      className={props.className}
      captionPadding={props.captionPadding}
      width={props.tableWidth}
    >
      <Table>
        <Table.Caption className="--table-caption">
          {props?.tableCaption && <Typography variant="h2">{props?.tableCaption}</Typography>}
          {props?.globalFilter && (
            <FilterContainer className="--filter-container">
              <DebouncedInput
                value={globalFilter ?? ''}
                placeholder={props?.globalFilterPlaceholder ?? 'Search all columns'}
                onChange={(value) => setGlobalFilter(String(value))}
              />
            </FilterContainer>
          )}
        </Table.Caption>
        <TableHeader sticky={props.stickyHeader} table={table} />
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </TableWrapper>
  )
}
