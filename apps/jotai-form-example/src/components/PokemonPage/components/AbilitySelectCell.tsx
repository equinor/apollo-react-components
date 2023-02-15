import { ChipsCell } from '@equinor/apollo-components'
import { Autocomplete } from '@equinor/eds-core-react'
import { type CellContext } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { Pokemon } from 'trpc-pokemon'
import { abilitiesAtom } from '../../../server'
import { usePokemonForm, usePokemonFormMutation } from '../atoms'

export const AbilitySelectCell = (context: CellContext<Pokemon, unknown>) => {
  const [pokemonForm] = usePokemonForm({ id: context.row.id })
  const updatePokemonForm = usePokemonFormMutation({ id: context.row.id })

  const abilities = useAtomValue(abilitiesAtom)
  const currentAbilities = context.row.original.abilities

  if (!pokemonForm) {
    return <ChipsCell values={currentAbilities.map((ability) => ability.name)} />
  }

  return (
    <div>
      <Autocomplete
        label=""
        initialSelectedOptions={currentAbilities}
        options={abilities.filter((ability) => ability.name !== 'As One')}
        optionLabel={(option) => option.name}
        onOptionsChange={(changes) => updatePokemonForm({ abilities: changes.selectedItems })}
        clearSearchOnChange={false}
        autoWidth={true}
        multiple
      />
    </div>
  )
}
