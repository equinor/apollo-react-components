import { atom, useAtom, useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { useMemo } from 'react'
import { Pokemon } from 'trpc-pokemon'
import { trpc } from '../../server'

export const allPokemonAtom = trpc.pokemon.all.atomWithQuery()

export const createPokemonAtom = (pokemon: Pokemon) => atom(pokemon)

// Pokemon Form Handling
export const pokemonFormAtomsAtom = atom<Pokemon[]>([])
export const pokemonFormAtomsCountAtom = atom((get) => {
  return get(pokemonFormAtomsAtom).length
})

export const addPokemonFormAtom = atom(null, (_get, set, update: Pokemon) => {
  set(pokemonFormAtomsAtom, (prev) => [...prev, update])
})

type UpdatePokemonFormParams = {
  id: string
  changes: Partial<Pokemon>
}

export const updatePokemonFormAtom = atom(null, (get, set, update: UpdatePokemonFormParams) => {
  const allPokemon = get(pokemonFormAtomsAtom)
  const pokemonForm = allPokemon.find((pokemonForm) => pokemonForm.id === update.id)

  if (!pokemonForm) return pokemonForm
  set(
    pokemonFormAtomsAtom,
    allPokemon.map((pokemon) =>
      pokemon.id === update.id ? { ...pokemon, ...update.changes } : pokemon
    )
  )
})

export const deletePokemonFormAtom = atom(null, (_get, set, pokemonId: string) => {
  set(pokemonFormAtomsAtom, (prev) => prev.filter((item) => item.id === pokemonId))
})

export const deleteAllPokemonForms = atom(null, (_get, set) => {
  set(pokemonFormAtomsAtom, [])
})

export function usePokemonFormAtom(id: string) {
  const formAtoms = useAtomValue(pokemonFormAtomsAtom)
  return useMemo(() => formAtoms.find((formItem) => formItem.id === id), [id, formAtoms])
}

type PokemonParam = {
  id: string
  editForm?: Partial<Pokemon>
}

export const pokemonFormFamily = atomFamily(
  (param: PokemonParam) => {
    return atom(param.editForm)
  },
  (a, b) => a.id === b.id
)

export const usePokemonForm = (param: PokemonParam) => useAtom(pokemonFormFamily(param))
