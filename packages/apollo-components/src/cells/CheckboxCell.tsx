import { Checkbox } from '@equinor/eds-core-react'
import { CellContext } from '@tanstack/react-table'

export function CheckboxCell<T>(context: CellContext<T, boolean>) {
  return (
    <Checkbox
      enterKeyHint="next"
      aria-label="readonly"
      readOnly={true}
      checked={context.getValue()}
      disabled={true}
    />
  )
}
