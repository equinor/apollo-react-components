import { Typography } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { useAtom } from 'jotai'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { globalFilterAtom } from '../atoms'
import { DebouncedInput } from '../filters'

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

interface DataTableHeaderProps {
  tableCaption?: string
  captionPadding?: string
  enableGlobalFilter?: boolean
  globalFilterPlaceholder?: string
  filterActions?: ReactNode
}

export const DataTableHeader = (props: DataTableHeaderProps) => {
  const [globalFilter, setGlobalFilter] = useAtom(globalFilterAtom)

  return (
    <DataTableHeaderWrapper className="--table-caption" captionPadding={props.captionPadding}>
      {props?.tableCaption && <Typography variant="h3">{props?.tableCaption}</Typography>}
      {props?.enableGlobalFilter && (
        <FilterContainer className="--filter-container">
          <DebouncedInput
            value={globalFilter}
            icon={search}
            placeholder={props?.globalFilterPlaceholder ?? 'Search all columns'}
            onChange={(value) => setGlobalFilter(String(value))}
          />
          {props.filterActions}
        </FilterContainer>
      )}
    </DataTableHeaderWrapper>
  )
}
