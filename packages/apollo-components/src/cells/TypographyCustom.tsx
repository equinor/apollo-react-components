import {
  Typography as EdsTypography,
  TypographyProps as EdsTypographyProps,
} from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import { CSSProperties } from 'react'
import styled from 'styled-components'

export type TypographyProps = {
  noWrap?: boolean
  /** Requires noWrap prop in order to function */
  showAllOnHover?: boolean
} & EdsTypographyProps

const truncateStyle: CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

export const TypographyCustom = (props: TypographyProps) => {
  const { noWrap, showAllOnHover, style: styleFromProps, ...edsTypographyProps } = props

  if (noWrap && showAllOnHover)
    return (
      <HoverCapture>
        <EdsTypography
          {...edsTypographyProps}
          style={{
            ...styleFromProps,
            ...truncateStyle,
          }}
        />
      </HoverCapture>
    )

  return (
    <EdsTypography
      {...edsTypographyProps}
      style={{ ...styleFromProps, ...(noWrap ? truncateStyle : {}) }}
    />
  )
}

const HoverCapture = styled.div`
  padding: 0.5em 0;
  margin: -0.5em 0;
  height: ${tokens.typography.table.cell_text.lineHeight};
  background-color: inherit;

  position: relative;
  width: 100%;

  &:hover {
    z-index: 1;
  }

  & > * {
    width: inherit;
    position: absolute;
  }

  &:hover > * {
    width: auto;
    z-index: 1;
    padding: 0.5em 1em;
    margin: -0.5em -1em;

    background-color: inherit;
  }
`
