import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Center,
  Container,
  Paper,
  Progress,
  Title,
} from '@mantine/core'

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
        progress: state.progress < 100 ? state.progress + 20 : state.progress,
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
  progress: 20,
  data: {},
}

const useStepper = () => {
  return useReducer(reducer, defaultStepperState)
}

type ISignUpFormData =
  | {
      name: string
      email: string
      password: string
    }
  | {
      companyName: string
      companyLocation: string
      website: string
    }
  | {
      position: string
      zipCode: string
      phoneNumber: string
    }

const steps = [EmployerAccount, CompanyDetails, FinalizeDetails]

export function EmployerSignUp() {
  const [state, dispatch] = useStepper()

  const methods = useForm<ISignUpFormData>({
    defaultValues: steps[state.activeStep].defaultValues,
    resolver: yupResolver(steps[state.activeStep].validationSchema),
  })

  const { handleSubmit } = methods

  const onSubmit = (values: Record<string, string>) => {
    if (state.activeStep === 2) {
      console.log('submitting...')
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
          <Title>FastRecruiter</Title>
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
              <Button fullWidth size="md" radius="sm" type="submit" mb="md">
                {state.activeStep > 0
                  ? state.activeStep === steps.length - 1
                    ? 'Create Account'
                    : 'Continue'
                  : 'Get Started'}
              </Button>
              {state.activeStep > 0 && (
                <Button
                  fullWidth
                  radius="sm"
                  variant="outline"
                  onClick={() =>
                    dispatch({
                      type: 'prev',
                    })
                  }
                >
                  Previous
                </Button>
              )}
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </>
  )
}