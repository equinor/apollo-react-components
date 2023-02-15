import { DataTable } from '@equinor/apollo-components'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { allPokemonAtom } from '../../server'
import { pokemonColumns } from './columns'

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
        filters={{ globalFilter: true, columnSelect: true }}
      />
    </div>
  )
}
