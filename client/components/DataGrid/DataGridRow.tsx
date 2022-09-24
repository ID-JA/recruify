import { Row } from '@tanstack/react-table'
import DataGridRowCell from './DataGridRowCell'

type DataGridRowProps<T> = {
  row: Row<T>
}

function DataGridRow<T>({ row }: DataGridRowProps<T>) {
  return (
    <tr>
      {row.getAllCells().map((cell) => (
        <DataGridRowCell key={cell.id} cell={cell} />
      ))}
    </tr>
  )
}

export default DataGridRow
