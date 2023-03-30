import { tokens } from '@equinor/eds-tokens'
import { CellContext } from '@tanstack/react-table'
import styled, { css } from 'styled-components'
import { TypographyCustom, TypographyProps } from './TypographyCustom'

type CellWrapperProps = {
  depth: number
  expanded?: boolean
} & TypographyProps

const CellWrapper = styled(TypographyCustom)<CellWrapperProps>`
  height: 100%;
  display: flex;
  align-items: center;

  ${({ depth, expanded }) => expanded && depth === 0 && 'font-weight: bold;'}

  ${({ depth }) =>
    depth > 0 &&
    css`
      border-left: 3px solid ${tokens.colors.infographic.primary__moss_green_34.hex};
      gap: 0.5rem;
      .--divider {
        width: ${depth * 32}px;
        background-color: ${tokens.colors.infographic.primary__moss_green_34.hex};
        height: 3px;
        border-radius: 0 5px 5px 0;
      }
    `}
`

type HierarchyCellOptions = {
  getRowDepth?: () => number
  getDisplayName?: () => string
}

export function HierarchyCell<T>(cell: CellContext<T, any>, options: HierarchyCellOptions = {}) {
  return (
    <CellWrapper
      depth={options.getRowDepth?.() ?? cell.row.depth}
      expanded={cell.row.getIsExpanded()}
    >
      <span className="--divider" />
      {options.getDisplayName?.() ?? cell.getValue()}
    </CellWrapper>
  )
}
