import { Table } from '@equinor/eds-core-react'
import { Row } from '@tanstack/react-table'
import styled from 'styled-components'
import { DynamicCell } from '../../cells'
import { CellConfig, RowConfig } from '../types'

type TableRowProps<T> = {
  row: Row<T>
  rowConfig?: RowConfig<T>
  cellConfig?: CellConfig<T>
  measureElement?: (node: HTMLTableRowElement) => void
  index?: number
}

export function TableRow<T>({
  row,
  rowConfig,
  cellConfig,
  measureElement,
  index,
}: TableRowProps<T>) {
  const rowWrapper = rowConfig?.rowWrapper

  const tableRowContent = (
    <StyledTableRow
      active={row.getIsSelected()}
      data-index={index}
      ref={measureElement}
      style={{
        cursor: rowConfig?.onClick ? 'pointer' : 'initial',
        backgroundColor: rowConfig?.getRowBackground?.(row),
      }}
      onClick={() => rowConfig?.onClick?.(row)}
      onMouseEnter={handleRowEvent(row, rowConfig?.onMouseEnter)}
      onMouseLeave={handleRowEvent(row, rowConfig?.onMouseLeave)}
    >
      {row.getVisibleCells().map((cell) => (
        <DynamicCell
          cell={cell}
          key={cell.id}
          getStickyCellColor={cellConfig?.getStickyCellColor}
          highlight={cellConfig?.getShouldHighlight?.(cell)}
        />
      ))}
    </StyledTableRow>
  )

  return rowWrapper ? rowWrapper({ row, children: tableRowContent }) : tableRowContent
}

const StyledTableRow = styled(Table.Row)`
  /* Background color must be inherited here. Does not work with inline styling */
  ${({ active }) => (active ? '' : 'background-color: inherit;')}
`

function handleRowEvent<T>(row: Row<T>, handler?: (row: Row<T>) => void) {
  if (!handler) return undefined
  return () => {
    handler(row)
  }
}
