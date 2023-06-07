import { Typography } from '@equinor/eds-core-react'
import { Variants } from '@equinor/eds-core-react/dist/types/components/types'
import { tokens } from '@equinor/eds-tokens'
import { GetHelperTextProps } from './types'

const colors: { [key in Variants]: string } = {
  error: tokens.colors.interactive.danger__text.hex,
  warning: tokens.colors.interactive.warning__text.hex,
  success: tokens.colors.interactive.success__text.hex,
}

export function HelperText({ helperText, variant, helperIcon }: GetHelperTextProps) {
  // This component is only while we wait for EDS to implement helper text on all components
  // Styles found after EDS component inspection
  return (
    <>
      {helperText && (
        <div style={{ marginTop: '8px', marginLeft: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginTop: '8px',
              color: variant ? colors[variant] : 'inherit',
            }}
          >
            <span style={{ flexShrink: 0 }}>{helperIcon}</span>
            <Typography
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                lineHeight: '1.333em',
                letterSpacing: '0.013em',
                textAlign: 'left',
                margin: '0 0 0 8px',
                color: 'inherit',
              }}
            >
              {helperText}
            </Typography>
          </div>
        </div>
      )}
    </>
  )
}
