import { launch } from '@equinor/eds-icons'
import { AppShell } from 'ui'
import { PokemonTable } from './components'

export function App() {
  return <AppShell title="Playground" icon={launch} children={<PokemonTable />} />
}
