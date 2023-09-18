import { Column, ColumnDef, createColumnHelper, HeaderContext } from '@tanstack/react-table'
import { SelectColumnDef } from '../cells'
import { DataTableProps } from './types'

// Re-exports from react-table
export { createColumnHelper }

/**
 * Capitalize the table header.
 *
 * React table utility function.
 * @param context
 * @returns A capitalized header
 */
export function capitalizeHeader<T>(context: HeaderContext<T, any>) {
  const header = context.header.id
  return header.charAt(0).toUpperCase() + header.slice(1)
}

/**
 * Used to conditionally return any given value.
 *
 * @param enabled - A bool whether the value should be enabled or not
 * @param value - Any given value.
 * @returns Value or undefined
 */
export function enableOrUndefined<T>(enabled: boolean | undefined, value: T): T | undefined {
  return Boolean(enabled) ? value : undefined
}

/**
 * Get column header if set
 * @param column
 * @returns Column label
 */
export function getColumnHeader<T>(column: Column<T, any>) {
  const columnHeader = column.columnDef.header
  if (!columnHeader) return column.id
  return typeof columnHeader === 'string' ? columnHeader : column.id
}

/** Prepend a column definition array with a select column if enabled in the config. */
export function prependSelectColumnIfEnabled<T>(
  columns: ColumnDef<T, any>[],
  config?: DataTableProps<T>['rowSelection']
) {
  if (!config) return columns
  if (!Boolean(config?.mode)) return columns

  return prependSelectColumn(columns, config)
}

/** Prepend a column definition array with a select column. */

export function prependSelectColumn<T>(
  columns: ColumnDef<T>[],
  config?: DataTableProps<T>['rowSelection']
) {
  if (!config?.selectColumn) return columns
  if (config.selectColumn === 'default') return [SelectColumnDef<T>(config), ...columns]
  return [config.selectColumn(), ...columns]
}

/** Useful in cases where you either have a value, function or undefined. */
export function getFunctionValueOrDefault<T extends boolean | string | number, P>(
  valueOrFn: ((props: P) => T) | T | undefined,
  fnProps: P,
  defaultValue: T
) {
  if (valueOrFn === undefined) return defaultValue
  if (typeof valueOrFn === 'function') return valueOrFn(fnProps)
  return valueOrFn
}
