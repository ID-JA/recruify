import { useState } from 'react'
import { AppLayoutProps } from './AppLayout'
import useStyles from './AppLayoutInner.styles'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'

function AppLayout({ children }: AppLayoutProps) {
  const { classes, cx } = useStyles()
  const [navbarOpened, setNavBarState] = useState(false)

  return (
    <div className={cx(classes.withNavbar, classes.withoutHeader)}>
      <Header
        navbarOpened={navbarOpened}
        toggleNavbar={() => setNavBarState((o) => !o)}
      />
      <NavBar opened={navbarOpened} onClose={() => setNavBarState(false)} />
      <main className={classes.main}>
        <div className={classes.content}>
          <div className={classes.wrapper}>{children}</div>
        </div>
      </main>
    </div>
  )
}

export default AppLayout
