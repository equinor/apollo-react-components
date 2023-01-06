import { DotProgress, Table, Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

type PlaceholderRowProps = {
  isLoading?: boolean
}

const PlaceholderTextWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export function PlaceholderRow({ isLoading }: PlaceholderRowProps) {
  return (
    <Table.Row>
      <Table.Cell colSpan={100}>
        <PlaceholderTextWrapper>
          {isLoading ? <DotProgress color="primary" /> : <Typography>No data available</Typography>}
        </PlaceholderTextWrapper>
      </Table.Cell>
    </Table.Row>
  )
}
