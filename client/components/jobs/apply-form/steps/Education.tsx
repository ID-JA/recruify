import { Checkbox, Select, Textarea, TextInput } from '@mantine/core'
import { getYearsRange } from '@mantine/dates'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  school: yup.string().required('This field is required'),
  degree: yup.string().required('This field is required'),
  inProgress: yup.bool(),
  degreeYear: yup.string().when('inProgress', {
    is: undefined,
    then: yup.string().required('This field is required'),
    otherwise: yup.string().notRequired(),
  }),
  description: yup.string(),
})

const defaultValues = {
  school: '',
  degree: '',
  inProgress: undefined,
  degreeYear: '',
  description: '',
}

const years = getYearsRange({ from: 1930, to: 2022 })
  .reverse()
  .map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }))

function Education() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<typeof defaultValues>()

  return (
    <>
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="School"
        {...register('school')}
        error={errors.school && errors.school.message}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Degree"
        {...register('degree')}
        error={errors.degree && errors.degree.message}
      />
      <Controller
        name="inProgress"
        render={({ field }) => (
          <Checkbox
            mb="lg"
            label="Currently in progress"
            {...register('inProgress')}
            {...field}
          />
        )}
        control={control}
      />
      {!watch('inProgress') && (
        <Controller
          name="degreeYear"
          render={({ field }) => (
            <Select
              label="Degree Year"
              styles={{
                label: {
                  marginBottom: '12px',
                },
              }}
              mb="lg"
              data={years}
              {...register('degreeYear')}
              {...field}
              error={errors.degreeYear && errors.degreeYear.message}
            />
          )}
          control={control}
        />
      )}
      <Textarea
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Description"
        {...register('description')}
        error={errors.description && errors.description.message}
      />
    </>
  )
}

export default {
  Component: Education,
  validationSchema,
  defaultValues,
  stepTitle: 'Eduction',
}
