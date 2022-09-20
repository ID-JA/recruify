import {createStyles, MantineTheme} from '@mantine/core'

export default createStyles((theme: MantineTheme) => ({
  mainLink: {
    ...theme.fn.focusStyles(),
    WebkitTapHighlightColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#344054', //'hsl(212,20%,16%)',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '24px',
    padding: 12,
    marginLeft: -5,
    marginRight: -5,
    borderRadius: theme.radius.sm,
    userSelect: 'none',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif',
  },

  active: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  body: {
    marginLeft: theme.spacing.sm,
  },
}))
