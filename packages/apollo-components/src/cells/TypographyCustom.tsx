import {
  Typography as EdsTypography,
  TypographyProps as EdsTypographyProps,
} from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import { CSSProperties } from 'react'
import styled from 'styled-components'

export type TypographyProps = {
  truncate?: boolean
  enableShowAllOnHover?: boolean
} & EdsTypographyProps

const truncateStyle: CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

export const TypographyCustom = (props: TypographyProps) => {
  const { truncate, enableShowAllOnHover, style: styleFromProps, ...edsTypographyProps } = props

  if (enableShowAllOnHover)
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

  if (truncate)
    return (
      <EdsTypography
        {...edsTypographyProps}
        style={{
          ...styleFromProps,
          ...truncateStyle,
        }}
      />
    )

  return <EdsTypography {...edsTypographyProps} style={styleFromProps} />
}

const HoverCapture = styled.div`
  height: ${tokens.typography.table.cell_text.lineHeight};
  background-color: inherit;

  position: relative;
  width: 100%;

  &:hover {
    height: inherit;
    z-index: 1;
  }

  & > * {
    width: inherit;
    position: absolute;
  }

  &:hover > * {
    width: auto;
    z-index: 1;
    height: inherit;
    display: flex;
    align-items: center;
    padding-left: 1em;
    padding-right: 1em;
    margin-left: -1em;
    margin-right: -1em;

    background-color: inherit;
  }
`
