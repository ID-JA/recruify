import Link from 'next/link'
import { useRouter } from 'next/router'
import useStyles from './Navbar.styles'

type NavBarMainLinkProps = {
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
          [classes.activeLink]: router.pathname.split('/').includes('my-jobs')
            ? router.pathname == to
            : router.pathname.includes(to.split('/')[1]),
          [classes.disabledLink]: disabled,
        })}
        onClick={onClick}
      >
        {Boolean(icon) && icon}
        <div className={classes.bodyLink}>{children}</div>
      </a>
    </Link>
  )
}
