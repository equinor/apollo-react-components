import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { UnitEvent } from 'mock-data'
import { ActionsCell, NumberCell } from './components'

const columnHelper = createColumnHelper<UnitEvent>()

export const unitEventColumns: ColumnDef<UnitEvent, any>[] = [
  columnHelper.accessor('location', {
    header: 'Location',
    size: 200,
  }),
  columnHelper.accessor('unit', {
    id: 'Unit',
    enableSorting: false,
    size: 220,
  }),
  columnHelper.accessor('from', {
    header: 'From',
    size: 80,
  }),
  columnHelper.accessor('to', {
    header: 'To',
  }),
  columnHelper.accessor('urgency', {
    header: 'Urgency',
    cell: NumberCell,
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
  }),
  columnHelper.accessor('comment', {
    header: 'Comment',
  }),
  columnHelper.accessor('isActive', {
    header: 'Active',
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated',
  }),
  columnHelper.display({
    header: 'Actions',
    cell: ActionsCell,
    size: 110,
    meta: { sticky: true },
  }),
]
