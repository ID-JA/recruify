import { createStyles } from '@mantine/core'
import { HEADER_HEIGHT } from './Header/HeaderDesktop.styles'
import { NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from './NavBar/NavBar'

export default createStyles((theme) => ({
  '@global': {
    '#nprogress': {
      zIndex: 100000,
    },
  },

  withNavbar: {
    paddingLeft: NAVBAR_WIDTH,

    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      paddingLeft: 0,
    },
  },

  withoutHeader: {
    '& $main': {
      paddingTop: 0,
    },
  },

  main: {
    scrollMarginTop: HEADER_HEIGHT,
    flex: 1,
    // aligns page top most heading with navigation and table of contents
    paddingTop: HEADER_HEIGHT - theme.spacing.xl - 2,

    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  content: {
    minHeight: 'calc(100vh - 280px)',
    paddingLeft: theme.spacing.lg, // * 2
    paddingRight: theme.spacing.lg, // * 2
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    // [`@media (max-width: ${1080}px)`]: {
    //   paddingLeft: theme.spacing.xl,
    //   paddingRight: theme.spacing.xl,
    // },
  },
  wrapper: {
    paddingTop: 50,
    // maxWidth: 1082,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    paddingBottom: theme.spacing.xl * 1.5,
  },
}))
