import {
  ExpandedState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import { atom } from 'jotai'

export const columnVisibilityAtom = atom<VisibilityState>({})
export const globalFilterAtom = atom('')
export const rowSelectionAtom = atom<RowSelectionState>({})
export const tableSortingAtom = atom<SortingState>([])
export const expandedRowsAtom = atom<ExpandedState>({})
