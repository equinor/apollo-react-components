import { useQuery } from '@tanstack/react-query'
import { unitEventData } from 'mock-data'

export function usePokemonQuery() {
  return useQuery(['allUnitEvents'], () => unitEventData)
}
