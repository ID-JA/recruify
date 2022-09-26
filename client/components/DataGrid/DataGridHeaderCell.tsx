import { flexRender, Header } from '@tanstack/react-table'

type DataTableHeaderCell<T> = {
  header: Header<T, unknown>
}

function DataGridHeaderCell<T>({ header }: DataTableHeaderCell<T>) {
  return (
    <th
      style={{
        width: header.getSize(),
        maxWidth: header.getSize(),
      }}
      role="columnheader"
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  )
}

export default DataGridHeaderCell
