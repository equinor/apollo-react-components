import { Popover, Typography } from '@equinor/eds-core-react'
import { ReactNode, useRef, useState } from 'react'
import { TypographyCustom } from './TypographyCustom'
import { stopPropagation } from './utils'

interface PopoverCellProps {
  id: string
  value: string
  title?: string | JSX.Element | ReactNode
}

export function PopoverCell(props: PopoverCellProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const handleClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  return (
    <div style={{ position: 'relative' }} ref={anchorRef}>
      <TypographyCustom
        onClick={stopPropagation(handleClick)}
        style={{ cursor: 'pointer' }}
        truncate
      >
        {String(props.value ?? '')}
      </TypographyCustom>
      <Popover
        id={props.id}
        open={open}
        aria-controls="expand cell"
        anchorEl={anchorRef.current}
        onClose={handleClose}
        placement={'bottom'}
      >
        {props.title && (
          <Popover.Title>
            <Popover.Header>{props.title}</Popover.Header>
          </Popover.Title>
        )}
        <Popover.Content>
          <Typography>{String(props.value ?? '')}</Typography>
        </Popover.Content>
      </Popover>
    </div>
  )
}
