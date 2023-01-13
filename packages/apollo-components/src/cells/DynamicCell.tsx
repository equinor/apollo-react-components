import { Table } from '@equinor/eds-core-react'
import { Cell, flexRender } from '@tanstack/react-table'
import styled from 'styled-components'
import { StickyCell } from './StickyCell'
import { leftCellShadow } from './styles'

type TableCellProps<T> = {
  cell: Cell<T, unknown>
  highlight?: boolean
}

type StyledStickyCellProps = {
  highlight?: boolean
}

export const StyledStickyCell = styled(StickyCell)<StyledStickyCellProps>`
  background-clip: padding-box;
  ${leftCellShadow}
`

const StyledCell = styled(Table.Cell)<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor + ' !important' : undefined};
`
/* TODO: Investigate why app crashes when this component is loaded in PokemonTable  */
export function DynamicCell<T>({ cell, highlight }: TableCellProps<T>) {
  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext())

  if (cell.column.columnDef.meta?.sticky) {
    return <StyledStickyCell data-column={cell.column.id}>{cellContent}</StyledStickyCell>
  }

  return (
    <StyledCell data-column={cell.column.id} backgroundColor={highlight ? '#d5eaf4' : undefined}>
      {cellContent}
    </StyledCell>
  )
}
