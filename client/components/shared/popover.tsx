import { Menu } from '@mantine/core'
import { ReactNode } from 'react'

function Popover({
  children,
  content,
  openPopover,
  setOpenPopover,
  width = 190,
}: {
  children: ReactNode
  content: ReactNode | string
  openPopover: boolean
  setOpenPopover: (value: boolean) => void
  width?: number
}) {
  return (
    <Menu
      width={width}
      opened={openPopover}
      onClose={() => setOpenPopover(false)}
    >
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>{content}</Menu.Dropdown>
    </Menu>
  )
}

export default Popover
