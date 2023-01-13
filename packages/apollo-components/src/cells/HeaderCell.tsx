import { Icon, Table } from '@equinor/eds-core-react'
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons'
import { flexRender, Header } from '@tanstack/react-table'
import styled from 'styled-components'
import { StickyCell } from './StickyCell'
import { leftCellShadow } from './styles'

interface HeaderCellProps {
  header: Header<any, any>
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const StyledStickyCell = styled(StickyCell)`
  z-index: 5;
  ${leftCellShadow}
`

export const HeaderCell = ({ header }: HeaderCellProps) => {
  if (header.column.columnDef.meta?.sticky)
    return (
      <StyledStickyCell key={header.id} colSpan={header.colSpan}>
        <HeaderContent header={header} />
      </StyledStickyCell>
    )

  return (
    <Table.Cell key={header.id} colSpan={header.colSpan}>
      <HeaderContent header={header} />
    </Table.Cell>
  )
}

function HeaderContent({ header }: HeaderCellProps) {
  if (header.isPlaceholder) return null
  return (
    <HeaderDiv onClick={header.column.getToggleSortingHandler()}>
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: <Icon data={arrow_drop_down} />,
        desc: <Icon data={arrow_drop_up} />,
      }[header.column.getIsSorted() as string] ?? null}
    </HeaderDiv>
  )
}
