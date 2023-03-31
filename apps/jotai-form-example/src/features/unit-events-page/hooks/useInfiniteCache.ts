export const useInfiniteCache = () => null
// <T extends { id: string }>(queryKey: QueryKey) => {
//   const queryClient = useQueryClient()

//   /** Update or prepend cache based on id */
//   const update = (rows: T[]) => {
//     return queryClient.setQueryData<InfiniteDataWithTotalSize<T> | undefined>(
//       queryKey,
//       (oldCache) => {
//         if (!oldCache) {
//           return {
//             pageParams: [undefined],
//             pages: [{ eventList: rows, page: 0, totalSize: rows.length }],
//           }
//         }

//         const updatedCache = cloneDeep(oldCache ?? { pages: [], pageParams: [] })

//         const { toPrepend, toUpdate } = rows.reduce<{
//           toPrepend: T[]
//           toUpdate: { row: T; nestedIndex: number[] }[]
//         }>(
//           (res, row) => {
//             const nestedIndex = findNestedIndexById(updatedCache.pages, row.id)
//             nestedIndex ? res.toUpdate.push({ row, nestedIndex }) : res.toPrepend.push(row)
//             return res
//           },
//           { toPrepend: [], toUpdate: [] }
//         )

//         // Update rows
//         toUpdate.forEach(
//           ({ row, nestedIndex: [pageIndex, eventIndex] }) =>
//             (updatedCache.pages[pageIndex].eventList[eventIndex] = row)
//         )

//         // Prepend rows
//         if (toPrepend.length) {
//           if (!updatedCache.pages[0])
//             updatedCache.pages.push({
//               eventList: toPrepend,
//               page: 0,
//               totalSize: toPrepend.length,
//             })
//           else updatedCache.pages[0].eventList.unshift(...toPrepend)
//         }
//         return updatedCache
//       }
//     )
//   }

//   return { update }
// }
