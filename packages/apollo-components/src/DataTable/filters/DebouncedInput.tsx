import { Button, Icon, Input, Tooltip } from '@equinor/eds-core-react'
import { close, IconData } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 200px;
`

const CloseButton = styled(Button)`
  width: 24px;
  height: 24px;
`

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  debounce?: number
  icon?: IconData
  value: string | number
  onChange: (value: string | number) => void
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  icon,
  debounce = 500,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Wrapper>
      <Input
        {...props}
        value={value}
        leftAdornments={icon && <Icon name={icon.name} data={icon} size={18} />}
        rightAdornments={
          !!value && (
            <Tooltip title="Clear input">
              <CloseButton variant="ghost_icon" onClick={() => setValue('')}>
                <Icon name={close.name} data={close} size={18} />
              </CloseButton>
            </Tooltip>
          )
        }
        onChange={(event: any) => setValue((event.target as HTMLInputElement).value)}
      />
    </Wrapper>
  )
}
