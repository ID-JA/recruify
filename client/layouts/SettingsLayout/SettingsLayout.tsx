import { Divider } from '@mantine/core'
import React from 'react'
import SettingLink from './SettingLink'
import settingsLinks from './settings-links'
import useStyles from './SettingsLayout.styles'

function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles()

  const links = settingsLinks.map((link) => {
    return (
      <SettingLink to={link.to} key={`${link.to}-${link.label}`}>
        {link.label}
      </SettingLink>
    )
  })
  return (
    <>
      <nav className={classes.subNav}>{links}</nav>
      <Divider />
      <section className={classes.content}>{children}</section>
    </>
  )
}

export default SettingsLayout
