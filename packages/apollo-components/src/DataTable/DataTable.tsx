import { DataTableRaw } from './DataTableRaw'
import { DataTableProps } from './types'
import { useDataTable } from './useDataTable'

export function DataTable<T>(props: DataTableProps<T>) {
  const table = useDataTable(props)
  return <DataTableRaw table={table} {...props} />
}
