import { DataTable } from '@equinor/apollo-components'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

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
            getRowId: (row) => row.id.toString(),
          }}
          data={pokemon}
          filters={{
            globalFilter: true,
            columnSelect: true,
          }}
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
