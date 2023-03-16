import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { TypographyCustom } from '../cells'
import { BasicTable } from './components/BasicTable'
import { ActionsHeaderRow } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { fuzzyFilter } from './filters'
import { useFetchMoreOnBottomReached } from './hooks'
import { DataTableProps, TableLayout } from './types'
import { enableOrUndefined, getFunctionValueOrDefault, prependSelectColumn } from './utils'

interface DataTableWrapperProps {
  width?: string
  height?: string
  captionPadding?: string
  tableLayout?: TableLayout
}

const DataTableWrapper = styled.div<DataTableWrapperProps>`
  width: ${(props) => props.width ?? '100%'};

  .--table-container {
    height: ${(props) => props.height ?? '100%'};
    width: ${(props) => props.width ?? '100%'};
    overflow: auto;

    table {
      width: 100%;

      // The following attribute is important for fixed column width
      // CHANGE THES WITH CAUTION
      table-layout: ${(props) => props.tableLayout ?? 'auto'};
    }
  }
`

export function DataTable<T>(props: DataTableProps<T>) {
  const { columns, data, actionsRow, cellConfig, sorting } = props

  // Column visibility
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>({})
  const [columnVisibility, setColumnVisibility] = [
    props.columnVisibility?.state ?? internalColumnVisibility,
    props.columnVisibility?.onChange ?? setInternalColumnVisibility,
  ]

  // Global filter
  const [internalGlobalFilterState, setInternalGlobalFilterState] = useState<string>('')
  const [globalFilterState, setGlobalFilterState] = [
    props.globalFilter?.state ?? internalGlobalFilterState,
    props.globalFilter?.onChange ?? setInternalGlobalFilterState,
  ]
  const shouldEnableGlobalFilter =
    props.actionsRow?.enableGlobalFilterInput || Boolean(props.globalFilter)
  function enableGlobalFilter<T>(value: T) {
    return enableOrUndefined(shouldEnableGlobalFilter, value)
  }

  // Sorting state
  const [internalSortingState, setInternalSortingState] = useState<SortingState>([])
  const [sortingState, setSortingState] = [
    props.sorting?.state ?? internalSortingState,
    props.sorting?.onChange ?? setInternalSortingState,
  ]

  // Row selection state
  const [internalRowSelectionState, setInternalRowSelectionState] = useState<RowSelectionState>({})
  const [rowSelectionState, setRowSelectionState] = [
    props.rowSelection?.state ?? internalRowSelectionState,
    props.rowSelection?.onChange ?? setInternalRowSelectionState,
  ]

  // Expanded state
  const [internalExpandedState, setInternalExpandedState] = useState<ExpandedState>({})
  const [expandedState, setExpandedState] = [
    props.expansion?.state ?? internalExpandedState,
    props.expansion?.onChange ?? setInternalExpandedState,
  ]

  const table = useReactTable({
    columns: prependSelectColumn(columns, props.rowSelection),
    data: data,
    globalFilterFn: enableGlobalFilter(fuzzyFilter),

    state: {
      expanded: expandedState,
      globalFilter: enableGlobalFilter(globalFilterState),
      sorting: props.sorting?.enableSorting ? props.sorting?.state ?? sortingState : undefined,
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
    enableSorting: sorting?.enableSorting,
    manualSorting: sorting?.manualSorting,
    enableExpanding: Boolean(props.expansion),
    enableMultiRowSelection: props.rowSelection?.mode === 'multiple',
    enableSubRowSelection: props.rowSelection?.mode !== 'single',
    filterFromLeafRows: actionsRow?.filterFromLeafRows,
    getFilteredRowModel: enableGlobalFilter(getFilteredRowModel()),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpandedState,
    onRowSelectionChange: setRowSelectionState,
    onSortingChange: sorting?.enableSorting ? sorting?.onChange ?? setSortingState : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: enableGlobalFilter(setGlobalFilterState),
    getSubRows: props?.getSubRows,
    getRowId: props?.getRowId,
  })

  useEffect(() => {
    if (props.expansion?.expandAllByDefault) {
      table.toggleAllRowsExpanded()
    }
  }, [table, props.expansion?.expandAllByDefault])

  const { isLoading, rowConfig } = props
  const tableContainerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>

  // Infinite scroll
  const onTableContainerScroll = useFetchMoreOnBottomReached(
    tableContainerRef,
    props.infiniteScroll
  )

  return (
    <DataTableWrapper height={props?.height} width={props?.width} tableLayout={props?.tableLayout}>
      {props.actionsRow && (
        <ActionsHeaderRow
          table={table}
          actionsRow={props.actionsRow}
          globalFilter={{ state: globalFilterState, onChange: setGlobalFilterState }}
          tableCaption={props.tableCaption}
        />
      )}
      <div
        {...props.tableContainerProps}
        className={'--table-container ' + props.tableContainerProps?.className ?? ''}
        onScroll={props.tableContainerProps?.onScroll ?? onTableContainerScroll}
        ref={(node: HTMLDivElement) => {
          if (node) {
            tableContainerRef.current = node
            if (props.tableContainerProps?.ref) {
              props.tableContainerProps.ref.current = node
            }
          }
        }}
      >
        {props?.virtual ? (
          <VirtualTable
            containerRef={tableContainerRef}
            tableCaption={props.tableCaption}
            table={table}
            rowConfig={rowConfig}
            cellConfig={cellConfig}
            isLoading={isLoading}
            stickyHeader={props.headerConfig?.sticky}
          />
        ) : (
          <BasicTable
            tableCaption={props.tableCaption}
            table={table}
            rowConfig={rowConfig}
            cellConfig={cellConfig}
            isLoading={isLoading}
            stickyHeader={props.headerConfig?.sticky}
          />
        )}
      </div>
    </DataTableWrapper>
  )
}
