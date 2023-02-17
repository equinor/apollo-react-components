import { useAtomsDebugValue } from 'jotai-devtools'
import { PokemonTable } from './PokemonTable'

export function PokemonPage() {
  return (
    <div>
      <PokemonTable />
      <JotaiDebug />
    </div>
  )
}

function JotaiDebug() {
  useAtomsDebugValue()
  return null
}
