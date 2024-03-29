import { Button, Icon } from '@equinor/eds-core-react'
import { add, remove } from '@equinor/eds-icons'
import { UnitEvent } from './types'
import { buildNewUnitEvent } from './utils'

interface UnitEventBannerActionsProps {
  hasEditRows: boolean
  onCancelAll: () => void
  addRows: (rows: UnitEvent[]) => void
}

export function UnitEventBannerActions({
  addRows,
  onCancelAll,
  hasEditRows,
}: UnitEventBannerActionsProps) {
  const handleAddRow = () => {
    const newUnitEvent = buildNewUnitEvent()
    addRows([newUnitEvent])
  }

  return (
    <>
      <Button onClick={handleAddRow}>
        <Icon name="add" title="Add row" data={add} />
        Add rows
      </Button>
      <Button disabled={!hasEditRows} onClick={onCancelAll} title="Cancel all">
        <Icon name="add" title="Add row" data={remove} />
        Cancel all
      </Button>
    </>
  )
}
