import { Table as EdsTable } from '@equinor/eds-core-react'
import { Table } from '@tanstack/react-table'
import { CellConfig, RowConfig } from '../types'
import { PlaceholderRow } from './PlaceholderRow'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

interface BasicTableProps<T> {
  table: Table<T>
  rowConfig: RowConfig<T> | undefined
  cellConfig: CellConfig<T> | undefined
  stickyHeader: boolean | undefined
  isLoading: boolean | undefined
}

export function BasicTable<T>({
  table,
  rowConfig,
  cellConfig,
  stickyHeader,
  isLoading,
}: BasicTableProps<T>) {
  const tableRows = table.getRowModel().rows
  return (
    <EdsTable>
      <TableHeader sticky={stickyHeader} table={table} />
      <TableBody>
        {tableRows.length ? (
          tableRows.map((row) => (
            <TableRow key={row.id} row={row} rowConfig={rowConfig} cellConfig={cellConfig} />
          ))
        ) : (
          <PlaceholderRow isLoading={isLoading} />
        )}
      </TableBody>
    </EdsTable>
  )
}
