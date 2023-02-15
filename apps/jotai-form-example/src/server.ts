import { httpLink } from '@trpc/client'
import { atom } from 'jotai'
import { createTRPCJotai } from 'jotai-trpc'
import { trpcPokemonUrl, type PokemonRouter } from 'trpc-pokemon'

export const trpc = createTRPCJotai<PokemonRouter>({
  links: [
    httpLink({
      url: trpcPokemonUrl,
    }),
  ],
})

const NAMES = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise',
]

export const nameAtom = atom<string>(NAMES[0])
export const pokemonAtom = trpc.pokemon.byId.atomWithQuery((get) => get(nameAtom))
export const allPokemonAtom = trpc.pokemon.all.atomWithQuery()
export const abilitiesAtom = trpc.ability.all.atomWithQuery()
