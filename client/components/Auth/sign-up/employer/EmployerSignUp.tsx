import Logo from '@/components/logo/Logo'
import { signupEmployer } from '@/services/auth-service'
import { NextPageWithLayout } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Center, Container, Paper, Progress } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CompanyDetails, EmployerAccount, FinalizeDetails } from './steps'

type Action =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'setData'; payload: Record<string, string | number> }

type StepperState = {
  activeStep: number
  progress: number
  data: Record<string, string | number>
}

function reducer(state: StepperState, action: Action) {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        progress: state.progress < 100 ? state.progress + 34 : state.progress,
        activeStep:
          state.activeStep < 2 ? state.activeStep + 1 : state.activeStep,
      }
    case 'prev':
      return {
        ...state,
        progress: state.progress <= 0 ? state.progress : state.progress - 20,
        activeStep:
          state.activeStep <= 0 ? state.activeStep : state.activeStep - 1,
      }

    case 'setData':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      }

    default:
      throw new Error('action not supported')
  }
}

const defaultStepperState: StepperState = {
  activeStep: 0,
  progress: 34,
  data: {},
}

const useStepper = () => {
  return useReducer(reducer, defaultStepperState)
}

const steps = [EmployerAccount, CompanyDetails, FinalizeDetails]

const defaultValues = {
  zipCode: 0,
  position: '',
  phoneNumber: '',
  companyName: '',
  companyLocation: '',
  companyWebsite: '',
  email: '',
  name: '',
  password: '',
}

export const EmployerSignUp: NextPageWithLayout = () => {
  const [state, dispatch] = useStepper()
  const router = useRouter()
  const methods = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(steps[state.activeStep].validationSchema),
  })

  const { handleSubmit } = methods
  const mutation = useMutation((values: typeof defaultValues) => {
    return signupEmployer(values)
  })

  const onSubmit = (values: typeof defaultValues) => {
    if (state.activeStep === 2) {
      console.log('submitting...')
      mutation.mutate(values, {
        onSuccess: () => {
          showNotification({
            title: 'Success',
            message: 'Account created successfully',
            color: 'green',
          })
          router.push('/signin')
        },
        onError: (error) => {
          console.log(error)
          showNotification({
            title: 'Error',
            message: 'Something went wrong',
            color: 'red',
          })
        },
      })
    } else {
      dispatch({
        type: 'setData',
        payload: values,
      })
      dispatch({ type: 'next' })
    }
  }

  return (
    <>
      <Progress
        value={state.progress}
        radius="xs"
        styles={{
          root: {
            borderRadius: '0 !important',
            '& > div': {
              borderRadius: '0 !important',
            },
          },
        }}
      />
      <Container mt="30px">
        <Center mb="md">
          <Logo />
        </Center>
        <Paper
          sx={{
            margin: 'auto',
            maxWidth: '512px',
            boxShadow:
              'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          }}
          p="1.5rem"
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {steps.map(
                (Step, index) =>
                  state.activeStep === index && (
                    <Step.Component key={`create-multistep-${Step.key}`} />
                  )
              )}
              <Button
                fullWidth
                size="md"
                radius="sm"
                type="submit"
                mb="md"
                loading={mutation.isLoading}
              >
                {state.activeStep > 0
                  ? state.activeStep === steps.length - 1
                    ? 'Create Account'
                    : 'Continue'
                  : 'Get Started'}
              </Button>
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </>
  )
}
