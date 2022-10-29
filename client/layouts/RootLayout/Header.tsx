import Logo from '@/components/logo/Logo'
import { Avatar, Burger, Container, createStyles, Menu } from '@mantine/core'
import { Logout, Settings } from 'tabler-icons-react'
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT } from './RootLayout.styles'

const useStyles = createStyles((theme) => ({
  header: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
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
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },

  logo: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    height: HEADER_HEIGHT,
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > span': {
      fontWeight: 700,
      marginBottom: 5,
      marginRight: 5,
    },
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'all',
  },

  burger: {
    [theme.fn.largerThan(NAVBAR_BREAKPOINT)]: {
      display: 'none',
    },
  },
}))

type HeaderProps = {
  navbarOpened: boolean
  toggleNavbar(): void
}

function MainHeader({ navbarOpened, toggleNavbar }: HeaderProps) {
  const { classes } = useStyles()

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Burger
          className={classes.burger}
          opened={navbarOpened}
          onClick={toggleNavbar}
          aria-label="Toggle navbar"
        />
        <div className={classes.logoWrapper}>
          <Logo height={30} width={135} />
        </div>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar radius="xl" color="blue" mr="md" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<Logout size={14} />}>Sign out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </header>
  )
}

export default MainHeader
