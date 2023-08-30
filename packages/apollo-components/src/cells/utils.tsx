import { Column, Table } from '@tanstack/react-table'
import { SyntheticEvent } from 'react'

/**
 * Generate a HSL color based on a given string.
 *
 * @param str - Any given string
 * @returns A valid hsl color
 */
export function stringToHslColor(str: string, s = 80, l = 85) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}

/** Wrap an event handler and stop event propagation */
export function stopPropagation<T extends HTMLElement>(handler: (e: SyntheticEvent<T>) => void) {
  return (e: SyntheticEvent<T>) => {
    e.stopPropagation()
    handler(e)
  }
}

/** Used for calculating the `right` px value of pinned cells */
export function getTotalRight<TData>(table: Table<TData>, column: Column<TData>) {
  return table
    .getRightLeafHeaders()
    .slice(column.getPinnedIndex() + 1)
    .reduce((acc, col) => acc + col.getSize(), 0)
}

export function getIsFirstRightPinnedColumn<TData>(column: Column<TData>) {
  return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0
}

export function getIsLastLeftPinnedColumn<TData>(table: Table<TData>, column: Column<TData>) {
  return (
    column.getIsPinned() === 'left' &&
    table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
  )
}
