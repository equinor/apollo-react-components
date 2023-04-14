import { Row } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefObject } from 'react'
import { BasicTableProps } from './BasicTable'
import { PaddingRow } from './PaddingRow'
import { PlaceholderRow } from './PlaceholderRow'
import { TableBody } from './TableBody'
import { TableRow } from './TableRow'

export interface VirtualTableBodyProps<T> extends BasicTableProps<T> {
  className?: string
  containerRef: RefObject<HTMLDivElement>
}

export function VirtualTableBody<T>({
  table,
  rowConfig,
  cellConfig,
  containerRef,
  ...props
}: VirtualTableBodyProps<T>) {
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    measureElement: (element) => element?.getBoundingClientRect().height,
    overscan: 2,
  })

  if (!rowVirtualizer) return null

  const virtualRows = rowVirtualizer.getVirtualItems()
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <TableBody style={{ height: rowVirtualizer.getTotalSize() }}>
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
              measureElement={rowVirtualizer.measureElement}
              index={virtualRow.index}
            />
          )
        })
      ) : (
        <PlaceholderRow isLoading={props.isLoading} />
      )}
      <PaddingRow height={paddingBottom} />
    </TableBody>
  )
}
