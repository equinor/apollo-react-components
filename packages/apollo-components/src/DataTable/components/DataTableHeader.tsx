import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { DebouncedInput } from '../filters'

const DataTableHeaderWrapper = styled.div<{ captionPadding?: string }>`
  & > * + * {
    margin-top: 0.5rem;
  }
  gap: 0.5rem;
  padding: ${(props) => props.captionPadding ?? '1rem'};
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

interface DataTableHeaderProps {
  tableCaption?: string
  captionPadding?: string
  enableGlobalFilter?: boolean
  globalFilter?: string
  globalFilterPlaceholder?: string
  setGlobalFilter?: (value: string) => void
}

export const DataTableHeader = (props: DataTableHeaderProps) => {
  return (
    <DataTableHeaderWrapper className="--table-caption" captionPadding={props.captionPadding}>
      {props?.tableCaption && <Typography variant="h2">{props?.tableCaption}</Typography>}
      {props?.enableGlobalFilter && (
        <FilterContainer className="--filter-container">
          <DebouncedInput
            value={props.globalFilter ?? ''}
            placeholder={props?.globalFilterPlaceholder ?? 'Search all columns'}
            onChange={(value) => props.setGlobalFilter?.(String(value))}
          />
        </FilterContainer>
      )}
    </DataTableHeaderWrapper>
  )
}
