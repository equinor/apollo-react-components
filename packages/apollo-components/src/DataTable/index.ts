import { DataTable as BaseComponent } from './DataTable'
import { DataTableProvider } from './Provider'

type DataTableCompoundProps = typeof BaseComponent & {
  Provider: typeof DataTableProvider
}

const DataTable = BaseComponent as DataTableCompoundProps
DataTable.Provider = DataTableProvider

export { columnVisibilityAtom, globalFilterAtom, rowSelectionAtom, tableSortingAtom } from './atoms'
export * from './components'
export * from './types'
export { capitalizeHeader, prependSelectColumn } from './utils'
export { DataTable }
