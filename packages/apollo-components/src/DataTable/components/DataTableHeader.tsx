import { Typography } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { OnChangeFn, Table } from '@tanstack/react-table'
import styled from 'styled-components'
import { DebouncedInput } from '../filters'
import { DataTableProps } from '../types'
import { ColumnSelect } from './ColumnSelect'

const TableBannerWrapper = styled.div<{ padding?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: ${(props) => props.padding || '1rem'};
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`

interface DataTableHeaderProps<T> {
  table: Table<T>
  tableCaption: string
  bannerConfig: DataTableProps<T>['bannerConfig']
  globalFilter: { state: string; onChange: OnChangeFn<string> }
}

export function TableBanner<T>({
  table,
  bannerConfig,
  tableCaption,
  globalFilter,
}: DataTableHeaderProps<T>) {
  return (
    <TableBannerWrapper className="--table-caption" padding={bannerConfig?.padding}>
      <FilterContainer className="--filter-container-left">
        {bannerConfig?.enableTableCaption && (
          <Typography variant="h3" as="h2">
            {tableCaption}
          </Typography>
        )}
        {bannerConfig?.customActionsLeft?.(table) ?? bannerConfig?.customActions?.(table)}
      </FilterContainer>

      <FilterContainer className="--filter-container-right">
        <>
          {bannerConfig?.customActionsRight?.(table)}
          {bannerConfig?.enableGlobalFilterInput && (
            <DebouncedInput
              value={globalFilter.state}
              icon={search}
              placeholder={bannerConfig.globalFilterPlaceholder ?? 'Search all columns'}
              onChange={(value) => globalFilter.onChange(String(value))}
            />
          )}
          {bannerConfig?.enableColumnSelect && <ColumnSelect table={table} columnSelectPlaceholder={bannerConfig.columnSelectPlaceholder} />}
          {bannerConfig?.totalRowCount && (
            <span>
              {table.options.data.length.toLocaleString()} /{' '}
              {bannerConfig.totalRowCount.toLocaleString()} rows
            </span>
          )}
        </>
      </FilterContainer>
    </TableBannerWrapper>
  )
}
