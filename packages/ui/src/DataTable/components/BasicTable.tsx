import { Table as EdsTable } from '@equinor/eds-core-react'
import { flexRender, Table } from '@tanstack/react-table'
import { TableHeader } from './TableHeader'

interface BasicTableProps<T> {
  table: Table<T>
  stickyHeader?: boolean
}

export function BasicTable<T>({ table, stickyHeader }: BasicTableProps<T>) {
  return (
    <EdsTable>
      <TableHeader sticky={stickyHeader} table={table} />
      <EdsTable.Body>
        {table.getRowModel().rows.map((row) => (
          <EdsTable.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <EdsTable.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </EdsTable.Cell>
            ))}
          </EdsTable.Row>
        ))}
      </EdsTable.Body>
    </EdsTable>
  )
}
