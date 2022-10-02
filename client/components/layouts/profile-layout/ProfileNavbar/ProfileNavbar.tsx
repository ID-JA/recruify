import { Divider } from '@mantine/core'
import ProfileNavBarLink from './ProfileNavLink/ProfileNavLink'
import useStyles from './ProfileNavbar.styles'
import userLinks from './user-links'

function ProfileNavBar() {
  const { classes } = useStyles()

  const main = userLinks.map((link) => {
    return (
      <ProfileNavBarLink
        to={link.to}
        key={`${link.to}-${link.label}`}
        disabled={link.disabled}
      >
        {link.label}
      </ProfileNavBarLink>
    )
  })

  return (
    <>
      <div className={classes.subNav}>
        <div className={classes.body}>{main}</div>
      </div>
      <Divider />
    </>
  )
}

export default ProfileNavBar
