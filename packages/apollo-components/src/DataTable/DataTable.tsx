import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TypographyCustom } from '../cells/TypographyCustom'
import {
  columnVisibilityAtom,
  expandedRowsAtom,
  globalFilterAtom,
  rowSelectionAtom,
  tableSortingAtom,
} from './atoms'
import { BasicTable } from './components/BasicTable'
import { DataTableHeader } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { fuzzyFilter } from './filters'
import { CellConfig, DataTableConfig, FilterConfig, HeaderConfig, RowConfig } from './types'
import { enableOrUndefined, prependSelectColumn } from './utils'

const DataTableWrapper = styled.div<{ width?: string; height?: string; captionPadding?: string }>`
  width: ${(props) => props.width ?? '100%'};

  .--table-container {
    height: ${(props) => props.height ?? '100%'};
    width: ${(props) => props.width ?? '100%'};
    overflow: auto;

    table {
      width: 100%;
      table-layout: auto;
    }
  }
`

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  isLoading?: boolean
  className?: string
  config?: DataTableConfig<T>
  cellConfig?: CellConfig<T>
  rowConfig?: RowConfig<T>
  filters?: FilterConfig
  header?: HeaderConfig
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  header,
  filters,
  config,
  rowConfig,
}: DataTableProps<T>) {
  const [columnVisibility, setColumnVisibility] = useAtom(columnVisibilityAtom)
  const [globalFilter, setGlobalFilter] = useAtom(globalFilterAtom)
  const [sorting, setSorting] = useAtom(tableSortingAtom)
  const [rowSelectionState, setRowSelectionState] = useAtom(rowSelectionAtom)
  const [expanded, setExpanded] = useAtom(expandedRowsAtom)

  function enableGlobalFilter<T>(value: T) {
    return enableOrUndefined(filters?.globalFilter, value)
  }

  const table = useReactTable({
    columns: prependSelectColumn(columns, config),
    data: data,
    globalFilterFn: enableGlobalFilter(fuzzyFilter),

    state: {
      expanded,
      globalFilter: enableGlobalFilter(globalFilter),
      sorting: enableOrUndefined(config?.sortable, sorting),
      rowSelection: rowSelectionState,
      columnVisibility,
    },
    defaultColumn: {
      cell: (cell) => <TypographyCustom noWrap>{cell.getValue() as any}</TypographyCustom>,
    },
    enableSorting: config?.sortable,
    enableExpanding: !config?.hideExpandControls,
    enableMultiRowSelection: config?.rowSelectionMode === 'multiple',
    enableSubRowSelection: config?.rowSelectionMode !== 'single',
    filterFromLeafRows: filters?.filterFromLeafRows,
    getFilteredRowModel: enableGlobalFilter(getFilteredRowModel()),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelectionState,
    onSortingChange: enableOrUndefined(config?.sortable, setSorting),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: enableGlobalFilter(setGlobalFilter),
    getSubRows: config?.getSubRows,
    getRowId: config?.getRowId,
  })

  useEffect(() => {
    if (config && config.expandAllByDefault) {
      table.toggleAllRowsExpanded()
    }
  }, [table, config?.expandAllByDefault])

  const tableContainerRef = useRef<HTMLDivElement>(null)

  return (
    <DataTableWrapper
      captionPadding={header?.captionPadding}
      height={config?.height}
      width={config?.width}
    >
      <DataTableHeader
        tableCaption={header?.tableCaption}
        captionPadding={header?.captionPadding}
        table={table}
        config={filters}
      />
      <div ref={tableContainerRef} className="--table-container">
        {config?.virtual ? (
          <VirtualTable
            containerRef={tableContainerRef}
            table={table}
            rowConfig={rowConfig}
            isLoading={isLoading}
            stickyHeader={header?.stickyHeader}
          />
        ) : (
          <BasicTable
            table={table}
            rowConfig={rowConfig}
            isLoading={isLoading}
            stickyHeader={header?.stickyHeader}
          />
        )}
      </div>
    </DataTableWrapper>
  )
}
