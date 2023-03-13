import { MutableRefObject, UIEventHandler, useCallback, useEffect } from 'react'

export interface UseFetchMoreOnBottomReached {
  fetchNextPage: () => void
  isFetching: boolean
  totalFetched: number
  totalDBRowCount: number
  tableContainerRef: MutableRefObject<HTMLDivElement | null>
  bottomOffset?: number
}

export function useFetchMoreOnBottomReached({
  fetchNextPage,
  isFetching,
  totalDBRowCount,
  totalFetched,
  tableContainerRef,
  bottomOffset = 300,
}: UseFetchMoreOnBottomReached) {
  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (!containerRefElement) return

      const { scrollHeight, scrollTop, clientHeight } = containerRefElement
      //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
      const hasScrolledToBottom = scrollHeight - scrollTop - clientHeight < bottomOffset
      const hasMoreToFetch = totalFetched < totalDBRowCount

      if (hasScrolledToBottom && !isFetching && hasMoreToFetch) {
        fetchNextPage()
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount, bottomOffset]
  )

  const onScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (event) => fetchMoreOnBottomReached(event.target as HTMLDivElement | null),
    [fetchMoreOnBottomReached]
  )

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  return { onScroll }
}
