import { HeaderContext } from '@tanstack/react-table'

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
