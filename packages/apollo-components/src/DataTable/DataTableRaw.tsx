import { useRef } from 'react'
import styled from 'styled-components'
import { BasicTable } from './components/BasicTable'
import { DataTableHeader } from './components/DataTableHeader'
import { VirtualTable } from './components/VirtualTable'
import { DataTableRawProps } from './types'

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

export function DataTableRaw<T>(props: DataTableRawProps<T>) {
  const { isLoading, header, filters, config, rowConfig, table } = props
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
