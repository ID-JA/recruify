import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  createStyles,
  Divider,
  Paper,
  Text,
} from '@mantine/core'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import BasicInformation from './steps/BasicInformation'
import Education from './steps/Education'
import Experience from './steps/Experience'

const useStyles = createStyles(() => ({
  titleWrapper: {
    marginBottom: 24,
  },

  stepTitle: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '24px',
  },

  smallTitle: {
    color: '#515659',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: 1.5,
  },
  title: {
    color: '#2f3639',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: 1.5,
  },
}))

const steps = [BasicInformation, Experience, Education]

// type IApplyForm =
//   | {
//       full_name: string
//       phone_number: string
//     }
//   | {
//       job_position: string
//       company_name: string
//       current: string
//       start_year: string
//       start_month: string
//       end_year: string
//       end_month: string
//       exp_description: string
//     }
//   | {
//       school: string
//       degree: string
//       edu_current: boolean
//       edu_description: string
//     }

type ApplyFormType =
  | typeof BasicInformation.defaultValues
  | typeof Experience.defaultValues
  | typeof Education.defaultValues

function AppLyForm() {
  const [active, setActive] = useState(0)
  const { classes } = useStyles()
  const methods = useForm<ApplyFormType>({
    defaultValues: steps[active].defaultValues,
    resolver: yupResolver(steps[active].validationSchema),
  })

  const { handleSubmit } = methods

  const onSubmit = (values: ApplyFormType) => {
    if (active === 2) {
      console.log(values)
    } else {
      setActive((prev) => prev + 1)
    }
  }

  return (
    <Container size="sm">
      <Paper withBorder p="xl">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.titleWrapper}>
              <Text className={classes.smallTitle}>Applying to:</Text>
              <Text className={classes.title}>JavaScript developer</Text>
              <Text className={classes.smallTitle}>Boston, MA, USA</Text>
            </div>
            <Divider mb="lg" />
            <Text className={classes.stepTitle}>{steps[active].stepTitle}</Text>
            {steps.map(
              (Step, index) =>
                index === active && (
                  <Step.Component key={`apply-step-${index + 1}`} />
                )
            )}

            {active > 0 && (
              <Button
                radius="sm"
                variant="outline"
                onClick={() => setActive((prev) => prev - 1)}
                mr="sm"
              >
                Previous
              </Button>
            )}
            <Button type="submit">
              {active < steps.length - 1 ? 'Continue' : 'Apply'}
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  )
}

export default AppLyForm
