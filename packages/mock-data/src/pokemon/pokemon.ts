import { z } from 'zod'
import pokemonDb from './pokemonDb.json'

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.array(z.string()).min(1),
  hp: z.number().min(1),
  attack: z.number().min(1),
  defense: z.number().min(1),
  specialAttack: z.number().min(1),
  specialDefense: z.number().min(1),
  speed: z.number().min(1),
})

export type Pokemon = z.infer<typeof pokemonSchema>

export const pokemonData: Pokemon[] = pokemonDb.map((entity) => ({
  id: entity.id,
  name: entity.name.english,
  type: entity.type,
  hp: entity.base.HP,
  attack: entity.base.Attack,
  defense: entity.base.Defense,
  specialAttack: entity.base['Sp. Attack'],
  specialDefense: entity.base['Sp. Defense'],
  speed: entity.base.Speed,
}))

export const pokemonTypes = Array.from(
  new Set(
    pokemonDb.reduce((accumulator, item) => {
      return [...accumulator, ...item.type]
    }, [] as string[])
  )
)
