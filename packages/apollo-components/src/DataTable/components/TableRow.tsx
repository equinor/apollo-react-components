import { Table } from '@equinor/eds-core-react'
import { Row } from '@tanstack/react-table'
import { DynamicCell } from '../../cells'
import { RowConfig } from '../types'

type TableRowProps<T> = {
  row: Row<T>
  config?: RowConfig<T>
}

export function TableRow<T>({ row, config }: TableRowProps<T>) {
  return (
    <Table.Row
      active={row.getIsSelected()}
      style={{ cursor: config?.onClick ? 'pointer' : 'initial' }}
      onClick={() => config?.onClick?.(row)}
      onMouseEnter={handleRowEvent(row, config?.onMouseEnter)}
      onMouseLeave={handleRowEvent(row, config?.onMouseLeave)}
    >
      {row.getVisibleCells().map((cell) => (
        <DynamicCell cell={cell} key={cell.id} />
      ))}
    </Table.Row>
  )
}

function handleRowEvent<T>(row: Row<T>, handler?: (row: Row<T>) => void) {
  if (!handler) return undefined
  return () => {
    handler(row)
  }
}
