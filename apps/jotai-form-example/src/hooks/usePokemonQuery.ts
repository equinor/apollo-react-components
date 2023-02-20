import { useQuery } from '@tanstack/react-query'
import { pokemonData } from 'mock-data'

export function usePokemonQuery() {
  return useQuery(['allPokemon'], () => pokemonData)
}
