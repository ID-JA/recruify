import { Box, createStyles, ScrollArea, Table } from '@mantine/core'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DataGridProps } from './DataGrid.props'
import DataGridHeader from './DataGridHeader'
import DataGridRow from './DataGridRow'

const useStyles = createStyles((theme) => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      tr: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      },
    },
  }
})

export function DataGrid<T>({ data, columns }: DataGridProps<T>) {
  const { classes, cx } = useStyles()

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Box className={cx(classes.root)}>
      <ScrollArea>
        <Table>
          <DataGridHeader headerGroups={table.getHeaderGroups()} />
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <DataGridRow key={row.id} row={row} />
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Box>
  )
}
