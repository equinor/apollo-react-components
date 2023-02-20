import { z } from 'zod'

export const personSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  age: z.number().min(0).max(150),
})

export type Person = z.infer<typeof personSchema>

export const examplePerson: Person = {
  id: 0,
  name: 'Apollo',
  age: 25,
}
