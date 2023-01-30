import { Cell, ColumnDef, Row } from '@tanstack/react-table'

export interface HeaderConfig {
  captionPadding?: string
  stickyHeader?: boolean
  tableCaption?: string
}

export interface FilterConfig {
  globalFilter?: boolean
  globalFilterPlaceholder?: string
  filterFromLeafRows?: boolean
}

export interface RowConfig<T> {
  getRowBackground?: (row: Row<T>) => string | undefined
  onClick?: (row: Row<T>) => void
  onMouseEnter?: (row: Row<T>) => void
  onMouseLeave?: (row: Row<T>) => void
}

export interface CellConfig<T> {
  getStickyCellColor?: (cell: Cell<T, unknown>) => string
}

export type RowSelectionMode = 'single' | 'multiple'

export type DataTableConfig<T> = {
  height?: string
  sortable?: boolean
  virtual?: boolean
  rowSelectionMode?: RowSelectionMode
  width?: string
  selectColumn?: 'default' | ((options?: Record<string, any>) => ColumnDef<T, any>)
  getSubRows?: (originalRow: T) => T[] | undefined
  getRowId?: (originalRow: T, index: number, parent: Row<T> | undefined) => string
} & ExpansionConfig

interface ExpansionConfig {
  expandAllByDefault?: boolean
  hideExpandControls?: boolean
}
