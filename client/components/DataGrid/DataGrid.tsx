import { Box, createStyles, ScrollArea, Table } from '@mantine/core'
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

  return (
    <Box className={cx(classes.root)}>
      <ScrollArea>
        <Table>
          <DataGridHeader<T> columns={columns} />
          <tbody>
            {data?.map((record, recordIndex) => {
              return (
                <DataGridRow
                  key={`${record}-${recordIndex}`}
                  columns={columns}
                  record={record}
                />
              )
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </Box>
  )
}
