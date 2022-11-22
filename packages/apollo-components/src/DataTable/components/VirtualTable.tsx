import { Table } from '@equinor/eds-core-react'
import { flexRender, Row, Table as TableType } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefObject } from 'react'
import { TableHeader } from '.'
import { PaddingRow } from './PaddingRow'

export interface VirtualTableProps<T> {
  className?: string
  table: TableType<T>
  stickyHeader?: boolean
  containerRef: RefObject<HTMLDivElement>
}

export function VirtualTable<T>({ table, containerRef, ...props }: VirtualTableProps<T>) {
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 35,
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
      <Table.Body>
        <PaddingRow height={paddingTop} />
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<T>
          return (
            <Table.Row key={row.id} active={row.getIsSelected()}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          )
        })}
        <PaddingRow height={paddingBottom} />
      </Table.Body>
    </Table>
  )
}
