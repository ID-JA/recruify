import useGetProfile from '@/hooks/use-get-profile'
import {
  shouldExcludeHeader,
  shouldExcludeNavbar,
} from '@/utils/exclude-layout'

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import MainHeader from './Header'
import MainNavbar from './Navbar/Navbar'
import useStyles from './RootLayout.styles'

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpened, setNavBarState] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  const shouldRenderHeader = !shouldExcludeHeader(router.pathname)
  const shouldRenderNavbar = !shouldExcludeNavbar(router.pathname)
  const { classes, cx } = useStyles({ shouldRenderNavbar })

  const { error, data } = useGetProfile(token)

  useEffect(() => {
    if (window === undefined) return
    const t = window.localStorage.getItem('token')
    if (t !== null) {
      console.log('setting token...')
      setToken(t)
      return
    }
    if (error) {
      console.log(error)
    }
  }, [error, data])

  if (error && router.pathname !== '/') {
    return <div></div>
  }
  return (
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
          user={data}
        />
      ) : null}
      {shouldRenderNavbar ? (
        <MainNavbar
          key="root-navbar"
          opened={navbarOpened}
          onClose={() => setNavBarState(false)}
        />
      ) : null}
      <main className={classes.main}>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        {children}
      </main>
    </div>
  )
}
