import { Cell, ColumnDef, OnChangeFn, Row, SortingState, Table } from '@tanstack/react-table'
import { HTMLProps, MutableRefObject, ReactElement, ReactNode } from 'react'

export interface HeaderConfig {
  captionPadding?: string
  stickyHeader?: boolean
  tableCaption?: string
}

export interface FilterConfig {
  columnSelect?: boolean
  globalFilter?: boolean
  globalFilterPlaceholder?: string
  filterFromLeafRows?: boolean
  filterActions?: <T>(table: Table<T>) => ReactNode
}

export interface TableRowWrapper<T> {
  (props: TableRowWrapperProps<T>): ReactElement
}

export interface TableRowWrapperProps<T> {
  row: Row<T>
  children: ReactNode
}

export interface RowConfig<T> {
  /**
   * ! Unstable - Row Wrapper has not been tested for compatibility with virtualization. Use with caution.
   */
  rowWrapper?: TableRowWrapper<T>
  getRowBackground?: (row: Row<T>) => string | undefined
  onClick?: (row: Row<T>) => void
  onMouseEnter?: (row: Row<T>) => void
  onMouseLeave?: (row: Row<T>) => void
}

export type TruncateMode = 'wrap' | 'hover'

export type SortConfig = {
  enableSorting?: boolean
  manualSorting?: boolean
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
}

export interface CellConfig<T> {
  getStickyCellColor?: (cell: Cell<T, unknown>) => string
  getShouldHighlight?: (cell: Cell<T, unknown>) => boolean
  /**
   * Whether to wrap or truncate default cells. Accepts `"wrap"` or `"hover"` and  or a function returning a boolean.
   * Defauls to `"hover"` (i.e. all cells is truncated by default).
   *
   * ***Note**: This only applies to default cells. Custom cells need custom implementation.*
   */
  truncateMode?: TruncateMode | ((cell: Cell<T, unknown>) => TruncateMode)
}

export type RowSelectionMode = 'single' | 'multiple'

export type TableLayout = 'auto' | 'fixed'

export type DataTableConfig<T> = {
  height?: string
  /**
   * Defaults to `'auto'`.
   *
   * `'auto'` determines column width based on cell content.
   *
   * `'fixed'` uses fixed column width. Specify width (`size` property) in ColumnDef.
   * Default size is 150px.
   */
  tableLayout?: TableLayout
  /** @deprecated use `cellConfig.enableSorting` instead. This is to align with \@tanstack/react-table types. */
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

export type HTMLPropsRef<T extends HTMLElement> = HTMLProps<T> & {
  ref?: MutableRefObject<T | null> | null
}

export interface DataTableCommonProps<T> {
  isLoading?: boolean
  className?: string
  config?: DataTableConfig<T>
  cellConfig?: CellConfig<T>
  rowConfig?: RowConfig<T>
  sortConfig?: SortConfig
  filters?: FilterConfig
  header?: HeaderConfig
  tableContainerProps?: HTMLPropsRef<HTMLDivElement>
}

export interface DataTableProps<T> extends DataTableCommonProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
}

export interface DataTableRawProps<T> extends DataTableCommonProps<T> {
  table: Table<T>
}
