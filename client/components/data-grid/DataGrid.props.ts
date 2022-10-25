import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/core'
import {
  ColumnDef,
  InitialTableState,
  PaginationState,
  RowData,
  RowSelectionState,
} from '@tanstack/react-table'
import useStyles from './DataGrid.styles'

export type DataGridStylesNames = Selectors<typeof useStyles>

export type OnChangeCallback<T> = (arg0: T) => void

export interface DataGridProps<TData extends RowData>
  extends DefaultProps<DataGridStylesNames, object> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  fontSize?: MantineNumberSize
  total: number
  withPagination?: boolean
  withRowSelection?: boolean
  onPageChange?: OnChangeCallback<PaginationState>
  onRowSelectionChange?: OnChangeCallback<RowSelectionState>
  initialState?: InitialTableState
  withBoarder?: boolean
  noEllipsis?: boolean
  striped?: boolean
  highlightOnHover?: boolean
  pageSizes?: string[]
}
