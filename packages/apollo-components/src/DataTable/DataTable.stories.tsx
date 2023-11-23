import { ComponentStoryFn, Meta } from '@storybook/react'
import { DataTable } from './DataTable'
import { Fruit, fruitColumns, fruitsData } from './test-data'
import { DataTableProps } from './types'

const disableControl = () => ({
  table: {
    disable: true,
  },
})

const args: Partial<DataTableProps<unknown>> = {
  tableCaption: 'Fruits',
  width: '100%',
  virtual: false,
  sorting: {
    enableSorting: true,
  },
  stickyHeader: true,
  bannerConfig: {
    enableGlobalFilterInput: true,
    enableTableCaption: true,
  },
}

export default {
  title: 'DataTable/DataTable',
  component: DataTable,

  args,
  argTypes: {
    data: disableControl(),
    columns: disableControl(),
  },
} as Meta<typeof DataTable>

export const Basic: ComponentStoryFn<typeof DataTable<Fruit>> = (props) => (
  <DataTable<Fruit> {...props} data={fruitsData} columns={fruitColumns} />
)

export const GlobalFilter: ComponentStoryFn<typeof DataTable<Fruit>> = ({
  bannerConfig: filters,
  ...props
}) => (
  <DataTable
    {...props}
    data={fruitsData}
    columns={fruitColumns}
    bannerConfig={{
      enableGlobalFilterInput: filters?.enableGlobalFilterInput,
      globalFilterPlaceholder: filters?.globalFilterPlaceholder?.length
        ? filters.globalFilterPlaceholder
        : 'Forage for fruit',
    }}
  />
)

export const ColumnSelect: ComponentStoryFn<typeof DataTable<Fruit>> = ({
 bannerConfig: filters,
 ...props
}) => (
  <DataTable
    {...props}
    data={fruitsData}
    columns={fruitColumns}
    bannerConfig={{
      enableColumnSelect: true,
      enableGlobalFilterInput: filters?.enableGlobalFilterInput,
      globalFilterPlaceholder: filters?.globalFilterPlaceholder?.length
        ? filters.globalFilterPlaceholder
        : 'Forage for fruit',
    }}
  />
)

export const ColumnSelectPlaceholder: ComponentStoryFn<typeof DataTable<Fruit>> = ({
  bannerConfig: filters,
  ...props
}) => (
  <DataTable
    {...props}
    data={fruitsData}
    columns={fruitColumns}
    bannerConfig={{
      enableColumnSelect: true,
      columnSelectPlaceholder: 'Select columns',
      enableGlobalFilterInput: filters?.enableGlobalFilterInput,
      globalFilterPlaceholder: filters?.globalFilterPlaceholder?.length
        ? filters.globalFilterPlaceholder
        : 'Forage for fruit',
    }}
  />
)
