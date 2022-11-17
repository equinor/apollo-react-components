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
import { DataTableConfig, FilterConfig, HeaderConfig } from './types'
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
  config?: DataTableConfig
  data: T[]
  filters?: FilterConfig
  header?: HeaderConfig
}

export function DataTable<T>({ columns, data, header, filters, config }: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('')

  function enableGlobalFilter<T>(value: T) {
    return enableOrUndefined(filters?.globalFilter, value)
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
    enableSorting: config?.sortable,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: enableGlobalFilter(setGlobalFilter),
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  return (
    <DataTableWrapper
      captionPadding={header?.captionPadding}
      height={config?.height}
      width={config?.width}
    >
      <DataTableHeader
        tableCaption={header?.tableCaption}
        enableGlobalFilter={filters?.globalFilter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        globalFilterPlaceholder={filters?.globalFilterPlaceholder}
        captionPadding={header?.captionPadding}
      />
      <div ref={tableContainerRef} className="--table-container">
        {config?.virtual ? (
          <VirtualTable
            containerRef={tableContainerRef}
            table={table}
            stickyHeader={header?.stickyHeader}
          />
        ) : (
          <BasicTable table={table} stickyHeader={header?.stickyHeader} />
        )}
      </div>
    </DataTableWrapper>
  )
}
