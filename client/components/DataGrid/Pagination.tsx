import {
  Group,
  MantineNumberSize,
  Pagination as MantinePagination,
  Text,
} from '@mantine/core'
import { Table } from '@tanstack/react-table'

type PaginationProps<TData> = {
  table: Table<TData>
  total?: number
  fontSize?: MantineNumberSize
  classes: string[]
}

function Pagination<TData>({
  table,
  total,
  fontSize = 'md',
  classes,
}: PaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize

  const maxRows = total ? total : table.getPaginationRowModel().rows.length
  const rowsPerPage = table.getRowModel().rows.length
  const firstRowNum = maxRows === 0 ? 0 : pageIndex * pageSize + 1
  const lastRowNum = maxRows === 0 ? 0 : firstRowNum + rowsPerPage - 1

  const handlePageChange = (value: number) => {
    table.setPageIndex(value - 1)
  }

  return (
    <Group position="apart" p="xs" className={classes[0]}>
      <Text size={fontSize}>
        Showing <b>{firstRowNum}</b> - <b>{lastRowNum}</b> of <b>{maxRows}</b>{' '}
        result{maxRows === 1 ? '' : 's'}
      </Text>
      <MantinePagination
        size={fontSize}
        page={table.getState().pagination.pageIndex + 1}
        total={Math.ceil(table.getPageCount())}
        onChange={handlePageChange}
        siblings={1}
      />
    </Group>
  )
}

export default Pagination
