import { Avatar, Badge, Burger } from '@mantine/core'
import Logo from '~/components/logo/Logo'
import useStyles from './HeaderDesktop.styles'

interface HeaderProps {
  navbarOpened: boolean
  toggleNavbar(): void
}

export function HeaderDesktop({ navbarOpened, toggleNavbar }: HeaderProps) {
  const { classes } = useStyles()

  return (
    <header className={classes.header}>
      <Burger
        className={classes.burger}
        opened={navbarOpened}
        size="sm"
        onClick={toggleNavbar}
        aria-label="Toggle navbar"
      />
      <div className={classes.mainSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.logo}>
            <div>
              <Logo height={30} width={135} />
            </div>
            <Badge color="blue" ml="sm">
              beta
            </Badge>
          </div>
        </div>
      </div>

      <Avatar radius="xl" color="blue" mr="md" />
    </header>
  )
}
