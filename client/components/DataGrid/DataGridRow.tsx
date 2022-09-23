import { DataGridColumn } from './DataGrid.props'
import DataGridRowCell from './DataGridRowCell'

type DataGridRowProps<T> = {
  record: T
  columns: DataGridColumn<T>[]
}

function DataGridRow<T>({ columns, record }: DataGridRowProps<T>) {
  return (
    <tr>
      {columns.map(({ accessor, render }) => (
        <DataGridRowCell
          key={accessor}
          accessor={accessor}
          record={record}
          render={render}
        />
      ))}
    </tr>
  )
}

export default DataGridRow
