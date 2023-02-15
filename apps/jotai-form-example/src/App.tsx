import { AppShell } from '@equinor/apollo-components'
import { launch } from '@equinor/eds-icons'
import { PokemonPage } from './components'

export function App() {
  return <AppShell title="Pokémon Jotai Form Example" icon={launch} children={<PokemonPage />} />
}
