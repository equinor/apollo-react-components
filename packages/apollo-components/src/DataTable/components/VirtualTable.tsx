import { Table } from '@equinor/eds-core-react'
import { flexRender, Row, Table as TableType } from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
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
  const rowVirtualizer = useVirtual({
    overscan: 10,
    size: rows.length,
    parentRef: containerRef,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

  return (
    <Table>
      <TableHeader sticky={props.stickyHeader} table={table} />
      <Table.Body>
        <PaddingRow height={paddingTop} />
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<T>
          return (
            <Table.Row key={row.id}>
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
