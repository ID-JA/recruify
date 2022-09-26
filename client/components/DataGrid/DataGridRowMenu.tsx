import { createStyles, Paper, useMantineTheme } from '@mantine/core'
import {
  useClickOutside,
  useElementSize,
  useMergedRef,
  useWindowEvent,
} from '@mantine/hooks'
import { ReactNode } from 'react'

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    overflow: 'hidden',
    transition: 'all .15s ease',
  },
}))

type DataTableRowMenuProps = {
  zIndex: number | undefined
  top: number
  left: number
  children: ReactNode
  onDestroy: () => void
}

function DataGridRowMenu({
  children,
  zIndex = 3,
  top: desiredTop,
  left: desiredLeft,
  onDestroy,
}: DataTableRowMenuProps) {
  useWindowEvent('resize', onDestroy)
  useWindowEvent('scroll', onDestroy)
  const clickOutsideRef = useClickOutside<HTMLDivElement>(onDestroy)
  const { ref: sizeRef, width, height } = useElementSize()
  const ref = useMergedRef(clickOutsideRef, sizeRef)

  const {
    spacing: { xs: xsSpacing },
  } = useMantineTheme()

  const { innerWidth: windowWidth, innerHeight: windowHeight } = window
  const top =
    desiredTop + height + xsSpacing > windowHeight
      ? windowHeight - height - xsSpacing
      : desiredTop
  const left =
    desiredLeft + width + xsSpacing > windowWidth
      ? windowWidth - width - xsSpacing
      : desiredLeft

  const { classes } = useStyles()

  return (
    <Paper ref={ref} className={classes.root} sx={{ top, left, zIndex }}>
      {children}
    </Paper>
  )
}
export default DataGridRowMenu
