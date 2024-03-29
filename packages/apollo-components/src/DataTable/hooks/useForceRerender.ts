import { useCallback, useState } from 'react'

export function useForceRerender() {
  const [, setTick] = useState(0)
  return useCallback(() => setTick((tick) => tick + 1), [])
}
