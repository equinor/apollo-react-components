import { RowSelectionState, SortingState } from '@tanstack/react-table'
import { atom } from 'jotai'

export const rowSelectionAtom = atom<RowSelectionState>({})
export const tableSortingAtom = atom<SortingState>([])
export const globalFilterAtom = atom('')
