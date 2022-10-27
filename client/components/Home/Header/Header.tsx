import { useCurrentUser } from '@/hooks/use-current-user'
import { Button, Container } from '@mantine/core'

import Link from 'next/link'

import Logo from '../../logo/Logo'
import useStyles from './Header.styles'

function Header() {
  const { classes } = useStyles()
  const { data } = useCurrentUser()

  return (
    <header className={classes.root}>
      <Container
        size="xl"
        px="md"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {data?.success ? (
            <Link href="/dashboard" passHref>
              <Button component="a" radius="md">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/employer-signup" passHref>
              <Button component="a" radius="md">
                Become a recruiter
              </Button>
            </Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
