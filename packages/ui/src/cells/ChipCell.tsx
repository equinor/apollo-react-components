import { tokens } from '@equinor/eds-tokens'
import styled from 'styled-components'
import { stringToHslColor } from './utils'

const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const Chip = styled.div<{ backgroundColor?: string }>`
  border-radius: 25px;
  line-height: 22px;
  height: 22px;
  padding: 0 6px;
  background-color: ${(props) => props.backgroundColor ?? tokens.colors.ui.background__medium.hex};
  color: darkslategrey;
`

export const ChipsCell = (props: { values?: string[] }) => {
  return (
    <ChipsWrapper>
      {props.values?.map((value) => (
        <Chip backgroundColor={stringToHslColor(value)} key={value}>
          {value}
        </Chip>
      ))}
    </ChipsWrapper>
  )
}
