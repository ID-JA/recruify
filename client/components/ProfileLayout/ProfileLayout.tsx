import React from 'react'
import useStyles from './ProfileLayout.styles'
import ProfileNavBar from './ProfileNabBar/ProfileNavBar'

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

export default ProfileLayout
