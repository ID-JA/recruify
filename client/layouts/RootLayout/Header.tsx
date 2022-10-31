import Logo from '@/components/logo/Logo'
import {
  Avatar,
  Burger,
  Button,
  Container,
  createStyles,
  Menu,
} from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Logout, Settings } from 'tabler-icons-react'
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT } from './RootLayout.styles'

const useStyles = createStyles((theme, { p }: { p: string }) => ({
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
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    ...(p !== '/' && {
      [`@media (min-width: ${NAVBAR_BREAKPOINT}px)`]: {
        margin: 0,
        maxWidth: 'unset',
      },
    }),
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any
}

function MainHeader({ navbarOpened, toggleNavbar, user }: HeaderProps) {
  const router = useRouter()
  const { classes } = useStyles({ p: router.pathname })

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
          <Link href="/">
            <div>
              <Logo height={30} width={135} />
            </div>
          </Link>
        </div>

        {user ? (
          <UserAvatar key="user-avatar" />
        ) : (
          <Button key="get-started-btn">Become recruiter</Button>
        )}
      </Container>
    </header>
  )
}

export default MainHeader

function UserAvatar() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          sx={{
            cursor: 'pointer',
          }}
          radius="xl"
          color="blue"
          mr="md"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<Logout size={14} />}>Sign out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
