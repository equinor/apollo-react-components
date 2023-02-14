import { Button } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { useEffect } from 'react'
import { Pokemon } from 'trpc-pokemon'
import { usePokemonForm } from './atoms'

export function ActionsCell({ row }: CellContext<Pokemon, unknown>) {
  const [pokemonForm, setPokemonForm] = usePokemonForm({ id: row.id })

  function handleEdit() {
    console.log({ pokemonForm })
    setPokemonForm({
      ...pokemonForm,
      weight: 420,
    })
  }

  function handleCancel() {
    setPokemonForm(undefined)
  }
  useEffect(() => {
    console.log({ pokemonForm })
  }, [pokemonForm])

  return (
    <div>
      <Button onClick={() => handleEdit()}>Edit</Button>
      <Button onClick={() => handleCancel()}>Cancel</Button>
    </div>
  )
}
