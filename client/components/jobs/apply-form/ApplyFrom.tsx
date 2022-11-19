import { applyToOffer } from '@/services/employer-services'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, createStyles, Text } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import BasicInformation from './steps/BasicInformation'
import Education from './steps/Education'
import Experience from './steps/Experience'

export const useStyles = createStyles(() => ({
  root: {
    padding: '24px 16px',
  },
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
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
    '& > div': {
      flexGrow: 1,
    },
  },
}))

const steps = [BasicInformation, Experience, Education]

type ApplyFormType = typeof BasicInformation.defaultValues &
  typeof Experience.defaultValues &
  typeof Education.defaultValues

function AppLyForm() {
  const router = useRouter()
  const { jobId } = router.query
  const [active, setActive] = useState(0)

  const { classes } = useStyles()
  const methods = useForm<ApplyFormType>({
    defaultValues: {
      ...BasicInformation.defaultValues,
      ...Experience.defaultValues,
      ...Education.defaultValues,
    },
    resolver: yupResolver(steps[active].validationSchema),
  })

  const { handleSubmit } = methods

  const mutation = useMutation(applyToOffer)

  const onSubmit = (values: ApplyFormType) => {
    if (active === 2) {
      console.log({
        applicant: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          experiences: [
            {
              position: values.position,
              company: values.company,
              startYear: values.startYear,
              startMonth: values.startMonth,

              endYear: values.endYear,
              endMonth: values.endMonth,
              description: values.description,
            },
          ],
          educations: [
            {
              school: values.school,
              degree: values.degree,
              inProgress: values.inProgress,
              degreeYear: values.degreeYear,
              description: values.description,
            },
          ],
        },
      })
      mutation.mutate(
        {
          data: {
            applicant: {
              name: values.name,
              email: values.email,
              phoneNumber: values.phoneNumber,
              experiences: [
                {
                  position: values.position,
                  company: values.company,
                  startYear: values.startYear,
                  startMonth: values.startMonth,

                  endYear: values.endYear,
                  endMonth: values.endMonth,
                  description: values.description,
                },
              ],
              educations: [
                {
                  school: values.school,
                  degree: values.degree,
                  inProgress: values.inProgress,
                  degreeYear: values.degreeYear,
                  description: values.description,
                },
              ],
            },
          },
          id: jobId as string,
        },
        {
          onSuccess: () => {
            router.push('/')
          },
        }
      )
    } else {
      setActive((prev) => prev + 1)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" loading={mutation.isLoading}>
          {active < steps.length - 1 ? 'Continue' : 'Apply'}
        </Button>
      </form>
    </FormProvider>
  )
}
export default AppLyForm
