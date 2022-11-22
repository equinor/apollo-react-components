import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import styled from 'styled-components'
import { columnVisibilityAtom, globalFilterAtom, rowSelectionAtom, tableSortingAtom } from './atoms'
import { BasicTable } from './components/BasicTable'
import { ColumnSelect } from './components/ColumnSelect'
import { DataTableHeader } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { fuzzyFilter } from './filters'
import { DataTableConfig, FilterConfig, HeaderConfig } from './types'
import { enableOrUndefined, prependSelectColumnIfEnabled } from './utils'

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
  const [columnVisibility, setColumnVisibility] = useAtom(columnVisibilityAtom)
  const [globalFilter, setGlobalFilter] = useAtom(globalFilterAtom)
  const [sorting, setSorting] = useAtom(tableSortingAtom)
  const [rowSelectionState, setRowSelectionState] = useAtom(rowSelectionAtom)

  function enableGlobalFilter<T>(value: T) {
    return enableOrUndefined(filters?.globalFilter, value)
  }

  const table = useReactTable({
    columns: prependSelectColumnIfEnabled(columns, config),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableGlobalFilter(getFilteredRowModel()),
    globalFilterFn: enableGlobalFilter(fuzzyFilter),
    state: {
      globalFilter: enableGlobalFilter(globalFilter),
      sorting: enableOrUndefined(config?.sortable, sorting),
      rowSelection: rowSelectionState,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelectionState,
    enableSorting: config?.sortable,
    onSortingChange: enableOrUndefined(config?.sortable, setSorting),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
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
        globalFilterPlaceholder={filters?.globalFilterPlaceholder}
        captionPadding={header?.captionPadding}
        filterActions={<ColumnSelect table={table} />}
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
