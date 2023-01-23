import { ColumnDef, Row } from '@tanstack/react-table'

export interface HeaderConfig {
  captionPadding?: string
  stickyHeader?: boolean
  tableCaption?: string
}

export interface FilterConfig {
  globalFilter?: boolean
  globalFilterPlaceholder?: string
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
  onRowClick?: (row: Row<T>) => void
} & ExpansionConfig

interface ExpansionConfig {
  expandAllByDefault?: boolean
  hideExpandControls?: boolean
}
