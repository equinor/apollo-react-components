import { MutableRefObject, useRef } from 'react'
import styled from 'styled-components'
import { BasicTable } from './components/BasicTable'
import { DataTableHeader } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { useFetchMoreOnBottomReached } from './hooks'
import { DataTableRawProps, TableLayout } from './types'

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

export function DataTableRaw<T>(props: DataTableRawProps<T>) {
  const { isLoading, header, filters, config, rowConfig, cellConfig, table } = props
  const tableContainerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>

  // Infinite scroll
  const onTableContainerScroll = useFetchMoreOnBottomReached(
    tableContainerRef,
    props.infiniteScroll
  )

  return (
    <DataTableWrapper
      captionPadding={header?.captionPadding}
      height={config?.height}
      width={config?.width}
      tableLayout={config?.tableLayout}
    >
      <DataTableHeader
        tableCaption={header?.tableCaption}
        captionPadding={header?.captionPadding}
        table={table}
        config={filters}
      />
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
        {config?.virtual ? (
          <VirtualTable
            containerRef={tableContainerRef}
            table={table}
            rowConfig={rowConfig}
            cellConfig={cellConfig}
            isLoading={isLoading}
            stickyHeader={header?.stickyHeader}
          />
        ) : (
          <BasicTable
            table={table}
            rowConfig={rowConfig}
            cellConfig={cellConfig}
            isLoading={isLoading}
            stickyHeader={header?.stickyHeader}
          />
        )}
      </div>
    </DataTableWrapper>
  )
}
