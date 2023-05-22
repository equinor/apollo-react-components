import { DataTable } from '@equinor/apollo-components'
import { Card } from '@equinor/eds-core-react'
import { useMemo, useState } from 'react'
import { pokemon } from '../../data'
import { pokemonColumns } from './columns'

/**
 * Example with row selection and controlled state.
 */
export const PokemonTable = () => {
  const [rowSelectionState, setRowSelectionState] = useState({})

  const selectedPokemonId: string | undefined = Object.keys(rowSelectionState).filter(
    (key) => rowSelectionState[key as keyof typeof rowSelectionState]
  )[0]

  const selectedPokemon = useMemo(
    () => pokemon.find((pokemon) => String(pokemon.id) === selectedPokemonId),
    [selectedPokemonId]
  )

  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <Card elevation={'raised'}>
          <Card.Header>
            <Card.HeaderTitle>Selected Pokemon</Card.HeaderTitle>
          </Card.Header>
          <Card.Content>
            {selectedPokemon ? (
              <div>
                {Object.keys(selectedPokemon).map((key) => {
                  let value = selectedPokemon[key as keyof typeof selectedPokemon]
                  if (Array.isArray(value)) value = value.join(', ')
                  return (
                    <div key={key}>
                      <b>{key}:</b> <span>{JSON.stringify(value)}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <>No pokemon selected.</>
            )}
          </Card.Content>
        </Card>
      </div>

      <DataTable
        tableCaption="Pokédex"
        data={pokemon}
        columns={pokemonColumns}
        virtual
        height={'500px'}
        rowSelection={{
          mode: 'single',
          selectColumn: 'default',
          state: rowSelectionState,
          onChange: setRowSelectionState,
        }}
        columnResizing
        getRowId={(row) => row.id.toString()}
        bannerConfig={{
          enableGlobalFilterInput: true,
          enableColumnSelect: true,
          enableTableCaption: true,
        }}
        sorting={{ enableSorting: true }}
        stickyHeader={true}
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

      <div id="provider">
        <div id="external-table-wrapper">
          <div id="data-table" />
        </div>
      </div>
    </div>
  )
}
