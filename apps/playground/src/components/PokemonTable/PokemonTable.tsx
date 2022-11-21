import {
  DataTable,
  globalFilterAtom,
  rowSelectionAtom,
  tableSortingAtom,
} from '@equinor/apollo-components'
import { EdsProvider } from '@equinor/eds-core-react'
import { Provider, useAtom } from 'jotai'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

export const PokemonTable = () => {
  return (
    <EdsProvider density="compact">
      <div>
        <Provider>
          <DataTable
            columns={pokemonColumns}
            config={{ sortable: true, virtual: true, height: '400px', enableRowSelection: true }}
            data={pokemon}
            filters={{ globalFilter: true }}
            header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
          />
          <DebugTableAtoms name="Pokédex" />
        </Provider>
        <Provider>
          <DataTable
            columns={pokemonColumns}
            config={{ sortable: true, virtual: true, height: '400px', enableRowSelection: true }}
            data={pokemon}
            filters={{ globalFilter: true }}
            header={{ stickyHeader: true, tableCaption: 'Pokédex 2 Electric Boogaloo' }}
          />
          <DebugTableAtoms name="Pokédex 2" />
        </Provider>
      </div>
    </EdsProvider>
  )
}

function DebugTableAtoms({ name }: { name?: string }) {
  const [selectedRows] = useAtom(rowSelectionAtom)
  const [tableSorting] = useAtom(tableSortingAtom)
  const [globalFilter] = useAtom(globalFilterAtom)

  console.log({ selectedRows, tableSorting, globalFilter })

  return null
}
