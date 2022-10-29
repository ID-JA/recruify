import { createStyles } from '@mantine/core'

export const NAVBAR_WIDTH = 260
export const NAVBAR_BREAKPOINT = 760
export const HEADER_HEIGHT = 60

export default createStyles(
  (theme, { shouldRenderNavbar }: { shouldRenderNavbar: boolean }) => ({
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
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,

      flex: 1,
      ...(shouldRenderNavbar && {
        paddingTop: HEADER_HEIGHT - theme.spacing.xl - 2,
      }),

      [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.lg,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
      paddingTop: HEADER_HEIGHT + theme.spacing.lg,
      paddingBottom: theme.spacing.xl * 1.5,
    },
  })
)
