import { FormState } from '@equinor/apollo-utils'
import { useQueryClient } from '@tanstack/react-query'
import { Pokemon } from 'mock-data'
import { pokemonFormUtils } from '../components/PokemonPage/utils'

export function usePokemonMutation(pokemon: Pokemon) {
  const queryClient = useQueryClient()
  const { resetForm } = pokemonFormUtils.useFormMutations(pokemon)

  return (formState: FormState<Pokemon>) => {
    queryClient.setQueryData(['allPokemon'], (currentPokemon?: Pokemon[]) => {
      if (!currentPokemon) return
      return currentPokemon.map((pokemon) => {
        if (pokemon.id === formState.values.id) return formState.values
        return pokemon
      })
    })
    resetForm()
  }
}
