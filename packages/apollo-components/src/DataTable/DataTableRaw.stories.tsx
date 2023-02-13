import { ComponentStoryFn, Meta } from '@storybook/react'
import { Table } from '@tanstack/react-table'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DataTableRaw } from './DataTableRaw'
import { Fruit, fruitColumns, fruitsData } from './test-data'
import { useDataTable } from './useDataTable'

const disableControl = () => ({
  table: {
    disable: true,
  },
})

export default {
  title: 'DataTable/DataTable Submit All',
  component: DataTableRaw,
  args: {
    config: {
      sortable: true,
      width: '100%',
      height: '100%',
      virtual: false,
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
    table: disableControl(),
  },
} as Meta<typeof DataTableRaw>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const editsAtom = atom({})

export const SubmitAll: ComponentStoryFn<typeof DataTableRaw<Fruit>> = (props: any) => {
  const [_, skipAutoResetPageIndex] = useSkipper()
  const [data, setData] = useState(fruitsData)
  const table = useDataTable<Fruit>({
    ...props,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex()
        setData((old) => {
          return old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        })
      },
    },
    data,
    columns: [
      ...fruitColumns,
      {
        accessorKey: 'unit',
        header: 'Unit',
        cell: ({ getValue, row, column, table }) => {
          const initialValue = getValue()
          const [value, setValue] = useState('')

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue)
          }, [initialValue])
          const [edits] = useAtom(editsAtom)
          const id = row.id
          if ((edits as any)[id]) {
            return (
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                }}
                onBlur={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  table.options?.meta?.updateData(row.index, column.id, value)
                }}
              />
            )
          }
          return getValue()
        },
      },
      {
        id: 'edit',
        cell: (props) => {
          const [_, setEdits] = useAtom(editsAtom)
          return (
            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setEdits((old) => {
                  const id = props.row.id
                  const stored = (old as any)[id] ?? false
                  return { ...old, [id]: !stored }
                })
              }}
            >
              edit
            </button>
          )
        },
      },
    ],
  })

  return (
    <>
      <SubmitAllButton table={table} />
      <DataTableRaw {...props} table={table} />
    </>
  )
}

function SubmitAllButton({ table }: { table: Table<Fruit> }) {
  const [edits] = useAtom(editsAtom)
  return (
    <button
      onClick={() => {
        const changes = Object.keys(edits).reduce((acc, curr) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          edits[curr] && acc.push(table.getRow(curr).original)
          return acc
        }, [])
        console.log(changes)
      }}
    >
      Submit All
    </button>
  )
}

function useSkipper() {
  const shouldSkipRef = useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}
