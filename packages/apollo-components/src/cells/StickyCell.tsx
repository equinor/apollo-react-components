import { CellProps, Table } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const StickyCell = styled(Table.Cell)<CellProps>`
  position: sticky;
  right: 0;
  top: 0;
  z-index: 4;
`

export const StickyHeaderCell = styled(StickyCell)<CellProps>`
  z-index: 5;
`
