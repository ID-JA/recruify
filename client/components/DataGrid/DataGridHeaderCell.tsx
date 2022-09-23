import { ReactNode } from 'react'
import { DataGridColumn } from './DataGrid.props'

type DataTableHeaderCell<T> = {
  title: ReactNode | undefined
} & Pick<DataGridColumn<T>, 'accessor' | 'textAlignment'>

function DataGridHeaderCell<T>({ title }: DataTableHeaderCell<T>) {
  return <th>{title}</th>
}

export default DataGridHeaderCell
