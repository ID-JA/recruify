import { Group, Pagination, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { DataTablePaginationProps } from './DataGrid.props'

type DataTableFooterProps = DataTablePaginationProps & {
  className?: string
  recordsLength: number | undefined
}

function DataGridFooter({
  page,
  recordsLength,
  onPageChange,
  paginationSize,
  paginationText,
  totalRecords,
  recordsPerPage,
}: DataTableFooterProps) {
  console.log({
    recordsLength,
    totalRecords,
    total: Math.ceil(totalRecords! / recordsPerPage!),
  })

  let paginationTextValue: ReactNode

  const from = (page! - 1) * recordsPerPage + 1
  const to = from + recordsLength! - 1
  console.log({ from, to, recordsLength })

  paginationTextValue = paginationText!({
    from,
    to,
    totalRecords: totalRecords as number,
  })

  return (
    <Group position="apart" py="xs">
      <Text size={paginationSize}>{paginationTextValue}</Text>
      <Pagination
        page={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
      />
    </Group>
  )
}

export default DataGridFooter
