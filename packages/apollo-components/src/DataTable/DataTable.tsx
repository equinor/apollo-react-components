import {
  ColumnPinningState,
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
import { TableBanner } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { fuzzyFilter } from './filters'
import { useFetchMoreOnBottomReached } from './hooks'
import { useForceRerender } from './hooks/useForceRerender'
import { DataTableProps, TableLayout } from './types'
import { enableOrUndefined, getFunctionValueOrDefault, prependSelectColumn } from './utils'

interface DataTableWrapperProps {
  width?: string
  height?: string
  captionPadding?: string
  tableLayout?: TableLayout
}

/**
 * Checks whether height has unit that can be used with `contain: strict;`. The unit has to be a
 * [dimension](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#numbers_lengths_and_percentages)
 * in order for strict to work. It cannot be a number or percentage.
 *
 * The function checks whether the height is a number or percentage. If not, `contain: strict;` can be used.
 *
 * @param height string
 */
function canUseContainStrict(height: string | undefined) {
  if (!height) return false

  // See: https://stackoverflow.com/a/175787/21022487
  const heightIsANumber = !isNaN(Number(height)) && !isNaN(parseFloat(height))
  if (heightIsANumber) return false

  const heightIsPercentage = height.endsWith('%')
  if (heightIsPercentage) return false

  return true
}

const DataTableWrapper = styled.div<DataTableWrapperProps>`
  width: ${(props) => props.width ?? '100%'};

  .--table-container {
    height: ${(props) => props.height ?? '100%'};
    width: '100%';
    overflow: auto;
    ${(props) => (canUseContainStrict(props.height) ? 'contain: strict;' : '')}

    table {
      width: 100%;

      // The following attribute is important for fixed column width
      // CHANGE THIS WITH CAUTION
      table-layout: ${(props) => props.tableLayout ?? 'auto'};
    }
  }
`

export function DataTable<T>(props: DataTableProps<T>) {
  const { columns, data, bannerConfig, cellConfig, sorting } = props

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
    props.bannerConfig?.enableGlobalFilterInput || Boolean(props.globalFilter)
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

  // Column pinning state
  const [internalColumnPinning, setInternalColumnPinning] = useState<ColumnPinningState>({})
  const [columnPinning, setColumnPinning] = [
    typeof props.columnPinning === 'object' && props.columnPinning.state
      ? props.columnPinning.state
      : internalColumnPinning,
    typeof props.columnPinning === 'object' && props.columnPinning.onChange
      ? props.columnPinning.onChange
      : setInternalColumnPinning,
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
      columnPinning,
    },
    defaultColumn: {
      cell: ({ cell }) => {
        const truncateMode = getFunctionValueOrDefault(cellConfig?.truncateMode, cell, 'hover')

        return (
          <TypographyCustom truncate={truncateMode === 'hover'} enableShowAllOnHover>
            {cell.getValue() as any}
          </TypographyCustom>
        )
      },
    },
    enableColumnResizing: Boolean(props.columnResizing),
    columnResizeMode: typeof props.columnResizing === 'boolean' ? 'onChange' : props.columnResizing,
    enableSorting: sorting?.enableSorting,
    manualSorting: sorting?.manualSorting,
    enableExpanding: Boolean(props.expansion),
    enableMultiRowSelection: props.rowSelection?.mode === 'multiple',
    enableSubRowSelection: props.rowSelection?.mode !== 'single',
    filterFromLeafRows: bannerConfig?.filterFromLeafRows,
    enablePinning:
      props.columnPinning !== undefined &&
      (typeof props.columnPinning === 'boolean' ? props.columnPinning : props.columnPinning.enable),
    getFilteredRowModel: enableGlobalFilter(getFilteredRowModel()),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpandedState,
    onRowSelectionChange: setRowSelectionState,
    onColumnPinningChange: setColumnPinning,
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

  // Force rerender table component when tableContainerRef value is set. This is hacky, but fixes
  // an issue where the table only rendered a few rows. The reason for the bug was that a change in
  // the tableContainerRef.current does not trigger a rerender. Since the virtualization requires
  // tableContainerRef.current to be set in order to work properly and the table never got rendered
  // with the ref defined it led to an edge case bug where only the overscan rendered.
  // CHANGE WITH CAUTION
  const forceRerender = useForceRerender()
  useEffect(() => {
    if (Boolean(tableContainerRef.current)) forceRerender()
  }, [tableContainerRef.current === null])

  return (
    <DataTableWrapper height={props?.height} width={props?.width} tableLayout={props?.tableLayout}>
      {props.bannerConfig && (
        <TableBanner
          table={table}
          bannerConfig={props.bannerConfig}
          globalFilter={{ state: globalFilterState, onChange: setGlobalFilterState }}
          tableCaption={props.tableCaption}
        />
      )}
      <div
        {...props.tableContainerProps}
        className={'--table-container ' + (props.tableContainerProps?.className ?? '')}
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
            stickyHeader={props.stickyHeader}
          />
        ) : (
          <BasicTable
            tableCaption={props.tableCaption}
            table={table}
            rowConfig={rowConfig}
            cellConfig={cellConfig}
            isLoading={isLoading}
            stickyHeader={props.stickyHeader}
          />
        )}
      </div>
    </DataTableWrapper>
  )
}
