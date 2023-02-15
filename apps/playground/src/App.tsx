import { AppShell } from '@equinor/apollo-components'
import { launch } from '@equinor/eds-icons'
import { PokemonTable } from './components'

export function App() {
  return <AppShell title="Playground" icon={launch} children={<PokemonTable />} />
}
