import { createStyles } from '@mantine/core'
import { NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from '../RootLayout.styles'

export default createStyles((theme) => ({
  navbar: {
    boxSizing: 'border-box',
    height: '100vh',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    position: 'fixed',
    zIndex: 5,
    top: 0,
    bottom: 0,
    left: 0,
    width: NAVBAR_WIDTH,

    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      display: 'none',
    },
  },

  opened: {
    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      display: 'block',
      width: '100%',
      right: 0,
    },
  },

  body: {
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.xl * 2,
    paddingLeft: theme.spacing.md,
    paddingTop: 60 + theme.spacing.md,

    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      paddingBottom: 120,
    },
  },

  ///////////////////////////
  mainLink: {
    ...theme.fn.focusStyles(),
    WebkitTapHighlightColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#344054', //'hsl(212,20%,16%)',
    // fontWeight: 700,
    fontSize: '15px',
    lineHeight: '24px',
    padding: 12,
    marginLeft: -5,
    marginRight: -5,
    borderRadius: theme.radius.sm,
    userSelect: 'none',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif',
  },

  activeLink: {
    // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colors.blue,
    fontWeight: 700,
    // backgroundColor: theme.colors.blue[2],
  },

  bodyLink: {
    marginLeft: theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabledLink: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
    pointerEvents: 'none',
  },
}))
