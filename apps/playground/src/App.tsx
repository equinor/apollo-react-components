import { AppShell } from '@equinor/apollo-components'
import { launch } from '@equinor/eds-icons'
import { PokemonJotai } from './components/PokemonJotai'

export function App() {
  return <AppShell title="Playground" icon={launch} children={<PokemonJotai />} />
}
