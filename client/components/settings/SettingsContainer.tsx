import { createStyles } from '@mantine/core'

interface SettingsSectionProp {
  children: React.ReactNode
  title?: string
  description?: string
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      flexDirection: 'column',
    },
  },
  left: {
    width: '100%',
    maxWidth: '450px',
  },
  right: {
    width: '100%',
  },
  title: {
    color: '#344054',
    margin: '0 0 12px 0',
    fontWeight: 600,
    fontSize: 18,
  },
  description: {
    margin: 0,
    color: '#667085',
    fontSize: 14,
  },
}))

const SettingSection = ({
  children,
  title,
  description,
}: SettingsSectionProp) => {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <h5 className={classes.title}>{title}</h5>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.right}>{children}</div>
    </div>
  )
}

export { SettingSection }