import pokemonDb from './pokemonDb.json'

export interface Pokemon {
  id: number
  name: string
  type: string[]
  base: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
}

export const pokemon: Pokemon[] = pokemonDb.map((entity) => ({
  id: entity.id,
  name: entity.name.english,
  type: entity.type,
  base: {
    hp: entity.base.HP,
    attack: entity.base.Attack,
    defense: entity.base.Defense,
    specialAttack: entity.base['Sp. Attack'],
    specialDefense: entity.base['Sp. Defense'],
    speed: entity.base.Speed,
  },
}))
