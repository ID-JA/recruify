import { Checkbox, Select, Textarea, TextInput } from '@mantine/core'
import { getMonthsNames, getYearsRange } from '@mantine/dates'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const years = getYearsRange({ from: 1930, to: 2022 })
  .reverse()
  .map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }))

const months = getMonthsNames('en', 'MMMM').map((month) => ({
  label: month,
  value: month,
}))

const validationSchema = yup.object().shape({
  job_position: yup.string().required('this field is required'),
  company_name: yup.string().required('this field is required'),
  // current: yup.bool(), //.required('this field is required'),
  start_year: yup.string().required('this field is required'),
  start_month: yup.string().required('this field is required'),
  end_year: yup.string().required('this field is required'),
  end_month: yup.string().required('this field is required'),
  exp_description: yup.string().required('this field is required'),
})

const defaultValues = {
  job_position: '',
  company_name: '',
  current: undefined,
  start_year: '',
  start_month: '',
  end_year: '',
  end_month: '',
  exp_description: '',
}

function Experience() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<typeof defaultValues>()

  return (
    <div>
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Job Title"
        {...register('job_position')}
        error={errors.job_position && errors.job_position.message}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Company Name"
        {...register('company_name')}
        error={errors.company_name && errors.company_name.message}
      />
      <Controller
        name="current"
        render={({ field }) => (
          <Checkbox
            mb="lg"
            label="I currently work here"
            {...register('current')}
            {...field}
          />
        )}
        control={control}
      />
      <div>
        <Controller
          name="start_year"
          render={({ field }) => (
            <Select
              label="Start Year"
              styles={{
                label: {
                  marginBottom: '12px',
                },
              }}
              data={years}
              {...register('start_year')}
              {...field}
              error={errors.start_year && errors.start_year.message}
            />
          )}
          control={control}
        />
        <Controller
          name="start_month"
          render={({ field }) => (
            <Select
              label="Start Month"
              styles={{
                label: {
                  marginBottom: '12px',
                },
              }}
              data={months}
              {...register('start_month')}
              {...field}
              error={errors.start_month && errors.start_month.message}
            />
          )}
          control={control}
        />
      </div>
      {!watch('current') && (
        <div>
          <Controller
            name="end_year"
            render={({ field }) => (
              <Select
                label="End Year"
                styles={{
                  label: {
                    marginBottom: '12px',
                  },
                }}
                data={years}
                {...register('end_year')}
                {...field}
                error={errors.end_year && errors.end_year.message}
              />
            )}
            control={control}
          />

          <Controller
            name="end_month"
            render={({ field }) => (
              <Select
                label="End Month"
                styles={{
                  label: {
                    marginBottom: '12px',
                  },
                }}
                data={months}
                {...register('end_month')}
                {...field}
                error={errors.end_month && errors.end_month.message}
              />
            )}
            control={control}
          />
        </div>
      )}

      <Textarea
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Description"
        {...register('exp_description')}
        error={errors.exp_description && errors.exp_description.message}
      />
    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Component: Experience,
  validationSchema,
  defaultValues,
  stepTitle: 'Experience',
}