import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { TypographyCustom } from '../cells'
import {
  columnVisibilityAtom,
  expandedRowsAtom,
  globalFilterAtom,
  rowSelectionAtom,
  tableSortingAtom,
} from './atoms'
import { fuzzyFilter } from './filters'
import { DataTableProps } from './types'
import { enableOrUndefined, getFunctionValueOrDefault, prependSelectColumn } from './utils'

export function useDataTable<T>(props: DataTableProps<T>): Table<T> {
  const { columns, data, filters, config, cellConfig } = props
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
      cell: ({ cell }) => {
        const truncateMode = getFunctionValueOrDefault(cellConfig?.truncateMode, cell, 'hover')

        return (
          <TypographyCustom truncate={truncateMode === 'hover'}>
            {cell.getValue() as any}
          </TypographyCustom>
        )
      },
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

  return table
}
