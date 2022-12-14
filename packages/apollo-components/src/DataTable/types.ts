export interface HeaderConfig {
  captionPadding?: string
  stickyHeader?: boolean
  tableCaption?: string
}

export interface FilterConfig {
  globalFilter?: boolean
  globalFilterPlaceholder?: string
}

export interface DataTableConfig {
  height?: string
  sortable?: boolean
  virtual?: boolean
  rowSelection?: 'multiple' | 'single'
  width?: string
}
