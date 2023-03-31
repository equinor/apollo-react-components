import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from 'mock-data/src/unit-events/unitEvents'
import { UNIT_EVENTS_QUERY_KEY } from '../utils'

const FETCH_SIZE = 25

export function usePokemonQuery() {
  return useInfiniteQuery(
    [UNIT_EVENTS_QUERY_KEY],
    async ({ pageParam = 0 }) => {
      const start = pageParam * FETCH_SIZE
      const fetchedData = fetchData(start, FETCH_SIZE) //pretend api call
      return fetchedData
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
