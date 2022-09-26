import {
  Box,
  createStyles,
  Divider,
  MantineTheme,
  ScrollArea,
  Table,
} from '@mantine/core'

import { MouseEventHandler, useState } from 'react'

import { DataGridProps } from './DataGrid.props'
import DataGridFooter from './DataGridFooter'
import DataGridHeader from './DataGridHeader'
import DataGridRow from './DataGridRow'
import DataGridRowMenu from './DataGridRowMenu'
import DataGridRowMenuItem from './DataGridRowMenuItem'

const useStyles = createStyles(
  (
    theme,
    {
      borderColor,
      rowBorderColor,
    }: {
      borderColor: string | ((theme: MantineTheme) => string)
      rowBorderColor: string | ((theme: MantineTheme) => string)
    }
  ) => {
    const borderColorValue =
      typeof borderColor === 'function' ? borderColor(theme) : borderColor
    const rowBorderColorValue =
      typeof rowBorderColor === 'function'
        ? rowBorderColor(theme)
        : rowBorderColor

    return {
      root: {
        heigh: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: theme.radius.sm,
        width: '100%',

        tr: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
        '&&': {
          'thead tr th': {
            borderBottomColor: borderColorValue,
          },
          'tbody tr td': {
            borderBottomColor: rowBorderColorValue,
          },
        },
      },
      lastRowBorderBottomVisible: {
        'tbody tr:last-of-type td': {
          borderBottom: `1px solid ${rowBorderColorValue}`,
        },
      },
      textSelectionDisabled: {
        userSelect: 'none',
      },
      table: {
        borderCollapse: 'separate',
        borderSpacing: 0,
        height: '100%',
        width: '100%',
      },
      scrollArea: {
        position: 'relative',
        paddingBottom: theme.spacing.lg,
      },
      tableWithBorder: {
        border: `1px solid ${borderColorValue}`,
      },
      tableWithColumnBorders: {
        'th, td': {
          ':not(:first-of-type)': {
            borderLeft: `1px solid ${rowBorderColorValue}`,
          },
        },
      },
      verticalAlignmentTop: {
        td: {
          verticalAlign: 'top',
        },
      },
      verticalAlignmentBottom: {
        td: {
          verticalAlign: 'bottom',
        },
      },
    }
  }
)

export function DataGrid<T>({
  table,
  onRowClick,
  rowContextMenu,
  onPageChange,
  paginationText = ({ from, to, totalRecords }) =>
    `${from} - ${to} / ${totalRecords}`,
  page,
  paginationSize,
  recordsPerPage,
  totalRecords,
  withBorder,
  borderColor = (theme) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
  rowBorderColor = (theme) =>
    theme.fn.rgba(
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[3],
      0.65
    ),
}: DataGridProps<T>) {
  const { cx, classes } = useStyles({ borderColor, rowBorderColor })

  const [rowContextMenuInfo, setRowContextMenuInfo] = useState<{
    top: number
    left: number
    record: T
  } | null>(null)

  const handlePageChange = (page: number) => {
    onPageChange!(page)
  }

  const recordsLength = table.getRowModel().rows.length
  return (
    <Box
      className={cx(classes.root, {
        [classes.tableWithBorder]: withBorder,
      })}
    >
      <ScrollArea className={classes.scrollArea}>
        <Table className={cx(classes.table)} horizontalSpacing="xl">
          <DataGridHeader headerGroups={table.getHeaderGroups()} />
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const selected =
                Object.keys(table.getState().rowSelection).indexOf(row.id) !==
                -1
              let showContextMenuOnRightClick = false
              let showContextMenuOnClick = false
              if (rowContextMenu) {
                const { hidden } = rowContextMenu

                if (
                  !hidden ||
                  !(typeof hidden === 'function'
                    ? hidden(row.original)
                    : hidden)
                ) {
                  if (rowContextMenu.trigger === 'click') {
                    showContextMenuOnClick = true
                  } else {
                    showContextMenuOnRightClick = true
                  }
                }
              }

              let handleClick:
                | MouseEventHandler<HTMLTableRowElement>
                | undefined
              if (showContextMenuOnClick) {
                handleClick = (e) => {
                  setRowContextMenuInfo({
                    top: e.clientY,
                    left: e.clientX,
                    record: row.original,
                  })
                  onRowClick?.(row.original)
                }
              } else if (onRowClick) {
                handleClick = () => {
                  onRowClick(row.original)
                }
              }

              let handleContextMenu:
                | MouseEventHandler<HTMLTableRowElement>
                | undefined
              if (showContextMenuOnRightClick) {
                handleContextMenu = (e) => {
                  e.preventDefault()
                  setRowContextMenuInfo({
                    top: e.clientY,
                    left: e.clientX,
                    record: row.original,
                  })
                }
              }
              return (
                <DataGridRow
                  withCursorPointer={!!onRowClick}
                  key={row.id}
                  row={row}
                  selected={selected}
                  onClick={handleClick}
                  onContextMenu={handleContextMenu}
                />
              )
            })}
          </tbody>
        </Table>
      </ScrollArea>
      {rowContextMenuInfo && rowContextMenuInfo && (
        <DataGridRowMenu
          zIndex={rowContextMenu?.zIndex}
          top={rowContextMenuInfo.top}
          left={rowContextMenuInfo.left}
          onDestroy={() => setRowContextMenuInfo(null)}
        >
          {rowContextMenu
            ?.items(rowContextMenuInfo.record)
            .map(
              ({
                key,
                color,
                disabled,
                divider,
                icon,
                onClick,
                title,
                hidden,
              }) =>
                divider ? (
                  <Divider key={key} />
                ) : hidden ? null : (
                  <DataGridRowMenuItem
                    key={key}
                    title={title}
                    icon={icon}
                    disabled={disabled}
                    onClick={() => {
                      setRowContextMenuInfo(null)
                      onClick()
                    }}
                    color={color}
                  />
                )
            )}
        </DataGridRowMenu>
      )}
      <DataGridFooter
        page={page}
        paginationSize={paginationSize}
        onPageChange={handlePageChange}
        recordsLength={recordsLength}
        recordsPerPage={recordsPerPage}
        totalRecords={totalRecords}
        paginationText={paginationText}
        horizontalSpacing="lg"
        topBorderColor="#EAECF0"
      />
    </Box>
  )
}
