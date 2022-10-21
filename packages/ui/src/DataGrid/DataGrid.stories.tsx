import { ComponentStoryFn, Meta } from '@storybook/react'
import { DataGrid } from '.'
import { fruitColumns, fruitsData } from './test-data'

const disableControl = () => ({
  table: {
    disable: true,
  },
})

export default {
  title: 'DataGrid/DataGrid',
  component: DataGrid,
  args: {
    tableCaption: 'Fruits',
    globalFilter: true,
    tableWidth: '100%',
    captionPadding: '1rem',
    sortable: true,
  },
  argTypes: {
    data: disableControl(),
    columns: disableControl(),
  },
} as Meta<typeof DataGrid>

export const Basic: ComponentStoryFn<typeof DataGrid> = (props) => (
  <DataGrid {...props} data={fruitsData} columns={fruitColumns} />
)

export const GlobalFilter: ComponentStoryFn<typeof DataGrid> = ({
  globalFilter = true,
  ...props
}) => (
  <DataGrid
    {...props}
    data={fruitsData}
    columns={fruitColumns}
    globalFilter={globalFilter}
    globalFilterPlaceholder={
      props.globalFilterPlaceholder?.length ? props.globalFilterPlaceholder : 'Forage for fruit'
    }
  />
)
