import { ComponentStoryFn, Meta } from '@storybook/react'
import { DataTable } from './DataTable'
import { fruitColumns, fruitsData } from './test-data'

const disableControl = () => ({
  table: {
    disable: true,
  },
})

export default {
  title: 'DataTable/DataTable',
  component: DataTable,
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
} as Meta<typeof DataTable>

export const Basic: ComponentStoryFn<typeof DataTable> = (props) => (
  <DataTable {...props} data={fruitsData} columns={fruitColumns} />
)

export const GlobalFilter: ComponentStoryFn<typeof DataTable> = ({
  globalFilter = true,
  ...props
}) => (
  <DataTable
    {...props}
    data={fruitsData}
    columns={fruitColumns}
    globalFilter={globalFilter}
    globalFilterPlaceholder={
      props.globalFilterPlaceholder?.length ? props.globalFilterPlaceholder : 'Forage for fruit'
    }
  />
)
