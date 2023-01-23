import { Table as EdsTable } from '@equinor/eds-core-react'
import { flexRender, Table } from '@tanstack/react-table'
import { DataTableConfig } from '../types'
import { PlaceholderRow } from './PlaceholderRow'
import { TableHeader } from './TableHeader'

interface BasicTableProps<T> {
  table: Table<T>
  config?: DataTableConfig<T>
  stickyHeader?: boolean
  isLoading?: boolean
}

export function BasicTable<T>({ table, config, stickyHeader, isLoading }: BasicTableProps<T>) {
  const tableRows = table.getRowModel().rows
  return (
    <EdsTable>
      <TableHeader sticky={stickyHeader} table={table} />
      <EdsTable.Body>
        {tableRows.length ? (
          tableRows.map((row) => (
            <EdsTable.Row key={row.id} onClick={() => config?.onRowClick?.(row)}>
              {row.getVisibleCells().map((cell) => (
                <EdsTable.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </EdsTable.Cell>
              ))}
            </EdsTable.Row>
          ))
        ) : (
          <PlaceholderRow isLoading={isLoading} />
        )}
      </EdsTable.Body>
    </EdsTable>
  )
}
