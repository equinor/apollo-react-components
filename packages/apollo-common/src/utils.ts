import { SyntheticEvent } from 'react'

/** Wrap an event handler and stop event propagation */
export function stopPropagation<T extends HTMLElement>(handler: (e: SyntheticEvent<T>) => void) {
  return (e: SyntheticEvent<T>) => {
    e.stopPropagation()
    handler(e)
  }
}
