import {
  Container,
  Paper,
  Title,
  Box,
  TextInput,
  Text,
  createStyles,
  Button,
} from '@mantine/core'
import {useForm} from 'react-hook-form'
import Link from 'next/link'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const useStyles = createStyles(theme => ({
  paper: {
    margin: 'auto',
    maxWidth: '512px',
    boxShadow: '0 -1px 1px rgba(0,0,0,0.05),0 3px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  link: {
    marginTop: '18px',
    color: theme.colors.blue[6],
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,
    textAlign: 'center',
    display: 'block',
  },
}))

const defaultValues = {
  password: '',
}

const validationSchema = yup.object().shape({
  password: yup.string().required(),
})

function ResetPassword() {
  const {classes} = useStyles()
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const onSubmit = (values: typeof defaultValues) => {
    console.log({...values})
  }
  return (
    <>
      <Container mt="30px">
        <Paper className={classes.paper}>
          <Title align="center" weight="normal" mb="24px">
            Create new password
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text color="gray.6" size="sm" mb="sm">
              your new password must be different from previous used password
            </Text>
            <TextInput
              label="Email address"
              mb="md"
              error={errors.password && errors.password.message}
              {...register('password')}
            />

            <Button fullWidth mt="20px" type="submit">
              Send
            </Button>
            <Link href="/signup" passHref>
              <a className={classes.link}>Back to sign in</a>
            </Link>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default ResetPassword
