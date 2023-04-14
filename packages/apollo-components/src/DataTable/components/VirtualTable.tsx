import { Table } from '@equinor/eds-core-react'
import { Row } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefObject } from 'react'
import { TableHeader } from '.'
import { BasicTableProps } from './BasicTable'
import { PaddingRow } from './PaddingRow'
import { PlaceholderRow } from './PlaceholderRow'
import { TableBody } from './TableBody'
import { TableRow } from './TableRow'

export interface VirtualTableProps<T> extends BasicTableProps<T> {
  className?: string
  containerRef: RefObject<HTMLDivElement>
}

export function VirtualTable<T>({
  table,
  rowConfig,
  cellConfig,
  containerRef,
  ...props
}: VirtualTableProps<T>) {
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    getScrollElement: () => containerRef.current,
    // measureElement: (element) => element?.getBoundingClientRect().height,
    overscan: 5,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <Table>
      <Table.Caption hidden>{props.tableCaption}</Table.Caption>
      <TableHeader sticky={props.stickyHeader} table={table} />
      <TableBody>
        <PaddingRow height={paddingTop} />
        {rows.length ? (
          virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>
            return (
              <TableRow
                key={row.id}
                row={row}
                rowConfig={rowConfig}
                cellConfig={cellConfig}
                index={virtualRow.index}
                //  measureElement={rowVirtualizer.measureElement}
              />
            )
          })
        ) : (
          <PlaceholderRow isLoading={props.isLoading} />
        )}
        <PaddingRow height={paddingBottom} />
      </TableBody>
    </Table>
  )
}
