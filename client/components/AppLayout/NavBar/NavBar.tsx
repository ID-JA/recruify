import { ScrollArea } from '@mantine/core'
import mainLinks from './main-links'
import NavBarMainLink from './NavBarMainLink/NavBarMainLink'

import { createStyles, MantineTheme } from '@mantine/core'

export const NAVBAR_WIDTH = 260
export const NAVBAR_BREAKPOINT = 760

const useStyles = createStyles((theme: MantineTheme) => ({
  navbar: {
    boxSizing: 'border-box',
    height: '100vh',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    position: 'fixed',
    zIndex: 5,
    top: 0,
    bottom: 0,
    left: 0,
    width: NAVBAR_WIDTH,

    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      display: 'none',
    },
  },

  opened: {
    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      display: 'block',
      width: '100%',
      right: 0,
    },
  },

  body: {
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.xl * 2,
    paddingLeft: theme.spacing.md,
    paddingTop: 60 + theme.spacing.md,

    [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
      paddingBottom: 120,
    },
  },
}))

interface NavBarProps {
  opened: boolean
  onClose(): void
}

export default function NavBar({ onClose, opened }: NavBarProps) {
  const { classes, cx } = useStyles()

  const main = mainLinks.map((item) => (
    <NavBarMainLink
      key={item.to}
      to={item.to}
      icon={<item.icon size={24} strokeWidth={1.5} />}
      onClick={onClose}
    >
      {item.label}
    </NavBarMainLink>
  ))
  return (
    <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
      <ScrollArea style={{ height: '100vh' }} type="scroll">
        <div className={classes.body}>{main}</div>
      </ScrollArea>
    </nav>
  )
}
