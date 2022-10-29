import Link from 'next/link'
import { useRouter } from 'next/router'
import useStyles from './SettingsLayout.styles'

interface SettingLinkProps {
  className?: string
  to: string
  children: React.ReactNode
}

function SettingLink({ children, to, className }: SettingLinkProps) {
  const { classes, cx } = useStyles()
  const router = useRouter()
  return (
    <Link href={to}>
      <a
        className={cx(classes.link, className, {
          [classes.active]: router.pathname === to,
        })}
      >
        <div>{children}</div>
      </a>
    </Link>
  )
}

export default SettingLink
