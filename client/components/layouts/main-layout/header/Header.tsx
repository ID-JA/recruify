import { HeaderDesktop, HeaderProps } from './HeaderDesktop'

export default function Header({
  navbarOpened,
  toggleNavbar,
  user,
}: HeaderProps) {
  return (
    <HeaderDesktop
      navbarOpened={navbarOpened}
      toggleNavbar={toggleNavbar}
      user={user}
    />
  )
}
