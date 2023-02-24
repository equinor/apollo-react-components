import { FormState } from '@equinor/apollo-utils'
import { useQueryClient } from '@tanstack/react-query'
import { UnitEvent } from 'mock-data'
import { unitEventFormUtils } from '../components/UnitEventsPage/utils'

export function useUnitEventMutation(unitEvent: UnitEvent) {
  const queryClient = useQueryClient()
  const { resetForm } = unitEventFormUtils.useFormMutations(unitEvent)

  return (formState: FormState<UnitEvent>) => {
    queryClient.setQueryData(['allUnitEvents'], (currentUnitEvent?: UnitEvent[]) => {
      if (!currentUnitEvent) return
      return currentUnitEvent.map((unitEvent) => {
        if (unitEvent.id === formState.values.id) return formState.values
        return unitEvent
      })
    })
    resetForm()
  }
}
