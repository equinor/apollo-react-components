import { Input } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 300px;
`

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
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
        onChange={(event) => setValue((event.target as HTMLInputElement).value)}
      />
    </Wrapper>
  )
}
