import React from 'react'
import useStyles from './ProfileLayout.styles'
import ProfileNavBar from './ProfileNavbar/ProfileNavbar'

interface ProfileLayoutProps {
  children: React.ReactNode
}

function ProfileLayout({ children }: ProfileLayoutProps) {
  const { classes } = useStyles()
  return (
    <>
      <ProfileNavBar />
      <section className={classes.content}>{children}</section>
    </>
  )
}

export { ProfileLayout }
