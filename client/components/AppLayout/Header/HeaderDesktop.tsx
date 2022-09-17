import {Avatar, Box, Burger} from '@mantine/core'
import useStyles from './HeaderDesktop.styles'

interface HeaderProps {
  navbarOpened: boolean
  toggleNavbar(): void
}

export function HeaderDesktop({navbarOpened, toggleNavbar}: HeaderProps) {
  const {classes} = useStyles()
  return (
    <div className={classes.header}>
      <Burger
        className={classes.burger}
        opened={navbarOpened}
        size="sm"
        onClick={toggleNavbar}
        aria-label="Toggle navbar"
      />
      <div className={classes.mainSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.logo}>FastRecruiter</div>
        </div>
      </div>
      <Box pr="md">
        <Avatar radius="xl" color="blue" />
      </Box>
    </div>
  )
}
