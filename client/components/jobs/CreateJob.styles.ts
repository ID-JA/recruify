import { createStyles } from '@mantine/core'

export default createStyles(() => ({
  wrapper: {
    width: '100%',
    maxWidth: '850px',
    marginTop: '5px',
  },
  fieldWrapper: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    display: 'inline-block',
    color: '#212529',
  },
  mbLabel: {
    marginBottom: 10,
  },
  description: {
    fontSize: '12px',
    marginBottom: '10px',
    color: '#667085',
  },
  invalidMessage: {
    textDecoration: 'none',
    wordBreak: 'break-word',
    color: '#fa5252',
    fontSize: '12px',
    lineHeight: '1.2',
    display: 'block',
  },
  invalid: {
    borderColor: '#fa5252',
  },
  field: {
    marginBottom: 20,
    '& label': {
      marginBottom: 10,
    },
    '&:has(.mantine-TextInput-description)': {
      '& label': {
        marginBottom: 0,
      },
      '& .mantine-TextInput-description': {
        marginBottom: 10,
        color: '#667085',
      },
    },
    '&:has(.mantine-Textarea-description)': {
      '& label': {
        marginBottom: 0,
      },
      '& .mantine-Textarea-description': {
        color: '#667085',
        marginBottom: 10,
      },
    },
  },
}))
