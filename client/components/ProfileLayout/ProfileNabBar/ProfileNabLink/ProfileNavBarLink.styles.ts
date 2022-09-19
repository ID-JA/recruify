import {createStyles} from '@mantine/core'

export default createStyles(theme => ({
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
    padding: ' 5px 15px',
    paddingBottom: '15px',
    borderRadius: '4px',
    userSelect: 'none',
    position: 'relative',
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

  body: {
    // marginLeft: theme.spacing.sm,
  },
}))
