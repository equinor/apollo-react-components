import { Column, ColumnDef, HeaderContext } from '@tanstack/react-table'
import { SelectColumnDef } from '../cells'
import { DataTableConfig } from './types'

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
  config?: DataTableConfig<T>
) {
  if (!config) return columns
  if (!Boolean(config?.rowSelectionMode)) return columns

  return prependSelectColumn(columns, config)
}

/** Prepend a column definition array with a select column. */

export function prependSelectColumn<T>(columns: ColumnDef<T>[], config?: DataTableConfig<T>) {
  if (!config?.selectColumn) return columns
  if (config.selectColumn === 'default') return [SelectColumnDef<T>(config), ...columns]
  return [config.selectColumn(), ...columns]
}
