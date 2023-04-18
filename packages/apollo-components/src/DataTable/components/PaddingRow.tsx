import { Table } from '@equinor/eds-core-react'

export const PaddingRow = (props: { height: number }) => {
  if (!props.height) return null
  return (
    <Table.Row style={{ pointerEvents: 'none' }}>
      <Table.Cell style={{ height: `${props.height}px` }} />
    </Table.Row>
  )
}
