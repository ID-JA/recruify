import { createStyles } from '@mantine/core'

export default createStyles(
  (
    theme,
    {
      withBoarder,
      noEllipsis,
    }: {
      withBoarder?: boolean
      noEllipsis?: boolean
    }
  ) => {
    return {
      wrapper: {
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '4px',
        height: '100%',
        ...(withBoarder && {
          border: '1px solid rgb(222, 226, 230)',
        }),
      },
      table: {
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
      tbody: {
        minHeight: '160px',
      },
      tr: {},
      th: { position: 'relative' },
      td: {},
      headerCell: {
        display: 'flex',
        width: 'inherit',
        height: 'inherit',
        justifyContent: 'space-between',
      },
      headerCellContent: {
        ...(!noEllipsis && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
      },
      dataCell: {
        display: 'flex',
        width: 'inherit',
        justifyContent: 'space-between',
      },
      dataCellContent: {
        ...(!noEllipsis && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
      },
      pagination: {
        ...(withBoarder && {
          borderTop: '1px solid rgb(222, 226, 230)',
        }),
      },
    }
  }
)
