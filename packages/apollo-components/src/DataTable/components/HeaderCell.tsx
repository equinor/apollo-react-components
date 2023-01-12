import { Icon, Table } from '@equinor/eds-core-react'
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons'
import { flexRender, Header } from '@tanstack/react-table'
import styled from 'styled-components'

interface HeaderCellProps {
  header: Header<any, any>
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const HeaderCell = ({ header }: HeaderCellProps) => {
  return (
    <Table.Cell key={header.id} colSpan={header.colSpan}>
      {header.isPlaceholder ? null : (
        <HeaderDiv onClick={header.column.getToggleSortingHandler()}>
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: <Icon data={arrow_drop_down} />,
            desc: <Icon data={arrow_drop_up} />,
          }[header.column.getIsSorted() as string] ?? null}
        </HeaderDiv>
      )}
    </Table.Cell>
  )
}
