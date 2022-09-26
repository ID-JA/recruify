import { createStyles } from '@mantine/core'
import { Row } from '@tanstack/react-table'
import { MouseEventHandler } from 'react'
import DataGridRowCell from './DataGridRowCell'

type DataGridRowProps<T> = {
  row: Row<T>
  selected?: boolean
  onClick: MouseEventHandler<HTMLTableRowElement> | undefined
  onContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined
  withCursorPointer?: boolean
}

const useStyles = createStyles((theme) => ({
  withPointerCursor: {
    cursor: 'pointer',
  },
  rowSelected: {
    backgroundColor: `${theme.fn.lighten(
      theme.colors.blue[6],
      0.85
    )} !important`,
  },
}))

function DataGridRow<T>({
  row,
  selected,
  onClick,
  onContextMenu,
  withCursorPointer,
}: DataGridRowProps<T>) {
  const { classes, cx } = useStyles()
  return (
    <tr
      className={cx({
        [classes.rowSelected]: selected,
        [classes.withPointerCursor]: withCursorPointer,
      })}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {row.getAllCells().map((cell) => {
        return <DataGridRowCell key={cell.id} cell={cell} />
      })}
    </tr>
  )
}

export default DataGridRow
