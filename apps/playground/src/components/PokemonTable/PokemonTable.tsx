import { DataTable } from '@equinor/apollo-components/src/DataTable'
import { DataTableRaw } from '@equinor/apollo-components/src/DataTable/DataTableRaw'
import { useDataTable, UseTableData } from '@equinor/apollo-components/src/DataTable/useDataTable'
import { Table } from '@tanstack/react-table'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Pokemon, pokemon } from '../../data'
import { pokemonColumns } from './columns'

type PokemonNode = Pokemon & {
  children?: Pokemon[]
}

export const editsAtom = atom({})

export const PokemonTable = () => {
  const [_, skipAutoResetPageIndex] = useSkipper()
  const [data, setData] = useState(pokemon)

  const props: UseTableData<any> = {
    columns: pokemonColumns,
    config: {
      sortable: true,
      virtual: true,
      height: '500px',
      rowSelectionMode: 'single',
      selectColumn: 'default',
      getSubRows: (row: any) => (row as PokemonNode).children,
      getRowId: (row: any) => row.id.toString(),
    },
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
    filters: {
      globalFilter: true,
      columnSelect: true,
    },
  }

  const table = useDataTable(props)
  return (
    <>
      <PokomanTable table={table} {...props} />
    </>
  )
}

const PokomanTable = ({ table, config, filters }: any) => {
  return (
    <div style={{ height: config.height }}>
      <DataTable.Provider>
        <SubmitAllButton table={table} />
        <DataTableRaw<Pokemon>
          table={table}
          config={config}
          filters={filters}
          header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
          cellConfig={{
            getShouldHighlight(cell) {
              return cell.column.id === 'name' && cell.row.original.type.includes('Water')
            },
          }}
          rowConfig={{
            onClick: (row) => row.toggleSelected(),
            getRowBackground(row) {
              return row.original.type.includes('Poison') ? '#e0febd' : undefined
            },
          }}
        />
      </DataTable.Provider>

      <div id="provider">
        <div id="external-table-wrapper">
          <div id="data-table" />
        </div>
      </div>
    </div>
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

function SubmitAllButton({ table }: { table: Table<unknown> }) {
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
