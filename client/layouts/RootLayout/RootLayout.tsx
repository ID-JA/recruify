import {
  shouldExcludeHeader,
  shouldExcludeNavbar,
} from '@/utils/exclude-layout'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import MainHeader from './Header'
import MainNavbar from './Navbar/Navbar'
import useStyles from './RootLayout.styles'

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpened, setNavBarState] = useState(false)
  const router = useRouter()

  const shouldRenderHeader = !shouldExcludeHeader(router.pathname)
  const shouldRenderNavbar = !shouldExcludeNavbar(router.pathname)
  const { classes, cx } = useStyles({ shouldRenderNavbar })

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
  )
}
