import { ChipsCell } from '@equinor/apollo-components'
import { Autocomplete } from '@equinor/eds-core-react'
import { type CellContext } from '@tanstack/react-table'
import { Pokemon } from 'mock-data'
import { pokemonTypes } from 'mock-data/src/pokemon/pokemon'
import { pokemonFormUtils } from '../utils'

export const TypeSelectCell = (context: CellContext<Pokemon, unknown>) => {
  const pokemonFormState = pokemonFormUtils.useFormState({ id: context.row.id })

  const updatePokemonForm = pokemonFormUtils.useUpdateFormMutation({ id: context.row.id })

  const currentTypes = context.row.original.type

  if (!pokemonFormState) {
    return <ChipsCell values={currentTypes} />
  }

  return (
    <div>
      <Autocomplete
        label=""
        selectedOptions={pokemonFormState.values.type}
        initialSelectedOptions={currentTypes}
        options={pokemonTypes}
        onOptionsChange={(changes) => updatePokemonForm({ type: changes.selectedItems })}
        clearSearchOnChange={false}
        autoWidth={true}
        multiple
      />
    </div>
  )
}
