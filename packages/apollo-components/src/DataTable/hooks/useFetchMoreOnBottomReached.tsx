import { MutableRefObject, UIEventHandler, useCallback, useEffect } from 'react'
import { DataTableCommonProps } from '../types'

export function useFetchMoreOnBottomReached(
  tableContainerRef: MutableRefObject<HTMLDivElement | null>,
  infiniteScrollConfig?: DataTableCommonProps<unknown>['infiniteScroll']
) {
  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (tableContainer?: HTMLDivElement | null) => {
      if (!infiniteScrollConfig) return
      if (!tableContainer) return

      const { onBottomScroll, offset = 300 } = infiniteScrollConfig

      const { scrollHeight, scrollTop, clientHeight } = tableContainer

      //once the user has scrolled within ${offset} of the bottom of the table, fetch more data if there is any
      if (scrollHeight - scrollTop - clientHeight < offset) {
        onBottomScroll()
      }
    },
    [infiniteScrollConfig]
  )

  const onTableContainerScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (event) => fetchMoreOnBottomReached(event.target as HTMLDivElement | null),
    [fetchMoreOnBottomReached]
  )

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    if (!infiniteScrollConfig) return
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  return onTableContainerScroll
}
