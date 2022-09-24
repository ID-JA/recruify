import { HeaderGroup } from '@tanstack/react-table'
import DataGridHeaderCell from './DataGridHeaderCell'

type DataGridHeader<T> = {
  headerGroups: HeaderGroup<T>[]
}

function DataGridHeader<T>({ headerGroups }: DataGridHeader<T>) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <DataGridHeaderCell key={header.id} header={header} />
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default DataGridHeader
