import { AppShell } from '@equinor/apollo-components'
import { launch } from '@equinor/eds-icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PokemonPage } from './components'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell title="Pokémon Jotai Form Example" icon={launch} children={<PokemonPage />} />
    </QueryClientProvider>
  )
}
