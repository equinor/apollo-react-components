import { Provider } from 'jotai'
import { ComponentProps } from 'react'

export type DataTableProviderProps = ComponentProps<typeof Provider>

export function DataTableProvider({ children, ...props }: DataTableProviderProps) {
  return <Provider {...props}>{children}</Provider>
}
