import { DataTable, TableRowWrapper } from '@equinor/apollo-components'
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
          filters={{
            globalFilter: true,
            columnSelect: true,
          }}
          header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
          rowConfig={{
            rowWrapper: PokemonTableRow,
            onClick: (row) => row.toggleSelected(),
            onMouseEnter: (row) => {
              console.log({ rowId: row.original.id })
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

const PokemonTableRow: TableRowWrapper<Pokemon> = ({ row, children }) => {
  console.log({ rowFromPokemon: row.original.name })

  return <>{children}</>
}
