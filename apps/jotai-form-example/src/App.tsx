import { AppShell } from '@equinor/apollo-components'
import { launch } from '@equinor/eds-icons'
import { ReactLocation, Router } from '@tanstack/react-location'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PokemonPage } from './features'
import { EntryPage } from './features/entry-page'
import { UnitEventsPage } from './features/unit-events-page'

const queryClient = new QueryClient()

const location = new ReactLocation()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        title="Pokémon Jotai Form Example"
        icon={launch}
        children={
          <Router
            location={location}
            routes={[
              { path: '/', element: <EntryPage /> },
              { path: '/pokemon', element: <PokemonPage /> },
              { path: '/unit-events', element: <UnitEventsPage /> },
            ]}
          />
        }
      />
    </QueryClientProvider>
  )
}
