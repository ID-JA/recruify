import React from 'react'
import {HeaderDesktop} from './HeaderDesktop'

interface HeaderProps {
  navbarOpened: boolean
  toggleNavbar(): void
}

export default function Header({navbarOpened, toggleNavbar}: HeaderProps) {
  return (
    <>
      <HeaderDesktop navbarOpened={navbarOpened} toggleNavbar={toggleNavbar} />
    </>
  )
}
