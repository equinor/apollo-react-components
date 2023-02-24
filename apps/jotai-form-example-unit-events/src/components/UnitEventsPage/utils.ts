import { createFormFamily, createValidator, useFormFamilyUtils } from '@equinor/apollo-utils'
import { UnitEvent, unitEventSchema } from 'mock-data'

export const unitEventFormFamily = createFormFamily<UnitEvent>()

const unitEventValidator = createValidator(unitEventSchema)
export const unitEventFormUtils = useFormFamilyUtils(unitEventFormFamily, {
  validator: unitEventValidator,
})
