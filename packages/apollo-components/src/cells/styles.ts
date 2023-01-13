import { css } from 'styled-components'

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
