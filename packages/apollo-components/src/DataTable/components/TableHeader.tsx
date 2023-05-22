import { Table } from '@equinor/eds-core-react'
import { Table as TableProp } from '@tanstack/react-table'
import { HeaderCell } from '../../cells/HeaderCell'

interface TableHeaderProps<T> {
  table: TableProp<T>
  sticky?: boolean
}

export function TableHeader<T>({ table, sticky }: TableHeaderProps<T>) {
  return (
    <Table.Head sticky={sticky}>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <HeaderCell header={header} key={header.id} table={table} />
          ))}
        </Table.Row>
      ))}
    </Table.Head>
  )
}
