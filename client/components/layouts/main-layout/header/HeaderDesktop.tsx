import Logo from '@/components/logo/Logo'
import { Avatar, Badge, Burger, Menu } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Logout, Settings } from 'tabler-icons-react'
import useStyles from './HeaderDesktop.styles'

export interface HeaderProps {
  navbarOpened: boolean
  toggleNavbar(): void
  user?: {
    success: boolean
  }
}

export function HeaderDesktop({
  navbarOpened,
  toggleNavbar,
  user,
}: HeaderProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { classes } = useStyles()

  const onSignOut = useCallback(() => {
    localStorage.removeItem('token')
    queryClient.removeQueries()
    router.replace('/signin')
  }, [queryClient, router])

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
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar radius="xl" color="blue" mr="md" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
          <Menu.Divider />
          <Menu.Item icon={<Logout size={14} />} onClick={onSignOut}>
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </header>
  )
}
