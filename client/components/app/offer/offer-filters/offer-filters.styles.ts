import { createStyles } from '@mantine/core'

export const useStyles = createStyles(
  (theme, { opened }: { opened: boolean }) => ({
    item: {
      color: 'rgb(107,114,128)',
      fontWeight: 600,
    },
    target: {
      width: '190px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 12px',
      boxShadow: '0 0 0 1px rgb(229,231,235)',
      backgroundColor: '#fff',
      outline: 'none',
      borderRadius: '4px',
      color: 'rgb(107,114,128)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      cursor: 'pointer',
      transition: 'all 100ms ease-out',
      border: 'none',
      ':hover': {
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      },
      ':active': {
        transform: 'scale(0.98)',
      },
    },
    targetLeft: {
      display: 'flex',
      alignItems: 'center',
      p: {
        marginLeft: theme.spacing.xs,
      },
    },
    chevron: {
      transform: `rotate(${opened ? 180 : 0}deg)`,
    },
  })
)
