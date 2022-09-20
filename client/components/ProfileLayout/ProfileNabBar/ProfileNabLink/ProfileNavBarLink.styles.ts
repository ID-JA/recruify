import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  subLink: {
    ...theme.fn.focusStyles(),
    WebkitTapHighlightColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#667085', //'#9CA4AD',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '24px',
    padding: '10px',
    borderRadius: '4px',
    userSelect: 'none',
    position: 'relative',
    '&:hover': {
      color: theme.colors.blue,
    },
  },

  active: {
    color: theme.colors.blue,
    // backgroundColor: '#EBEDF3 ',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '2px',
      width: '100%',
      backgroundColor: theme.colors.blue,
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.4,
  },

  body: {
    // marginLeft: theme.spacing.sm,
  },
}))
