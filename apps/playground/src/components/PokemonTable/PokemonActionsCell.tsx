import { Button } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { Pokemon } from '../../data'
import { editsAtom } from './PokemonTable'

export function PokemonActionsCell({ row }: CellContext<Pokemon, unknown>) {
  const [_, setEdits] = useAtom(editsAtom)
  return (
    <Button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setEdits((old) => {
          const id = row.id
          const stored = (old as any)[id] ?? false
          return { ...old, [id]: !stored }
        })
      }}
    >
      edit
    </Button>
  )
}
