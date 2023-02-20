import { CellProps, Icon, Table } from '@equinor/eds-core-react'
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons'
import { flexRender, Header } from '@tanstack/react-table'
import { AriaAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import { StickyHeaderCell } from './StickyCell'

interface HeaderCellProps<TData, TValue> {
  header: Header<TData, TValue>
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 5;
`

export const HeaderCell = <TData, TValue>({ header }: HeaderCellProps<TData, TValue>) => {
  const style: CSSProperties = {
    width: header.column.getSize() === -1 ? 'auto' : header.column.getSize(),
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
      <StickyHeaderCell key={header.id} {...cellProps}>
        <HeaderContent header={header} />
      </StickyHeaderCell>
    )
  }

  return (
    <Table.Cell key={header.id} {...cellProps}>
      <HeaderContent header={header} />
    </Table.Cell>
  )
}

function HeaderContent<TData, TValue>({ header }: HeaderCellProps<TData, TValue>) {
  if (header.isPlaceholder) return null
  return (
    <HeaderDiv>
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: <Icon data={arrow_drop_up} />,
        desc: <Icon data={arrow_drop_down} />,
        none: <Icon data={arrow_drop_down} />,
      }[header.column.getIsSorted() as string] ?? null}
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
