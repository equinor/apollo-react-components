import { useAtomsDebugValue } from 'jotai-devtools'
import { UnitEventsTable } from './UnitEventsTable'

export function UnitEventsPage() {
  return (
    <div>
      <UnitEventsTable />
      <JotaiDebug />
    </div>
  )
}

function JotaiDebug() {
  useAtomsDebugValue()
  return null
}
