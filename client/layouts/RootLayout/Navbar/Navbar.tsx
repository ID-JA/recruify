import { Badge } from '@mantine/core'
import mainLinksArr from './main-links'
import NavBarMainLink from './MainLink'
import useStyles from './Navbar.styles'

interface NavBarProps {
  opened: boolean
  onClose(): void
}

export default function NavBar({ onClose, opened }: NavBarProps) {
  const { classes, cx } = useStyles()

  const main = mainLinksArr.map((item) => (
    <NavBarMainLink
      key={item.to}
      to={item.to}
      icon={<item.icon size={28} strokeWidth={2} />}
      onClick={onClose}
      disabled={!item.released}
    >
      <span>{item.label}</span>
      {!item.released && (
        <Badge color="yellow" size="sm" style={{ marginLeft: 10 }}>
          coming soon
        </Badge>
      )}
    </NavBarMainLink>
  ))
  return (
    <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
      <div className={classes.body}>{main}</div>
    </nav>
  )
}
