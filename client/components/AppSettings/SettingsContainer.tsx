import {createStyles} from '@mantine/core'

interface SettingsContainerProp {
  children: React.ReactNode
  title?: string
  description?: string
}

const useStyles = createStyles(theme => ({
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
    minWidth: '450px',
  },
  right: {
    width: '100%',
    minWidth: 'calc(100% - 450px)',
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

const SettingsContainer = ({
  children,
  title,
  description,
}: SettingsContainerProp) => {
  const {classes, cx} = useStyles()
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

export default SettingsContainer
