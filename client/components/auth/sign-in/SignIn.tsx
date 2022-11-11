import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  SegmentedControlProps,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BrandGoogle } from 'tabler-icons-react'
import * as yup from 'yup'

import { authenticateUser } from '@/services/auth-service'
import useAuthStore from '@/store'
import { NextPageWithLayout } from '@/types'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const useStyles = createStyles((theme) => ({
  paper: {
    margin: 'auto',
    maxWidth: '512px',
    boxShadow: '0 -1px 1px rgba(0,0,0,0.05),0 3px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  link: {
    color: theme.colors.blue[6],
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    fontFamily: theme.fontFamily,
  },
}))

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const defaultValues = {
  email: '',
  password: '',
}

export const SignIn: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState('employer')
  const { classes } = useStyles()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutate = useMutation(authenticateUser)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isLoggedIn, setIsLoggedIn } = useAuthStore((state) => state)

  const onSubmit = useCallback(
    (values: typeof defaultValues) => {
      mutate.mutate(values, {
        onSuccess: (response) => {
          localStorage.setItem('token', response.data.token)
          setIsLoggedIn(true)
          router.replace('/dashboard')
        },
        onError: () => {
          showNotification({
            title: 'Authentication failed',
            message: 'invalid email or password',
            color: 'red',
          })
        },
      })
    },
    [mutate, router, setIsLoggedIn]
  )

  const handleChangeTab = (v: string) => {
    setActiveTab(v)
    reset()
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard')
    } else {
      queryClient.removeQueries()
    }
  }, [router, isLoggedIn, queryClient])

  if (isLoggedIn && mutate.isIdle) {
    return <div></div>
  }
  return (
    <Container mt="30px">
      <Paper className={classes.paper}>
        <Title align="center" weight="normal" mb="24px">
          Sign in
        </Title>
        <Alert
          color="blue"
          variant="light"
          title="use this account to test the app"
          mb="20px"
        >
          <Text>
            Email: <b> tecequ.agelus@gotgel.org </b>
          </Text>
          <Text>
            Password: <b> Test123@</b>
          </Text>
        </Alert>
        <StyledSegmentedControl
          mb="24px"
          value={activeTab}
          onChange={(value) => handleChangeTab(value)}
          data={[
            {
              label: 'I am an Employer',
              value: 'employer',
            },
            {
              label: 'Iam a job seeker',
              value: 'job_seeker',
            },
          ]}
        />
        {activeTab === 'job_seeker' && (
          <Box my="24px">
            <Button
              leftIcon={<BrandGoogle strokeWidth={3} size={20} />}
              fullWidth
              radius="lg"
            >
              Sign in with google
            </Button>
            <Divider label="or" labelPosition="center" my="24px" />
          </Box>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            mb="20px"
            error={errors.email && errors.email.message}
            {...register('email')}
          />
          <TextInput
            label="password"
            mb="20px"
            error={errors.password && errors.password.message}
            {...register('password')}
          />
          <Group position="right" mb="md">
            <Link href="/forget-password">
              <a className={classes.link}>Forgot Password ?</a>
            </Link>
          </Group>
          <Button
            fullWidth
            radius="lg"
            type="submit"
            loading={mutate.isLoading}
          >
            Sign in
          </Button>
        </form>

        <Text mt="lg" align="center" size="sm">
          New to FastRecruiter{' '}
          <Link
            href={activeTab === 'job_seeker' ? 'signup' : '/employer-signup'}
            passHref
          >
            <Text color="blue" component="a" weight={500}>
              {activeTab === 'job_seeker'
                ? 'Create an account'
                : 'Create an account'}
            </Text>
          </Link>
        </Text>
      </Paper>
    </Container>
  )
}

const useSegmentedControlStyles = createStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: '#ffffffff',
    border: 'none',
    marginBottom: '15px',
    margin: '0 auto 15px',
    width: '100%',
    textAlign: 'center',
    maxWidth: '340px',
    padding: '0px',
  },
  label: {
    color: '#72777c',
    fontWeight: 'normal',
    paddingBottom: '14px',
  },
  control: {
    // padding: '10px 0px',
    margin: '0 2px',
    borderBottom: '2px solid transparent',
    boxShadow: 'none',
    '&:hover': { backgroundColor: '#f8f9fa', borderColor: '#dee2e6' },
  },
  labelActive: {
    fontWeight: 700,
  },

  active: {
    display: 'none',
  },
  controlActive: {
    boxShadow: 'none',
    '&:hover': { borderColor: 'transparent' },
    '&::before': {
      borderRadius: '4px 4px 0 0',
      content: '" "',
      display: 'block',
      height: '4px',
      left: '0',
      position: 'absolute',
      bottom: '0',
      width: '100%',
      transition: 'all .08s linear',
      backgroundColor: '#228be6',
    },
  },
}))

const StyledSegmentedControl = ({ data, ...props }: SegmentedControlProps) => {
  const { classes } = useSegmentedControlStyles()
  return (
    <SegmentedControl
      classNames={{
        ...classes,
      }}
      data={data}
      {...props}
    />
  )
}
