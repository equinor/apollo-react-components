import { DataTable } from '@equinor/apollo-components'
import { Button } from '@equinor/eds-core-react'
import { useAtomValue, useSetAtom } from 'jotai'
import { allPokemonAtom, deleteAllPokemonForms, pokemonFormAtomsCountAtom } from './atoms'
import { pokemonColumns } from './columns'

export function PokemonTable() {
  const pokemon = useAtomValue(allPokemonAtom)
  const deleteAll = useSetAtom(deleteAllPokemonForms)
  return (
    <div>
      <PokemonFormsCount />
      <Button onClick={() => deleteAll()}>Delete All</Button>
      <DataTable
        columns={pokemonColumns}
        data={pokemon}
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

function PokemonFormsCount() {
  const pokemonFormCount = useAtomValue(pokemonFormAtomsCountAtom)

  return (
    <div>
      <strong>Active forms</strong>: {pokemonFormCount}
    </div>
  )
}
