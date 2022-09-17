import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import useStyles from './NavBarMainLink.styles'

interface NavBarMainLinkProps {
  className?: string
  to: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick(): void
}

export default function NavBarMainLink({
  children,
  className,
  icon,
  to,
  onClick,
}: NavBarMainLinkProps) {
  const {classes, cx} = useStyles()
  const router = useRouter()

  return (
    <Link href={to}>
      <a
        className={cx(classes.mainLink, className, {
          [classes.active]: router.pathname === to,
        })}
        onClick={onClick}
      >
        {icon && icon}
        <div className={classes.body}>{children}</div>
      </a>
    </Link>
  )
}
