import { CellProps, Icon, Table as EdsTable } from '@equinor/eds-core-react'
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons'
import { tokens } from '@equinor/eds-tokens'
import { flexRender, Header, Table } from '@tanstack/react-table'
import { AriaAttributes, CSSProperties } from 'react'
import styled, { css } from 'styled-components'
import { StickyHeaderCell } from './StickyCell'

interface HeaderCellProps<TData, TValue> {
  header: Header<TData, TValue>
  /** Needed for column resizing */
  table: Table<TData>
}

const resizeCellStyle = css`
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 4px;
    opacity: 0;
    background: #aaa;
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }

  .resizer.isResizing {
    background: ${tokens.colors.interactive.focus.hex};
    opacity: 1;
  }

  &:hover .resizer {
    opacity: 1;
  }
`

const StickyCell = styled(StickyHeaderCell)`
  ${resizeCellStyle}
`

const Cell = styled(EdsTable.Cell)`
  ${resizeCellStyle}
`

export const HeaderCell = <TData, TValue>({ header, table }: HeaderCellProps<TData, TValue>) => {
  const style: CSSProperties = {
    width: header.column.getSize(),
    zIndex: 10,
  }

  const cellProps: CellProps = {
    style,
    sort: getSort(header),
    onClick: header.column.getToggleSortingHandler(),
    colSpan: header.colSpan,
  }

  /*
   * https://github.com/TanStack/table/discussions/4104
   * tricky to support declaration merging in a library wrapping
   */
  if ((header.column.columnDef.meta as any)?.sticky) {
    return (
      <StickyCell key={header.id} {...cellProps}>
        <HeaderContent header={header} table={table} />
      </StickyCell>
    )
  }

  return (
    <Cell key={header.id} {...cellProps}>
      <HeaderContent header={header} table={table} />
    </Cell>
  )
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 5;
`

function HeaderContent<TData, TValue>({ header, table: table }: HeaderCellProps<TData, TValue>) {
  if (header.isPlaceholder) return null
  return (
    <HeaderDiv>
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: <Icon data={arrow_drop_up} />,
        desc: <Icon data={arrow_drop_down} />,
        none: <Icon data={arrow_drop_down} />,
      }[header.column.getIsSorted() as string] ?? null}
      {table.options.enableColumnResizing && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          onClick={(e) => e.stopPropagation()}
          className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
          style={{
            transform:
              table.options.columnResizeMode === 'onEnd' && header.column.getIsResizing()
                ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                : '',
          }}
        />
      )}
    </HeaderDiv>
  )
}

function getSort<TData, TValue>({ column }: Header<TData, TValue>): AriaAttributes['aria-sort'] {
  if (!column.getCanSort()) return undefined
  switch (column.getIsSorted()) {
    case 'asc':
      return 'ascending'
    case 'desc':
      return 'descending'
    default:
      return 'none'
  }
}
