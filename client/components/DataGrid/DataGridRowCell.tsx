import { ReactNode } from 'react'
import { DataGridColumn } from './DataGrid.props'

function getValueAtPath(obj: unknown, path: string) {
  if (!path) return undefined
  const pathArray = path.match(/([^[.\]])+/g) as string[]
  return pathArray.reduce(
    (prevObj: unknown, key) =>
      prevObj && (prevObj as Record<string, unknown>)[key],
    obj
  )
}

type DataGridRowCellProps<T> = {
  record: T
} & Pick<DataGridColumn<T>, 'accessor' | 'render'>

function DataGridRowCell<T>({
  accessor,
  record,
  render,
}: DataGridRowCellProps<T>) {
  return (
    <td>
      {render
        ? render(record)
        : (getValueAtPath(record, accessor) as ReactNode)}
    </td>
  )
}

export default DataGridRowCell
