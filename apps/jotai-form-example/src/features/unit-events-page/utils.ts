import { createFormFamily, createValidator, useFormFamilyUtils } from '@equinor/apollo-utils'
import { unitEventSchema } from 'mock-data'
import { UnitEvent } from './types'

export const unitEventFormFamily = createFormFamily<UnitEvent>()

const unitEventValidator = createValidator(unitEventSchema)
export const unitEventFormUtils = useFormFamilyUtils(unitEventFormFamily, {
  validator: unitEventValidator,
})

export function omit<T>(obj: T, ...keys: (keyof T)[]) {
  const updated = { ...obj }
  keys.forEach((key) => delete updated[key])
  return updated
}

export function buildNewUnitEvent(overwrites: Partial<UnitEvent> = {}): Required<UnitEvent> {
  return {
    id: uuid(),
    comment: '',
    from: '',
    isActive: false,
    location: '',
    reference: '',
    to: '',
    unit: '',
    updatedAt: '',
    urgency: 0,

    _isNew: true,
    _editMode: true,
    _hasRemoteChange: false,

    ...overwrites,
  }
}

function uuid() {
  return (
    String(Math.abs(Math.floor((Math.random() * 10000) / (Math.random() * 10000)))) +
    Date.now().toString()
  )
}

export const UNIT_EVENTS_QUERY_KEY = 'unitEvents'
