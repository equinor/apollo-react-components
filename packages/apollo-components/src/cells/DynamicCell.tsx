import { Table as EdsTable } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import { Cell, flexRender } from '@tanstack/react-table'
import styled from 'styled-components'
import { CellConfig } from '../DataTable'
import { StickyCell } from './StickyCell'
import { getIsFirstRightPinnedColumn, getIsLastLeftPinnedColumn, getTotalRight } from './utils'

type TableCellProps<T> = {
  cell: Cell<T, unknown>
  cellConfig?: CellConfig<T>
}

type StyledStickyCellProps = {
  backgroundColor?: string
}

export const StyledStickyCell = styled(StickyCell)<StyledStickyCellProps>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? `${backgroundColor} !important` : `inherit`};
`

const StyledCell = styled(EdsTable.Cell)<StyledStickyCellProps>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? `${backgroundColor} !important` : `inherit`};
`
/* TODO: Investigate why app crashes when this component is loaded in PokemonTable  */
export function DynamicCell<T>({ cell, cellConfig }: TableCellProps<T>) {
  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext())

  const columnPinningDirection = cell.column.getIsPinned()
  const stickyCellColor = cellConfig?.getStickyCellColor?.(cell)
  const regularCellColor =
    cellConfig?.getCellColor?.(cell) ??
    (cellConfig?.getShouldHighlight?.(cell) ? '#d5eaf4' : undefined)

  if (columnPinningDirection) {
    return (
      <EdsTable.Cell
        data-column={cell.column.id}
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: stickyCellColor ?? 'inherit',
          zIndex: 5,
          backgroundClip: 'padding-box',
          display: 'table-cell',
          ...(columnPinningDirection === 'left'
            ? {
                left: `${cell.column.getStart('left')}px`,
                borderRight: getIsLastLeftPinnedColumn(cell.getContext().table, cell.column)
                  ? `1px solid ${tokens.colors.ui.background__medium.hex}`
                  : undefined,
              }
            : {
                right: `${getTotalRight(cell.getContext().table, cell.column)}px`,
                borderLeft: getIsFirstRightPinnedColumn(cell.column)
                  ? `1px solid ${tokens.colors.ui.background__medium.hex}`
                  : undefined,
              }),
        }}
      >
        {cellContent}
      </EdsTable.Cell>
    )
  }

  /*
   * https://github.com/TanStack/table/discussions/4104
   * tricky to support declaration merging in a library wrapping
   */
  if ((cell.column.columnDef.meta as any)?.sticky) {
    return (
      <StyledStickyCell backgroundColor={stickyCellColor} data-column={cell.column.id}>
        {cellContent}
      </StyledStickyCell>
    )
  }

  return (
    <StyledCell data-column={cell.column.id} backgroundColor={regularCellColor}>
      {cellContent}
    </StyledCell>
  )
}
