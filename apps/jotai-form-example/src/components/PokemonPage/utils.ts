import { createFormFamily, createValidator, useFormFamilyUtils } from '@equinor/apollo-utils'
import { Pokemon, pokemonSchema } from 'mock-data'

export const pokemonFormFamily = createFormFamily<Pokemon>()

const pokemonValidator = createValidator(pokemonSchema)
export const pokemonFormUtils = useFormFamilyUtils(pokemonFormFamily, {
  validator: pokemonValidator,
})
