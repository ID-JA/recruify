import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    height: 64,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    padding: theme.spacing.sm,
  },
  logo: {
    height: 40,
    width: 180,
  },
}))