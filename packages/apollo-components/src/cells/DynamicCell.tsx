import { Table } from '@equinor/eds-core-react'
import { Cell, flexRender } from '@tanstack/react-table'
import styled from 'styled-components'
import { StickyCell } from './StickyCell'

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
  ${(props) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor} !important;` : ``}
`

const StyledCell = styled(Table.Cell)<{ backgroundColor?: string }>`
  ${(props) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor} !important;` : ``}
`
/* TODO: Investigate why app crashes when this component is loaded in PokemonTable  */
export function DynamicCell<T>({ cell, highlight, getStickyCellColor }: TableCellProps<T>) {
  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext())

  /*
   * https://github.com/TanStack/table/discussions/4104
   * tricky to support declaration merging in a library wrapping
   */
  if ((cell.column.columnDef.meta as any)?.sticky) {
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
