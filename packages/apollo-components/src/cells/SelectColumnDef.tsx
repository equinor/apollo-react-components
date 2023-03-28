import { Button, Checkbox, Icon, Radio } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import { ColumnDef } from '@tanstack/table-core'
import { stopPropagation } from 'apollo-common'
import styled from 'styled-components'
import { SetRequired } from 'type-fest'
import { DataTableProps } from '../DataTable'

const CellWrapper = styled.div<{ paddingLeft?: string; rowDepth?: number }>`
  display: flex;
  align-items: center;
  width: 48px;
  margin-left: -16px;
  z-index: 2;
`

export function SelectColumnDef<T>(
  props: SetRequired<DataTableProps<T>, 'rowSelection'>['rowSelection']
): ColumnDef<T, any> {
  const selectionMode = props.mode

  return {
    id: 'select',
    size: props.includeExpansionButton ? 96 : 48,
    header: ({ table }) =>
      selectionMode !== 'single' ? (
        <CellWrapper>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            aria-label={table.getIsAllRowsSelected() ? 'Deselect all rows' : 'Select all rows'}
            onChange={
              table.getIsSomeRowsSelected()
                ? () => table.toggleAllRowsSelected(false)
                : table.getToggleAllRowsSelectedHandler()
            }
          />
        </CellWrapper>
      ) : null,
    cell: ({ table, row }) => {
      const paddingLeft = '0px' // row.depth > 0 ? row.depth * 48 + 'px' : undefined
      return (
        <CellWrapper paddingLeft={paddingLeft} rowDepth={row.depth}>
          <>
            {selectionMode === 'single' ? (
              <Radio
                checked={row.getIsSelected()}
                aria-label={`Select row ${row.id}`}
                onChange={stopPropagation(row.getToggleSelectedHandler())}
              />
            ) : (
              <Checkbox
                checked={row.getIsSelected()}
                indeterminate={row.getIsSomeSelected()}
                aria-label={`Select row ${row.id}`}
                onChange={stopPropagation(row.getToggleSelectedHandler())}
              />
            )}
            {row.getCanExpand() && table.options.enableExpanding && (
              <Button
                variant="ghost_icon"
                color="secondary"
                aria-label={row.getIsExpanded() ? 'Close group' : 'Expand group'}
                onClick={stopPropagation(row.getToggleExpandedHandler())}
                style={{ cursor: 'pointer' }}
              >
                <Icon data={row.getIsExpanded() ? chevron_up : chevron_down} />
              </Button>
            )}
          </>
        </CellWrapper>
      )
    },
  }
}
