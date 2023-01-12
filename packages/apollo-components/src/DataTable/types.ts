import { ColumnDef } from '@tanstack/react-table'

export interface HeaderConfig {
  captionPadding?: string
  stickyHeader?: boolean
  tableCaption?: string
}

export interface FilterConfig {
  globalFilter?: boolean
  globalFilterPlaceholder?: string
}

export type DataTableConfig<T> = {
  height?: string
  sortable?: boolean
  virtual?: boolean
  rowSelection?: 'multiple' | 'single'
  width?: string
  selectColumn?: 'default' | ((options?: Record<string, any>) => ColumnDef<T, any>)
  getSubRows?: (originalRow: T) => T[] | undefined
} & ExpansionConfig

interface ExpansionConfig {
  expandAllByDefault?: boolean
  hideExpandControls?: boolean
}
