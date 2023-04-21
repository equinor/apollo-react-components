import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query'

export const useInfiniteCache = <T extends { id: string }>(queryKey: QueryKey) => {
  const queryClient = useQueryClient()

  /** Update or prepend cache based on id */
  const update = (rows: T[]) => {
    return queryClient.setQueryData<InfiniteData<{ data: T[]; totalSize: number }> | undefined>(
      queryKey,
      (oldCache) => {
        if (!oldCache) {
          return {
            pageParams: [undefined],
            pages: [{ data: rows, page: 0, totalSize: rows.length }],
          }
        }

        const updatedCache = cloneDeep(oldCache)

        const { toPrepend, toUpdate } = rows.reduce<{
          toPrepend: T[]
          toUpdate: { row: T; nestedIndex: number[] }[]
        }>(
          (res, row) => {
            const nestedIndex = findNestedIndexById(updatedCache.pages, row.id)
            nestedIndex ? res.toUpdate.push({ row, nestedIndex }) : res.toPrepend.push(row)
            return res
          },
          { toPrepend: [], toUpdate: [] }
        )

        // Update rows
        toUpdate.forEach(
          ({ row, nestedIndex: [pageIndex, eventIndex] }) =>
            (updatedCache.pages[pageIndex].data[eventIndex] = row)
        )

        // Prepend rows
        if (toPrepend.length) {
          if (!updatedCache.pages[0])
            updatedCache.pages.push({
              data: toPrepend,
              totalSize: toPrepend.length,
            })
          else updatedCache.pages[0].data.unshift(...toPrepend)
        }
        return updatedCache
      }
    )
  }

  return { update }
}

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Function that find nested indexes.
 *
 * @param pages to search within
 * @param id to search for
 * @returns array of indexes. E.g. ["1", "2"]
 */
function findNestedIndexById(
  pages: { data: { id: string }[] }[],
  id: string
): number[] | undefined {
  for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
    const page = pages[pageIndex]
    for (let elementIndex = 0; elementIndex < page.data.length; elementIndex++) {
      const element = page.data[elementIndex]
      if (element.id === id) return [pageIndex, elementIndex]
    }
  }
  return undefined
}
