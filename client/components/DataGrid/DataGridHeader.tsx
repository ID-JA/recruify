import { CSSObject } from '@mantine/core'
import { DataGridColumn } from './DataGrid.props'
import DataGridHeaderCell from './DataGridHeaderCell'

export type DataGridHeader<T> = {
  columns: DataGridColumn<T>[]
  style?: CSSObject
}

function DataGridHeader<T>({ columns }: DataGridHeader<T>) {
  return (
    <thead>
      <tr>
        {columns.map(({ accessor, textAlignment, title }) => (
          <DataGridHeaderCell
            key={accessor}
            accessor={accessor}
            title={title}
            textAlignment={textAlignment}
          />
        ))}
      </tr>
    </thead>
  )
}

export default DataGridHeader
