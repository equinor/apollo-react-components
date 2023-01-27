import { Table as EdsTable } from '@equinor/eds-core-react'
import { Table } from '@tanstack/react-table'
import { RowConfig } from '../types'
import { PlaceholderRow } from './PlaceholderRow'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

interface BasicTableProps<T> {
  table: Table<T>
  rowConfig?: RowConfig<T>
  stickyHeader?: boolean
  isLoading?: boolean
}

export function BasicTable<T>({ table, rowConfig, stickyHeader, isLoading }: BasicTableProps<T>) {
  const tableRows = table.getRowModel().rows
  return (
    <EdsTable>
      <TableHeader sticky={stickyHeader} table={table} />
      <EdsTable.Body>
        {tableRows.length ? (
          tableRows.map((row) => <TableRow key={row.id} row={row} config={rowConfig} />)
        ) : (
          <PlaceholderRow isLoading={isLoading} />
        )}
      </EdsTable.Body>
    </EdsTable>
  )
}
