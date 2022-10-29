import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  subNav: {
    display: 'flex',
  },

  link: {
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
    '&::after': {
      content: "''",
      position: 'absolute',
      left: 0,
      bottom: '-2px',
      height: '2.5px',
      zIndex: 1001,
      width: '100%',
      backgroundColor: theme.colors.blue,
    },
  },
  content: {
    paddingTop: theme.spacing.lg * 2,
  },
}))
