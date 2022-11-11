import useGetProfile from '@/hooks/use-get-profile'
import useAuthStore, { User } from '@/store'
import {
  shouldExcludeHeader,
  shouldExcludeNavbar,
} from '@/utils/exclude-layout'
import { Global } from '@mantine/core'

import { useRouter } from 'next/router'
import React, { useState } from 'react'

import MainHeader from './Header'
import MainNavbar from './Navbar/Navbar'
import useStyles from './RootLayout.styles'

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpened, setNavBarState] = useState(false)
  const router = useRouter()
  const { logout, setUser, isLoggedIn } = useAuthStore((state) => state)

  const shouldRenderHeader = !shouldExcludeHeader(router.pathname)
  const shouldRenderNavbar = !shouldExcludeNavbar(router.pathname)
  const { classes, cx } = useStyles({ shouldRenderNavbar })

  useGetProfile({
    onSuccess: (res: User) => {
      setUser(res)
    },
    onError: () => {
      logout()
      console.log('logout....')

      if (router.pathname !== '/') {
        router.replace('/signin')
      }
    },
  })

  // TODO: if user is logged in, and tried access to home page redirect to dashboard

  if (router.pathname !== '/' && isLoggedIn === false) {
    return <div>...</div>
  }

  return (
    <>
      <MyGlobalStyles />
      <div
        className={cx({
          [classes.withNavbar]: shouldRenderNavbar,
          [classes.withoutHeader]: shouldRenderHeader,
        })}
      >
        {shouldRenderHeader ? (
          <MainHeader
            key="root-header"
            navbarOpened={navbarOpened}
            toggleNavbar={() => setNavBarState(!navbarOpened)}
          />
        ) : null}
        {shouldRenderNavbar ? (
          <MainNavbar
            key="root-navbar"
            opened={navbarOpened}
            onClose={() => setNavBarState(false)}
          />
        ) : null}
        <main className={classes.main}>{children}</main>
      </div>
    </>
  )
}

function MyGlobalStyles() {
  return (
    <Global
      styles={() => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
      })}
    />
  )
}
