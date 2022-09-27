import { Checkbox } from '@mantine/core'
import { ColumnDef, RowData } from '@tanstack/react-table'

export const getRowSelectionColumn = <TData extends RowData>(): ColumnDef<
  TData,
  unknown
> => ({
  id: 'select',
  header: ({ table }) => {
    const handleHeaderSelectionChange = () => {
      const value =
        (!table.getIsAllRowsSelected() && table.getIsSomePageRowsSelected()) ||
        !table.getIsAllPageRowsSelected()
      table.toggleAllPageRowsSelected(value)
    }
    return (
      <Checkbox
        aria-label="header selector "
        sx={{
          cursor: 'pointer',
        }}
        {...{
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            !table.getIsAllPageRowsSelected() &&
            table.getIsSomePageRowsSelected(),
          onChange: handleHeaderSelectionChange,
        }}
        onClick={(e) => e.stopPropagation()}
      />
    )
  },
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
  size: 24,
})
