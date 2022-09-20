import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  createStyles,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const useStyles = createStyles((theme) => ({
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

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email address is required'),
})

const defaultValues = {
  email: '',
}

function ForgetPassword() {
  const { classes } = useStyles()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const onSubmit = (value: typeof defaultValues) => {
    return new Promise<void>((resolve) => {
      console.log(`Sending Email to ${value.email}`)
      setTimeout(() => {
        resolve()
        reset()
      }, 2000)
    })
  }
  return (
    <>
      <Container mt="30px">
        <Paper className={classes.paper}>
          <Title align="center" weight="normal" mb="24px">
            Forget Password
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text color="gray.6" size="sm" mb="24px">
              Please provide email address associated with this account and
              w&apos;ell send you a link to reset your password
            </Text>
            <TextInput
              label="Email address"
              error={errors.email && errors.email.message}
              {...register('email')}
            />
            <Button loading={isSubmitting} fullWidth mt="20px" type="submit">
              {!isSubmitting ? 'Send' : 'Sending'}
            </Button>
            <Link href="/signin" passHref>
              <a className={classes.link}>Back to sign in</a>
            </Link>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default ForgetPassword
