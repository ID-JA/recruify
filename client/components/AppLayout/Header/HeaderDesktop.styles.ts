import { createStyles } from '@mantine/core'
import { NAVBAR_BREAKPOINT } from '../NavBar/NavBar'

export const HEADER_HEIGHT = 60

export default createStyles((theme) => ({
  header: {
    top: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    width: '100%',
    height: HEADER_HEIGHT,
    zIndex: 6,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
    // paddingLeft: '5px',
    // paddingRight: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inner: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  logo: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    height: HEADER_HEIGHT,
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center',
  },

  mainSection: {
    display: 'flex',
    alignItems: 'center',
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'all',
  },

  burger: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    [theme.fn.largerThan(NAVBAR_BREAKPOINT)]: {
      display: 'none',
    },
  },
}))
