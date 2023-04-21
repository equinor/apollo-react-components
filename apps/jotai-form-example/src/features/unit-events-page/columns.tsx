import {
  EditableCheckboxCell,
  EditableDropdownSingleCell,
  EditableNumberCell,
  EditableTextAreaCell,
} from '@equinor/apollo-components'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { locationOptions } from 'mock-data/src/unit-events/unitEvents'
import { ActionsCell } from './components'
import { UnitEvent } from './types'

const columnHelper = createColumnHelper<UnitEvent>()

export const unitEventColumns: ColumnDef<UnitEvent, any>[] = [
  columnHelper.accessor('location', {
    header: 'Location',
    size: 200,
    cell: (context) => (
      <EditableDropdownSingleCell
        options={locationOptions.map((option) => ({ label: option, value: option }))}
        {...context}
      />
    ),
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
    cell: EditableNumberCell,
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
  }),
  columnHelper.accessor('comment', {
    header: 'Comment',
    cell: (context) => <EditableTextAreaCell {...context} title="Comment" />,
  }),
  columnHelper.accessor('isActive', {
    header: 'Active',
    cell: EditableCheckboxCell,
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
