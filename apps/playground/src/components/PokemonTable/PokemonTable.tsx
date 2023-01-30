import { DataTable } from '@equinor/apollo-components'
import { Pokemon, pokemon } from '../../data'
import { pokemonColumns } from './columns'

type PokemonNode = Pokemon & {
  children?: Pokemon[]
}

export const PokemonTable = () => {
  return (
    <div>
      <DataTable.Provider>
        <DataTable
          columns={pokemonColumns}
          config={{
            sortable: true,
            virtual: true,
            height: '500px',
            rowSelectionMode: 'single',
            selectColumn: 'default',
            getSubRows: (row) => (row as PokemonNode).children,
            getRowId: (row) => row.id.toString(),
          }}
          data={pokemon}
          filters={{ globalFilter: true }}
          header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
          rowConfig={{
            onClick: (row) => row.toggleSelected(),
            onMouseEnter: (row) => console.log(`${row.id} mouse enter`),
            onMouseLeave: (row) => console.log(`${row.id} mouse leave`),
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
