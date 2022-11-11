import { Checkbox, Select, Textarea, TextInput } from '@mantine/core'
import { getYearsRange } from '@mantine/dates'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  school: yup.string().required('This field is required'),
  degree: yup.string().required('This field is required'),
  edu_current: yup.bool(),
  degree_year: yup.string().when('edu_current', {
    is: undefined,
    then: yup.string().required('This field is required'),
    otherwise: yup.string().notRequired(),
  }),
  edu_description: yup.string(),
})

const defaultValues = {
  school: '',
  degree: '',
  edu_current: undefined,
  degree_year: '',
  edu_description: '',
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
        name="edu_current"
        render={({ field }) => (
          <Checkbox
            mb="lg"
            label="Currently in progress"
            {...register('edu_current')}
            {...field}
          />
        )}
        control={control}
      />
      {!watch('edu_current') && (
        <Controller
          name="degree_year"
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
              {...register('degree_year')}
              {...field}
              error={errors.degree_year && errors.degree_year.message}
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
        {...register('edu_description')}
        error={errors.edu_description && errors.edu_description.message}
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
