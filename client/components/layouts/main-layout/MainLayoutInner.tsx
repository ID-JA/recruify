import { useMediaQuery } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  shouldExcludeHeader,
  shouldExcludeNavbar,
} from '~/utils/exclude-layout'

import { AppLayoutProps } from './MainLayout'
import useStyles from './MainLayoutInner.styles'
import Header from './header/Header'
import NavBar, { NAVBAR_BREAKPOINT } from './navbar/NavBar'

function MainLayoutInner({ children }: AppLayoutProps) {
  const [navbarOpened, setNavBarState] = useState(false)
  const router = useRouter()

  const navbarCollapsed = useMediaQuery(`(max-width: ${NAVBAR_BREAKPOINT}px)`)
  const shouldRenderHeader = !shouldExcludeHeader(router.pathname)
  const shouldRenderNavbar =
    !shouldExcludeNavbar(router.pathname) || navbarCollapsed

  const { classes, cx } = useStyles({ shouldRenderNavbar })

  return (
    <div
      className={cx({
        [classes.withNavbar]: shouldRenderNavbar,
        [classes.withoutHeader]: shouldExcludeHeader,
      })}
    >
      {shouldRenderHeader && (
        <Header
          navbarOpened={navbarOpened}
          toggleNavbar={() => setNavBarState((o) => !o)}
        />
      )}
      {shouldRenderNavbar && (
        <NavBar opened={navbarOpened} onClose={() => setNavBarState(false)} />
      )}
      <main className={classes.main}>
        {/* <div className={classes.content}> */}
        <div className={classes.wrapper}>{children}</div>
        {/* </div> */}
      </main>
    </div>
  )
}

export { MainLayoutInner }
