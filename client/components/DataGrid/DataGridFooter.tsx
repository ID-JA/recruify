import {
  Box,
  createStyles,
  MantineNumberSize,
  MantineTheme,
  Pagination,
  Text,
} from '@mantine/core'
import { ReactNode } from 'react'
import { DataTablePaginationProps } from './DataGrid.props'

const useStyles = createStyles(
  (
    theme,
    {
      topBorderColor,
    }: { topBorderColor: string | ((theme: MantineTheme) => string) }
  ) => ({
    root: {
      borderTop: `1px solid ${
        typeof topBorderColor === 'function'
          ? topBorderColor(theme)
          : topBorderColor
      }`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
      [theme.fn.largerThan('xs')]: { flexDirection: 'row' },
    },
    pagination: {
      transition: 'opacity .15s ease',
    },
  })
)

type DataTableFooterProps = DataTablePaginationProps & {
  className?: string
  recordsLength: number | undefined
  topBorderColor: string | ((theme: MantineTheme) => string)
  horizontalSpacing: MantineNumberSize | undefined
}

function DataGridFooter({
  page,
  recordsLength,
  onPageChange,
  paginationSize,
  paginationText,
  totalRecords,
  recordsPerPage,
  topBorderColor,
  className,
  horizontalSpacing,
}: DataTableFooterProps) {
  const { classes, cx } = useStyles({ topBorderColor })

  let paginationTextValue: ReactNode

  const from = (page! - 1) * recordsPerPage + 1
  const to = from + recordsLength! - 1

  paginationTextValue = paginationText!({
    from,
    to,
    totalRecords: totalRecords as number,
  })

  return (
    <Box
      px={horizontalSpacing ?? 'xs'}
      className={cx(classes.root, className)}
      py="xs"
    >
      <Text size={paginationSize}>{paginationTextValue}</Text>
      <Pagination
        className={cx(classes.pagination)}
        page={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
        siblings={1}
      />
    </Box>
  )
}

export default DataGridFooter
