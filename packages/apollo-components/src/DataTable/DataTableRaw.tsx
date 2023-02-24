import { useRef } from 'react'
import styled from 'styled-components'
import { BasicTable } from './components/BasicTable'
import { DataTableHeader } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
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

      // The following attributes are important for fixed column width
      // CHANGE THES WITH CAUTION
      overflow: auto;
      table-layout: ${(props) => props.tableLayout ?? 'auto'};
    }
  }
`

export function DataTableRaw<T>(props: DataTableRawProps<T>) {
  const { isLoading, header, filters, config, rowConfig, table, styleOverwrites } = props
  const tableContainerRef = useRef<HTMLDivElement>(null)
  return (
    <DataTableWrapper
      captionPadding={header?.captionPadding}
      height={config?.height}
      width={config?.width}
      tableLayout={config?.tableLayout}
      style={styleOverwrites?.dataTableWrapper}
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
