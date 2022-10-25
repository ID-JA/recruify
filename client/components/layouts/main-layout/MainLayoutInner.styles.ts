import { createStyles } from '@mantine/core'
import { HEADER_HEIGHT } from './header/HeaderDesktop.styles'
import { NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from './navbar/NavBar'

export default createStyles(
  (theme, { shouldRenderNavbar }: { shouldRenderNavbar: boolean }) => ({
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
      minHeight: '100vh',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],

      flex: 1,
      ...(shouldRenderNavbar && {
        paddingTop: HEADER_HEIGHT - theme.spacing.xl - 2,
      }),

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
    },
    wrapper: {
      paddingTop: 38,
      paddingBottom: theme.spacing.xl * 1.5,
      paddingLeft: theme.spacing.lg, // * 2
      paddingRight: theme.spacing.lg, // * 2
    },
  })
)
