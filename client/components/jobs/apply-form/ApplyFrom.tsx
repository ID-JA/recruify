import { applyToOffer } from '@/services/employer-services'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, createStyles, Text, ThemeIcon, Title } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CircleCheck } from 'tabler-icons-react'
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

const defaultValues = {
  name: '',
  email: '',
  phoneNumber: '',
  experiences: [
    {
      company: '',
      position: '',
      startYear: '',
      endYear: '',
      endMonth: '',
      stillWorking: undefined,
      startMonth: '',
    },
  ],
  educations: [
    {
      school: '',
      degree: '',
      inProgress: undefined,
      degreeYear: '',
      description: '',
    },
  ],
}
function AppLyForm() {
  const router = useRouter()
  const { jobId } = router.query
  const [active, setActive] = useState(0)

  const { classes } = useStyles()
  const methods = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(steps[active]?.validationSchema),
  })

  const { handleSubmit } = methods

  const mutation = useMutation(applyToOffer)

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values)

    if (active === 2) {
      console.log({
        applicant: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          experiences: values.experiences,
          educations: values.educations,
        },
      })
      mutation.mutate(
        {
          data: {
            applicant: {
              name: values.name,
              email: values.email,
              phoneNumber: values.phoneNumber,
              experiences: values.experiences, // FIXME: endYear and endMonth are not required if stillWorking is true
              educations: values.educations, // FIXME: degreeYear is not required if inProgress is true
            },
          },
          id: jobId as string,
        },
        {
          onSuccess: () => {
            setActive((prev) => prev + 1)
          },
        }
      )
    } else {
      setActive((prev) => prev + 1)
    }
  }

  return (
    <FormProvider {...methods}>
      {active < 3 ? (
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
      ) : (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <ThemeIcon
            color="green"
            size={60}
            variant="light"
            radius="xl"
            mb="xl"
          >
            <CircleCheck size={40} />
          </ThemeIcon>
          <Title order={3}>Great</Title>
          <div>You have successfully applied to this job</div>
        </div>
      )}
    </FormProvider>
  )
}
export default AppLyForm
