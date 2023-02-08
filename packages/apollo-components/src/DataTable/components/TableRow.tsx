import { Table } from '@equinor/eds-core-react'
import { Row } from '@tanstack/react-table'
import { DynamicCell } from '../../cells'
import { CellConfig, RowConfig } from '../types'

type TableRowProps<T> = {
  row: Row<T>
  rowConfig?: RowConfig<T>
  cellConfig?: CellConfig<T>
}

export function TableRow<T>({ row, rowConfig, cellConfig }: TableRowProps<T>) {
  const rowWrapper = rowConfig?.rowWrapper

  const tableRowContent = (
    <Table.Row
      active={row.getIsSelected()}
      style={{ cursor: rowConfig?.onClick ? 'pointer' : 'initial' }}
      onClick={() => rowConfig?.onClick?.(row)}
      onMouseEnter={handleRowEvent(row, rowConfig?.onMouseEnter)}
      onMouseLeave={handleRowEvent(row, rowConfig?.onMouseLeave)}
    >
      {row.getVisibleCells().map((cell) => (
        <DynamicCell
          cell={cell}
          key={cell.id}
          getStickyCellColor={cellConfig?.getStickyCellColor}
        />
      ))}
    </Table.Row>
  )

  return rowWrapper ? rowWrapper({ row, children: tableRowContent }) : tableRowContent
}

function handleRowEvent<T>(row: Row<T>, handler?: (row: Row<T>) => void) {
  if (!handler) return undefined
  return () => {
    handler(row)
  }
}
