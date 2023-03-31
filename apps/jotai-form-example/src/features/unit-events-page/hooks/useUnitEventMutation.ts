import { useQueryClient } from '@tanstack/react-query'
import { UnitEvent } from 'mock-data'

export function useUnitEventMutation() {
  const queryClient = useQueryClient()

  return (newValue: UnitEvent) => {
    queryClient.setQueryData(['allUnitEvents'], (currentUnitEvent?: UnitEvent[]) => {
      console.log(currentUnitEvent)

      if (!currentUnitEvent) return
      return currentUnitEvent.map((unitEvent) => {
        if (unitEvent.id === newValue.id) return newValue
        return unitEvent
      })
    })
  }
}
