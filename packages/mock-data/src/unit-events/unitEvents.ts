import { z } from 'zod'
import unitEventDb from './unitEventDb.json'

export const unitEventSchema = z.object({
  id: z.string(),
  location: z.string(),
  unit: z.string(),
  from: z.string(),
  to: z.string(),
  urgency: z.number().min(0).max(100),
  reference: z.string(),
  comment: z.string(),
  isActive: z.boolean(),
  updatedAt: z.string(),
})

export type UnitEvent = z.infer<typeof unitEventSchema>

export const unitEventData: UnitEvent[] = unitEventDb.map((entity) => ({
  id: entity.id,
  location: entity.location,
  unit: entity.unit,
  from: entity.from,
  to: entity.to,
  urgency: entity.urgency,
  reference: entity.reference,
  comment: entity.comment,
  isActive: entity.isActive,
  updatedAt: entity.updatedAt,
}))
