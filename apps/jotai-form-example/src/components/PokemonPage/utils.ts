import { createValidator, useFormFamilyUtils } from '@equinor/apollo-utils'
import { pokemonFormFamily, pokemonFormSchema } from './atoms'

const pokemonValidator = createValidator(pokemonFormSchema)
export const pokemonFormUtils = useFormFamilyUtils(pokemonFormFamily, {
  validator: pokemonValidator,
})
