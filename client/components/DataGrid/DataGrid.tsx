import { ScrollArea, Table } from '@mantine/core'
import {
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  RowData,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { useCallback, useEffect } from 'react'
import { DataGridProps } from './DataGrid.props'
import useStyles from './DataGrid.styles'
import Pagination from './Pagination'
import { getRowSelectionColumn } from './RowSelection'

export const DEFAULT_INITIAL_PAGE = 0
export const DEFAULT_INITIAL_SIZE = 10

function DataGrid<TData extends RowData>({
  columns,
  data,
  initialState,
  fontSize,
  total,
  withPagination,
  withRowSelection,
  onPageChange,
  onRowSelectionChange,
  withBoarder,
  striped,
  highlightOnHover,
  noEllipsis,
}: DataGridProps<TData>) {
  const table = useReactTable<TData>({
    data,
    columns: withRowSelection
      ? [{ ...getRowSelectionColumn() }, ...columns]
      : columns,
    initialState,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (arg0) => {
      const pagination = table.getState().pagination
      const next = functionalUpdate(arg0, pagination)
      if (
        next.pageIndex !== pagination.pageIndex ||
        next.pageSize !== pagination.pageSize
      ) {
        onPageChange && onPageChange(next)
        table.setState((state) => ({
          ...state,
          pagination: next,
        }))
      }
    },
    [onPageChange]
  )

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (arg0) => {
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.rowSelection)
        onRowSelectionChange && onRowSelectionChange(next)
        return {
          ...state,
          rowSelection: next,
        }
      })
    },
    [onRowSelectionChange]
  )

  const pageCount =
    withPagination && total
      ? Math.ceil(total / table.getState().pagination.pageSize)
      : undefined

  table.setOptions((prev) => ({
    ...prev,
    pageCount,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: handleRowSelectionChange,
  }))

  useEffect(() => {
    if (withPagination) {
      table.setPageSize(
        initialState?.pagination?.pageSize || DEFAULT_INITIAL_SIZE
      )
    } else {
      table.setPageSize(data.length)
    }
  }, [withPagination])

  const { classes } = useStyles({ withBoarder, noEllipsis })

  return (
    <div className={classes.wrapper}>
      <ScrollArea>
        <Table
          highlightOnHover={highlightOnHover}
          fontSize={fontSize}
          className={classes.table}
          striped={striped}
          horizontalSpacing="xl"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} role="row">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    role="columnheader"
                    style={{
                      width: header.getSize(),
                    }}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div className={classes.headerCell}>
                        <div className={classes.headerCellContent}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody role="rowgroup" className={classes.tbody}>
            {table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} role="row">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          style={{
                            width: cell.column.getSize(),
                          }}
                          role="cell"
                        >
                          <div className={classes.dataCell}>
                            <div className={classes.dataCellContent}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </ScrollArea>
      {withPagination && (
        <Pagination
          table={table}
          total={total}
          fontSize={fontSize}
          classes={[classes.pagination]}
        />
      )}
    </div>
  )
}

export default DataGrid
