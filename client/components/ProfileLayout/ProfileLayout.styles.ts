import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  wrapper: {
    // display: 'flex',
    // padding: '0px 25px',
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      // padding: '0px 10px',
    },
  },
  content: {
    // flexGrow: 1,
    // width: `calc(100% - ${PROFILE_SUBNAV_WIDTH}px)`,
    // padding: '0 16px',
    paddingTop: theme.spacing.lg * 2,
  },
}))
