import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { TypographyCustom } from '../cells'
import { fuzzyFilter } from './filters'
import { DataTableProps } from './types'
import { enableOrUndefined, getFunctionValueOrDefault, prependSelectColumn } from './utils'

export function useDataTable<T>(props: DataTableProps<T>): Table<T> {
  const { columns, data, filters, config, cellConfig, sortConfig, state } = props
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})

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
      sorting:
        sortConfig?.enableSorting || config?.sortable ? sortConfig?.sorting ?? sorting : undefined,
      rowSelection: rowSelectionState,
      columnVisibility,
    },
    defaultColumn: {
      cell: ({ cell }) => {
        const truncateMode = getFunctionValueOrDefault(cellConfig?.truncateMode, cell, 'hover')

        return (
          <TypographyCustom truncate={truncateMode === 'hover'}>
            {cell.getValue() as any}
          </TypographyCustom>
        )
      },
    },
    enableSorting: sortConfig?.enableSorting ?? config?.sortable,
    manualSorting: sortConfig?.manualSorting,
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
    onSortingChange:
      sortConfig?.enableSorting || config?.sortable
        ? sortConfig?.onSortingChange ?? setSorting
        : undefined,
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

  return table
}
