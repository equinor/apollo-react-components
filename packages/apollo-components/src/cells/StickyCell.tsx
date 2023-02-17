import { CellProps, Table } from '@equinor/eds-core-react'
import styled, { css } from 'styled-components'

export const leftCellShadow = css`
  &:before {
    box-shadow: -1px 0 1px -1px inset;
    content: ' ';
    height: 100%;
    top: 0;
    left: -1px;
    position: absolute;
    width: 1px;
  }
`

export const StickyCell = styled(Table.Cell)<CellProps>`
  position: sticky;
  right: 0;
  top: 0;
  z-index: 4;
  background-clip: padding-box;
  ${leftCellShadow}
`

export const StickyHeaderCell = styled(StickyCell)<CellProps>`
  z-index: 5;
`
