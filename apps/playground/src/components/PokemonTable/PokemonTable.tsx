import { DataTable } from '@equinor/apollo-components'
import { Pokemon, pokemon } from '../../data'
import { pokemonColumns } from './columns'

type PokemonNode = Pokemon & {
  children?: Pokemon[]
}

export const PokemonTable = () => {
  const pokemonTree: PokemonNode[] = pokemon.map((item) => ({
    ...item,
    children: pokemon.slice(1, 3).map((childPokemon) => ({
      ...childPokemon,
      children: [pokemon.at(-1)],
    })),
  }))

  return (
    <div>
      <DataTable.Provider>
        <DataTable
          columns={pokemonColumns}
          config={{ sortable: true, virtual: true, height: '400px', selectColumn: 'default' }}
          data={pokemon}
          filters={{ globalFilter: true }}
          header={{ stickyHeader: true, tableCaption: 'Pokédex' }}
        />
      </DataTable.Provider>
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
            onRowClick: (row) => row.toggleSelected(),
          }}
          data={pokemonTree}
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
