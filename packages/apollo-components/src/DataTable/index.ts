import { DataTable as BaseComponent } from './DataTable'
import { DataTableProvider } from './Provider'

type DataTableCompoundProps = typeof BaseComponent & {
  Provider: typeof DataTableProvider
}

const DataTable = BaseComponent as DataTableCompoundProps
DataTable.Provider = DataTableProvider

export { globalFilterAtom, rowSelectionAtom, tableSortingAtom } from './atoms'
export * from './components'
export * from './types'
export { prependSelectColumn } from './utils'
export { DataTable }
