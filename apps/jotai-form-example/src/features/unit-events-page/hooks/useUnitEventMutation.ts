import { UnitEvent } from 'mock-data'
import { UNIT_EVENTS_QUERY_KEY } from '../utils'
import { useInfiniteCache } from './useInfiniteCache'

export function useUnitEventMutation() {
  const cache = useInfiniteCache([UNIT_EVENTS_QUERY_KEY])

  return async (newValues: UnitEvent[]) => {
    // Simulate backend call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Update cache
    cache.update(newValues)
  }
}
