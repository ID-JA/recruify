import {
  Box,
  createStyles,
  MantineColor,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { ReactNode } from 'react'

const useStyles = createStyles((theme, { color }: { color?: MantineColor }) => {
  const verticalPadding = theme.spacing.sm / 2
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      // borderRadius: theme.radius.xs,
      paddingTop: verticalPadding,
      paddingBottom: verticalPadding,
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
      color: color && theme.colors[color][6],
      transition: 'background .15s ease',
      '&[disabled]': {
        cursor: 'not-allowed',
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[5],
      },
      '&:hover:not([disabled])': {
        background: theme.fn.rgba(
          color
            ? theme.colors[color][6]
            : theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[4],
          color ? (theme.colorScheme === 'dark' ? 0.15 : 0.08) : 0.25
        ),
      },
      '&:active:not([disabled])': {
        background: theme.fn.rgba(
          color
            ? theme.colors[color][6]
            : theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[4],
          color ? (theme.colorScheme === 'dark' ? 0.3 : 0.2) : 0.5
        ),
      },
    },
    icon: {
      fontSize: 0,
      marginRight: theme.spacing.xs,
    },
    title: {
      whiteSpace: 'nowrap',
    },
  }
})

type DataGridRowMenuItem = {
  title: ReactNode
  icon?: ReactNode
  color?: MantineColor
  disabled?: boolean
  onClick: () => void
}

function DataGridRowMenuItem({
  onClick,
  title,
  disabled,
  color,
  icon,
}: DataGridRowMenuItem) {
  const { classes } = useStyles({ color })

  return (
    <UnstyledButton
      className={classes.root}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Box className={classes.icon}>{icon}</Box>}
      <Text className={classes.title} size="sm">
        {title}
      </Text>
    </UnstyledButton>
  )
}

export default DataGridRowMenuItem
