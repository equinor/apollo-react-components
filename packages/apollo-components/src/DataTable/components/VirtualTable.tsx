import { Table } from '@equinor/eds-core-react'
import { Row, Table as TableType } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefObject } from 'react'
import { TableHeader } from '.'
import { CellConfig, RowConfig } from '../types'
import { PaddingRow } from './PaddingRow'
import { PlaceholderRow } from './PlaceholderRow'
import { TableBody } from './TableBody'
import { TableRow } from './TableRow'

export interface VirtualTableProps<T> {
  className?: string
  table: TableType<T>
  rowConfig: RowConfig<T> | undefined
  cellConfig: CellConfig<T> | undefined
  stickyHeader: boolean | undefined
  containerRef: RefObject<HTMLDivElement>
  isLoading: boolean | undefined
  estimatedSize?: number
}

export function VirtualTable<T>({
  table,
  rowConfig,
  cellConfig,
  containerRef,
  estimatedSize = 35,
  ...props
}: VirtualTableProps<T>) {
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => estimatedSize,
    getScrollElement: () => containerRef.current,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <Table>
      <TableHeader sticky={props.stickyHeader} table={table} />
      <TableBody>
        <PaddingRow height={paddingTop} />
        {rows.length ? (
          virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>
            return <TableRow key={row.id} row={row} rowConfig={rowConfig} cellConfig={cellConfig} />
          })
        ) : (
          <PlaceholderRow isLoading={props.isLoading} />
        )}
        <PaddingRow height={paddingBottom} />
      </TableBody>
    </Table>
  )
}
