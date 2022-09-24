import { Cell, flexRender } from '@tanstack/react-table'

type DataGridRowCellProps<T> = {
  cell: Cell<T, unknown>
}

function DataGridRowCell<T>({ cell }: DataGridRowCellProps<T>) {
  return <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
}

export default DataGridRowCell
