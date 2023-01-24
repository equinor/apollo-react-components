import { Button, Checkbox, Icon, Radio } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import { ColumnDef } from '@tanstack/table-core'
import styled from 'styled-components'
import { RowSelectionMode } from '../DataTable'

const CellWrapper = styled.div<{ paddingLeft?: string; rowDepth?: number }>`
  display: flex;
  align-items: center;
  width: 48px;
  margin-left: -16px;
  z-index: 2;
`

export function SelectColumnDef<T>(selectionMode?: RowSelectionMode): ColumnDef<T, any> {
  return {
    id: 'select',
    header: ({ table }) =>
      selectionMode !== 'single' ? (
        <CellWrapper>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            aria-label={table.getIsAllRowsSelected() ? 'Deselect all rows' : 'Select all rows'}
            onChange={table.getToggleAllRowsSelectedHandler()}
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
                onChange={(e) => {
                  e.stopPropagation()
                  row.getToggleSelectedHandler()(e)
                }}
              />
            ) : (
              <Checkbox
                checked={row.getIsSelected()}
                indeterminate={row.getIsSomeSelected()}
                aria-label={`Select row ${row.id}`}
                onChange={(e) => {
                  e.stopPropagation()
                  row.getToggleSelectedHandler()(e)
                }}
              />
            )}
            {row.getCanExpand() && table.options.enableExpanding && (
              <Button
                variant="ghost_icon"
                color="secondary"
                aria-label={row.getIsExpanded() ? 'Close group' : 'Expand group'}
                onClick={(e) => {
                  e.stopPropagation()
                  row.getToggleExpandedHandler()()
                }}
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