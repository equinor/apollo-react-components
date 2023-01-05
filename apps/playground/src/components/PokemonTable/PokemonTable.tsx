import { DataTable } from '@equinor/apollo-components'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

export const PokemonTable = () => {
  return (
    <div>
      <DataTable.Provider>
        <DataTable
          columns={pokemonColumns}
          config={{ sortable: true, virtual: true, height: '400px', rowSelection: 'multiple' }}
          data={pokemon}
          filters={{ globalFilter: true }}
          header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
        />
      </DataTable.Provider>
      <DataTable.Provider>
        <DataTable
          columns={pokemonColumns}
          config={{ sortable: true, virtual: true, height: '400px', rowSelection: 'single' }}
          data={pokemon}
          filters={{ globalFilter: true }}
          header={{ stickyHeader: true, tableCaption: 'Pokédex 2 Electric Boogaloo' }}
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
