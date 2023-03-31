import { FormMeta } from '@equinor/apollo-components'
import { UnitEvent as UnitEventDto } from 'mock-data'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export type UnitEvent = UnitEventDto & FormMeta

export type FormsCache<T extends FieldValues> = Record<string, UseFormReturn<T, unknown>>
