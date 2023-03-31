import { faker } from '@faker-js/faker'
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

function newUnitEvent(): UnitEvent {
  return {
    id: faker.datatype.uuid(),
    location: faker.address.country(),
    unit: faker.color.human(),
    from: faker.date.past().toISOString(),
    to: faker.date.future().toISOString(),
    comment: faker.lorem.words(parseInt(faker.random.numeric(2))),
    isActive: Math.random() > 0.2 ? true : false,
    reference: faker.name.fullName(),
    updatedAt: faker.date.past().toISOString(),
    urgency: parseInt(faker.random.numeric(2)),
  }
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): UnitEvent[] => {
    const len = lens[depth]!
    return range(len).map(newUnitEvent)
  }

  return makeDataLevel()
}

const data = makeData(1000)

//simulates a backend api
export const fetchData = (start: number, size: number) => {
  const dbData = [...data]

  return {
    data: dbData.slice(start, start + size),
    totalSize: dbData.length,
  }
}
