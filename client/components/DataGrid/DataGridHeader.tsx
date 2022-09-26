import { createStyles } from '@mantine/core'
import { HeaderGroup } from '@tanstack/react-table'
import DataGridHeaderCell from './DataGridHeaderCell'

const useStyles = createStyles((theme) => {
  return {
    root: {
      zIndex: 2,
      position: 'sticky',
      top: 0,
      background:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
  }
})

type DataGridHeader<T> = {
  headerGroups: HeaderGroup<T>[]
}

function DataGridHeader<T>({ headerGroups }: DataGridHeader<T>) {
  const { classes, cx } = useStyles()

  return (
    <thead className={cx(classes.root)}>
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
