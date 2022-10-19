import { Typography } from '@equinor/eds-core-react'
import { ComponentStoryFn, Meta } from '@storybook/react'
import { useState } from 'react'
import { DebouncedInput } from './DebouncedInput'

export default {
  title: 'DataGrid/Debounced Input',
  component: DebouncedInput,
} as Meta<typeof DebouncedInput>

export const Basic: ComponentStoryFn<typeof DebouncedInput> = (props) => {
  const [value, setValue] = useState('')

  return (
    <div>
      <DebouncedInput
        {...props}
        value={value}
        placeholder="Write something"
        onChange={(value) => setValue(String(value))}
      />
      <br />
      <Typography variant="body_short">
        <strong>Debounced value:</strong> {value.length ? value : 'No value'}
      </Typography>
    </div>
  )
}
