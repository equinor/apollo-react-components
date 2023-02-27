import { Button, Card } from '@equinor/eds-core-react'
import { Link } from '@tanstack/react-location'

export function EntryPage() {
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <Card style={{ marginTop: '4rem', maxWidth: '20rem' }}>
        <Card.Content>
          <Card.Header>
            <Card.HeaderTitle>
              <h1>Choose table</h1>
            </Card.HeaderTitle>
          </Card.Header>
          <Card.Actions>
            <Button as={Link} to="/pokemon">
              Pokemon
            </Button>
            <Button as={Link} to="/unit-events">
              Unit Events
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </div>
  )
}
