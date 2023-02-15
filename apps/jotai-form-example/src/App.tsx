import { AppShell } from '@equinor/apollo-components'
import { launch } from '@equinor/eds-icons'
import { PokemonJotai } from './components'

export function App() {
  return <AppShell title="Pokémon Jotai Form Example" icon={launch} children={<PokemonJotai />} />
}
