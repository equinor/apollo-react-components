import { DataTable } from '@equinor/apollo-components'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { allPokemonAtom } from '../../server'
import {} from './atoms'
import { pokemonColumns } from './columns'
import { PokemonFormContext } from './components'

export function PokemonTable() {
  const pokemon = useAtomValue(allPokemonAtom)
  const filteredPokemon = useMemo(
    () => pokemon.filter((item) => item.id.split('-').length === 1),
    [pokemon]
  )

  return (
    <div>
      <DataTable
        columns={pokemonColumns}
        data={filteredPokemon}
        config={{
          virtual: true,
          height: '80vh',
          sortable: true,
          selectColumn: 'default',
          getRowId: (row) => row.id,
        }}
        rowConfig={{ rowWrapper: PokemonFormContext }}
        filters={{ globalFilter: true, columnSelect: true }}
      />
    </div>
  )
}
