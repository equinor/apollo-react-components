import { Table } from '@equinor/eds-core-react'
import { Table as TableProp } from '@tanstack/react-table'
import { HeaderCell } from './HeaderCell'

interface TableHeaderProps {
  table: TableProp<any>
  sticky?: boolean
}

export const TableHeader = ({ table, sticky }: TableHeaderProps) => (
  <Table.Head sticky={sticky}>
    {table.getHeaderGroups().map((headerGroup) => (
      <Table.Row key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <HeaderCell header={header} key={header.id} />
        ))}
      </Table.Row>
    ))}
  </Table.Head>
)
