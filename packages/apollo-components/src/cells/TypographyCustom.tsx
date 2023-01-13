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

export const truncateStyle: CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

/** A cell used to wrap text in EDS Typography
 *
 * Developed for Plant Tracker.
 */
export const TypographyCustom = (props: TypographyProps) => {
  const { noWrap, showAllOnHover, style: styleFromProps, ...edsTypographyProps } = props

  if (noWrap && showAllOnHover)
    return (
      <HoverCapture>
        <ShowAllWrapperWrapper>
          <EdsTypography
            {...edsTypographyProps}
            ref={undefined}
            style={{
              ...styleFromProps,
              whiteSpace: 'nowrap',
            }}
          />
        </ShowAllWrapperWrapper>
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
  position: relative;
  z-index: 0;

  padding: 0.5em;
  margin: -0.5em;

  &:hover > * {
    opacity: 1;
  }
`

const ShowAllWrapperWrapper = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;

  opacity: 0;
  padding-right: 1em;
  background-color: ${tokens.colors.interactive.table__cell__fill_hover.hex};
`
