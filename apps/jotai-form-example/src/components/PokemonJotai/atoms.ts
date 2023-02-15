import { createFormFamily, createValidator } from '@equinor/apollo-utils'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { Pokemon } from 'trpc-pokemon'
import { z } from 'zod'

type PokemonParam = {
  id: string
  editForm?: Pokemon
}

const abilitySchema = z.object({ id: z.string(), name: z.string() })

export const pokemonFormSchema = z.object({
  id: z.string(),
  weight: z.number().min(0).max(10000),
  height: z.number().min(0).max(500),
  abilities: z.array(abilitySchema).nonempty(),
})

export function validatePokemon(pokemon?: Pokemon) {
  if (!pokemon) return undefined
  return createValidator(pokemonFormSchema).validate<Pokemon>(pokemon)
}

export const pokemonFormFamily = createFormFamily<Pokemon>()

export const getPokemonFormAtom = (param: PokemonParam) => pokemonFormFamily(param)

export const usePokemonForm = (param: PokemonParam) => useAtom(getPokemonFormAtom(param))
export const usePokemonFormMutation = (param: PokemonParam) => {
  const mutate = useSetAtom(getPokemonFormAtom(param))
  return useCallback(
    (update: Partial<Pokemon>) => {
      return mutate((previous) => {
        if (!previous?.values) return undefined

        const newValues = {
          ...previous.values,
          ...update,
        }
        const errors = validatePokemon(newValues)

        return {
          status: 'editing',
          values: newValues,
          errors,
          isValid: !errors,
        }
      })
    },
    [param, mutate]
  )
}
