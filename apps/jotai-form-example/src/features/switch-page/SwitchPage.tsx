import { Button, Card } from '@equinor/eds-core-react'
import { useState } from 'react'
import { PokemonTable } from '../pokemon-page/PokemonTable'
import { UnitEventsTable } from '../unit-events-page/UnitEventsTable'

export function SwitchPage() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <>
      <Card style={{ maxWidth: '20rem', margin: '0 auto' }}>
        <Card.Content>
          <Card.Header>
            <Card.HeaderTitle>
              <h1>Choose table</h1>
            </Card.HeaderTitle>
          </Card.Header>
          <Card.Actions>
            <Button onClick={() => setTabIndex(0)}>Pokemon</Button>
            <Button onClick={() => setTabIndex(1)}>Unit Events</Button>
          </Card.Actions>
        </Card.Content>
      </Card>

      {tabIndex === 0 && <PokemonTable />}
      {tabIndex === 1 && <UnitEventsTable />}
    </>
  )
}
