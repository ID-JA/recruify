import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useStyles from './ProfileNavBarLink.styles'

interface ProfileNavBarLinkProps {
  className?: string
  to: string
  children: React.ReactNode
  disabled: boolean
}

function ProfileNavBarLink({
  children,
  to,
  className,
  disabled,
}: ProfileNavBarLinkProps) {
  const { classes, cx } = useStyles()
  const router = useRouter()
  return (
    <Link href={to}>
      <a
        className={cx(classes.subLink, className, {
          [classes.active]: router.pathname === to,
          [classes.disabled]: disabled,
        })}
      >
        <div className={classes.body}>{children}</div>
      </a>
    </Link>
  )
}

export default ProfileNavBarLink
