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
        // overflow: 'hidden',
        borderRadius: '4px',
        height: '100%',
        ...(withBoarder && {
          border: '1px solid rgb(222, 226, 230)',
        }),
      },
      table: {
        borderCollapse: 'separate',
        borderSpacing: 0,
        color: '#667085',
        fontWeight: 600,
      },
      tbody: {
        minHeight: '160px',
      },
      thead: {
        background: '#FCFCFD',
        paddingTop: 12,
        paddingBottom: 12,
      },
      th: {
        position: 'relative',
        paddingTop: '12px !important',
        paddingBottom: '12px !important',
      },

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
        padding: '16px 24px',
        ...(withBoarder && {
          borderTop: '1px solid rgb(222, 226, 230)',
        }),
      },
      rowSelected: {
        backgroundColor: `${theme.fn.lighten(
          theme.colors.blue[6],
          0.85
        )} !important`,
      },
    }
  }
)
