import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { BasicTable } from './components/BasicTable'
import { DataTableHeader } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { fuzzyFilter } from './filters'
import { enableOrUndefined } from './utils'

const DataTableWrapper = styled.div<{ width?: string; height?: string; captionPadding?: string }>`
  width: ${(props) => props.width ?? '100%'};

  .--table-container {
    height: ${(props) => props.height ?? '100%'};
    width: ${(props) => props.width ?? '100%'};
    overflow: auto;

    table {
      width: 100%;
    }
  }
`

export interface DataTableProps<T> {
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
  virtual?: boolean
  height?: string
}

export function DataTable<T>({ columns, data, ...props }: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('')

  function enableGlobalFilter<T>(value: T) {
    return enableOrUndefined(props.globalFilter, value)
  }

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns: columns,
    data: data,
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

  const tableContainerRef = useRef<HTMLDivElement>(null)

  return (
    <DataTableWrapper
      captionPadding={props.captionPadding}
      height={props.height}
      width={props.tableWidth}
    >
      <DataTableHeader
        tableCaption={props.tableCaption}
        enableGlobalFilter={props.globalFilter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        globalFilterPlaceholder={props.globalFilterPlaceholder}
        captionPadding={props.captionPadding}
      />
      <div ref={tableContainerRef} className="--table-container">
        {props.virtual ? (
          <VirtualTable
            containerRef={tableContainerRef}
            table={table}
            stickyHeader={props.stickyHeader}
          />
        ) : (
          <BasicTable table={table} stickyHeader={props.stickyHeader} />
        )}
      </div>
    </DataTableWrapper>
  )
}
