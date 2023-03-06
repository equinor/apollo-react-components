import { ComponentStoryFn, Meta } from '@storybook/react'
import { DataTable } from './DataTable'
import { Fruit, fruitColumns, fruitsData } from './test-data'

const disableControl = () => ({
  table: {
    disable: true,
  },
})

export default {
  title: 'DataTable/DataTable',
  component: DataTable,
  args: {
    config: {
      width: '100%',
      virtual: false,
    },
    sortConfig: {
      enableSorting: true,
    },
    header: {
      captionPadding: '1rem',
      tableCaption: 'Fruits',
    },
    filters: {
      globalFilter: true,
    },
  },
  argTypes: {
    data: disableControl(),
    columns: disableControl(),
  },
} as Meta<typeof DataTable>

export const Basic: ComponentStoryFn<typeof DataTable<Fruit>> = (props) => (
  <DataTable<Fruit> {...props} data={fruitsData} columns={fruitColumns} />
)

export const GlobalFilter: ComponentStoryFn<typeof DataTable<Fruit>> = ({ filters, ...props }) => (
  <DataTable
    {...props}
    data={fruitsData}
    columns={fruitColumns}
    filters={{
      globalFilter: filters?.globalFilter,
      globalFilterPlaceholder: filters?.globalFilterPlaceholder?.length
        ? filters.globalFilterPlaceholder
        : 'Forage for fruit',
    }}
  />
)
