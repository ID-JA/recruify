import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useStyles from './NavbarMainLink.styles'

interface NavBarMainLinkProps {
  className?: string
  to: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick?(): void
  disabled?: boolean
}

export default function NavBarMainLink({
  children,
  className,
  icon,
  to,
  onClick,
  disabled,
}: NavBarMainLinkProps) {
  const { classes, cx } = useStyles()
  const router = useRouter()
  return (
    <Link href={to}>
      <a
        className={cx(classes.mainLink, className, {
          [classes.active]:
            router.pathname.startsWith(to) &&
            router.pathname.split('/').includes('create')
              ? router.pathname === to
              : router.pathname.startsWith(to),
          [classes.disabled]: disabled,
        })}
        onClick={onClick}
      >
        {Boolean(icon) && icon}
        <div className={classes.body}>{children}</div>
      </a>
    </Link>
  )
}
