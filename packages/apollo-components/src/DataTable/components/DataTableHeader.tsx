import { Typography } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { Table } from '@tanstack/react-table'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { globalFilterAtom } from '../atoms'
import { DebouncedInput } from '../filters'
import { FilterConfig } from '../types'
import { ColumnSelect } from './ColumnSelect'

const DataTableHeaderWrapper = styled.div<{ captionPadding?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: ${(props) => props.captionPadding ?? '1rem'};
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`

interface DataTableHeaderProps<T> {
  table: Table<T>
  tableCaption?: string
  captionPadding?: string
  config?: FilterConfig
}

export function DataTableHeader<T>({ config, table, ...props }: DataTableHeaderProps<T>) {
  const [globalFilter, setGlobalFilter] = useAtom(globalFilterAtom)

  return (
    <DataTableHeaderWrapper className="--table-caption" captionPadding={props.captionPadding}>
      {props?.tableCaption && <Typography variant="h3">{props?.tableCaption}</Typography>}

      <FilterContainer className="--filter-container">
        <>
          {config?.globalFilter && (
            <DebouncedInput
              value={globalFilter}
              icon={search}
              placeholder={config?.globalFilterPlaceholder ?? 'Search all columns'}
              onChange={(value) => setGlobalFilter(String(value))}
            />
          )}
          {config?.filterActions?.(table)}
          {config?.columnSelect && <ColumnSelect table={table} />}
        </>
      </FilterContainer>
    </DataTableHeaderWrapper>
  )
}
