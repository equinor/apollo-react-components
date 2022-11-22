import { Button, Checkbox, Divider, Icon, Popover } from '@equinor/eds-core-react'
import { close, view_column } from '@equinor/eds-icons'
import { Table } from '@tanstack/react-table'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const ColumnSelectContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`

interface ColumnSelectProps<T> {
  table: Table<T>
}

export function ColumnSelect<T>({ table }: ColumnSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const referenceElement = useRef<HTMLButtonElement>(null)
  const selectableColumns = table.getAllLeafColumns().filter((column) => column.id !== 'select')

  return (
    <>
      <Button
        aria-haspopup
        id="column-select-anchor"
        aria-controls="column-select-popover"
        aria-expanded={isOpen}
        ref={referenceElement}
        variant="ghost_icon"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="view_column" data={view_column} />
      </Button>
      <Popover
        open={isOpen}
        id="column-select-popover"
        anchorEl={referenceElement.current}
        placement="bottom-end"
        onClose={() => setIsOpen(false)}
      >
        <Popover.Header>
          <Popover.Title>Column settings</Popover.Title>
          <Button
            variant="ghost_icon"
            aria-label="Close column select"
            onClick={() => setIsOpen(false)}
          >
            <Icon name="close" data={close} size={24} />
          </Button>
        </Popover.Header>
        <Popover.Content>
          <ColumnSelectContent>
            {selectableColumns.map((column) => {
              return (
                <Checkbox
                  key={column.id}
                  checked={column.getIsVisible()}
                  label={column.id}
                  onChange={column.getToggleVisibilityHandler()}
                />
              )
            })}
          </ColumnSelectContent>
          <Divider variant="small" />
          <ActionsWrapper>
            <Button
              color="secondary"
              variant="ghost"
              disabled={table.getIsAllColumnsVisible()}
              onClick={() => table.toggleAllColumnsVisible(true)}
            >
              Reset to default
            </Button>
          </ActionsWrapper>
        </Popover.Content>
      </Popover>
    </>
  )
}
