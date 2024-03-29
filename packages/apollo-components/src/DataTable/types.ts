import type {
  Cell,
  CellContext,
  ColumnDef,
  ColumnPinningState,
  ColumnResizeMode,
  ColumnSort,
  ExpandedState,
  HeaderContext,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table'
import type {
  Dispatch,
  HTMLProps,
  MutableRefObject,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react'

// Re-exports from react-table
export type {
  Cell,
  CellContext,
  ColumnDef,
  ColumnPinningState,
  ColumnResizeMode,
  ColumnSort,
  ExpandedState,
  HeaderContext,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
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
  /**
   * Whatever is returned from this function will be added as a data-id attribute on the tr in the dom.
   */
  getDataIdAttribute?: (row: Row<T>) => string | undefined
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
  /**
   * Manually set the cell background color. Prioritized over highlight color.
   *
   * @param cell
   * @returns color in hex, rgb or rgba, undefined to use default
   */
  getCellColor?: (cell: Cell<T, unknown>) => string | undefined
}

export type RowSelectionMode = 'single' | 'multiple'

export type TableLayout = 'auto' | 'fixed'

export interface HTMLPropsRef<T extends HTMLElement> extends HTMLProps<T> {
  ref?: MutableRefObject<T | null> | null
}

export interface InfiniteScrollConfig {
  /** Called on scroll below offset. */
  onBottomScroll: () => void
  /** Pixels above bottom. Defines when the onBottomScroll should be called. Defaults to `300`. */
  offset?: number
}

export interface DataTableProps<T> {
  tableCaption: string
  data: T[]
  columns: ColumnDef<T, any>[]

  cellConfig?: CellConfig<T>
  rowConfig?: RowConfig<T>

  isLoading?: boolean
  height?: string
  width?: string
  stickyHeader?: boolean
  /**
   * Defaults to `'auto'`.
   *
   * `'auto'` determines column width based on cell content.
   *
   * `'fixed'` uses fixed column width. Specify width (`size` property) in ColumnDef.
   * Default size is 150px.
   */
  tableLayout?: TableLayout
  virtual?: boolean
  getRowId?: (originalRow: T, index: number, parent: Row<T> | undefined) => string
  getSubRows?: (originalRow: T) => T[] | undefined
  columnResizing?: boolean | ColumnResizeMode
  rowSelection?: Partial<ControlledState<RowSelectionState>> & {
    mode?: RowSelectionMode
    selectColumn?: 'default' | ((options?: Record<string, any>) => ColumnDef<T, any>)
    includeExpansionButton?: boolean
  }
  expansion?: Partial<ControlledState<ExpandedState>> & {
    expandAllByDefault?: boolean
  }
  sorting?: Partial<ControlledState<SortingState>> & {
    enableSorting?: boolean
    manualSorting?: boolean
  }
  columnPinning?:
    | boolean
    | (ControlledState<ColumnPinningState> & {
        enable?: boolean
      })
  globalFilter?: ControlledState<string>
  columnVisibility?: ControlledState<VisibilityState>
  /**
   * Everything that has todo with the area (banner) over the table
   */
  bannerConfig?: {
    enableTableCaption?: boolean
    totalRowCount?: number
    enableColumnSelect?: boolean
    enableGlobalFilterInput?: boolean
    globalFilterPlaceholder?: string
    columnSelectPlaceholder?: string
    filterFromLeafRows?: boolean
    /**
     * @deprecated Use `customActionsLeft` instead
     */
    customActions?: <T>(table: Table<T>) => ReactNode
    customActionsLeft?: <T>(table: Table<T>) => ReactNode
    customActionsRight?: <T>(table: Table<T>) => ReactNode
    /**
     * Default 1rem
     * Accepts any CSS padding value
     */
    padding?: string
  }
  tableContainerProps?: HTMLPropsRef<HTMLDivElement>
  infiniteScroll?: InfiniteScrollConfig
}

type ControlledState<T> = {
  state?: T
  /** Callback when state chagnes. Using this requires the state to be fully controlled. */
  onChange?: Dispatch<SetStateAction<T>>
}
