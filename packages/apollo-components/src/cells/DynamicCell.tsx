import { Table } from '@equinor/eds-core-react'
import { Cell, flexRender } from '@tanstack/react-table'
import styled from 'styled-components'
import { StickyCell } from './StickyCell'
import { leftCellShadow } from './styles'

type TableCellProps<T> = {
  cell: Cell<T, unknown>
  highlight?: boolean
  getStickyCellColor?: (cell: Cell<T, unknown>) => string
}

type StyledStickyCellProps = {
  highlight?: boolean
  backgroundColor?: string
}

export const StyledStickyCell = styled(StickyCell)<StyledStickyCellProps>`
  background-clip: padding-box;
  ${leftCellShadow}
`

const StyledCell = styled(Table.Cell)<{ backgroundColor?: string }>`
  ${(props) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor} !important;` : ``}
`
/* TODO: Investigate why app crashes when this component is loaded in PokemonTable  */
export function DynamicCell<T>({ cell, highlight, getStickyCellColor }: TableCellProps<T>) {
  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext())

  if (cell.column.columnDef.meta?.sticky) {
    return (
      <StyledStickyCell backgroundColor={getStickyCellColor?.(cell)} data-column={cell.column.id}>
        {cellContent}
      </StyledStickyCell>
    )
  }

  return (
    <StyledCell data-column={cell.column.id} backgroundColor={highlight ? '#d5eaf4' : undefined}>
      {cellContent}
    </StyledCell>
  )
}
