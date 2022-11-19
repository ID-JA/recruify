import { Checkbox, Select, Textarea, TextInput } from '@mantine/core'
import { getMonthsNames, getYearsRange } from '@mantine/dates'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { useStyles } from '../ApplyFrom'

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
  position: yup.string().required('this field is required'),
  company: yup.string().required('this field is required'),
  stillWorking: yup.bool(),
  startYear: yup.string().required('this field is required'),
  startMonth: yup.string().required('this field is required'),
  endYear: yup.string().when('stillWorking', {
    is: undefined,
    then: yup.string().required('this field is required'),
    otherwise: yup.string().notRequired(),
  }),
  endMonth: yup.string().when('stillWorking', {
    is: undefined,
    then: yup.string().required('this field is required'),
    otherwise: yup.string().notRequired(),
  }),
  description: yup.string(),
})

const defaultValues = {
  position: '',
  company: '',
  stillWorking: undefined,
  startYear: '',
  startMonth: '',
  endYear: '',
  endMonth: '',
  description: '',
}

function Experience() {
  const { classes } = useStyles()
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
        label="Job Title"
        {...register('position')}
        error={errors.position && errors.position.message}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Company Name"
        {...register('company')}
        error={errors.company && errors.company.message}
      />
      <Controller
        name="stillWorking"
        render={({ field }) => (
          <Checkbox
            mb="lg"
            label="I currently work here"
            {...register('stillWorking')}
            {...field}
          />
        )}
        control={control}
      />
      <div className={classes.row}>
        <Controller
          name="startYear"
          control={control}
          render={({ field }) => (
            <Select
              label="Start Year"
              data={years}
              error={errors.startYear && errors.startYear.message}
              styles={{
                label: {
                  marginBottom: '12px',
                },
              }}
              {...register('startYear')}
              {...field}
            />
          )}
        />
        <Controller
          name="startMonth"
          render={({ field }) => (
            <Select
              label="Start Month"
              styles={{
                label: {
                  marginBottom: '12px',
                },
              }}
              data={months}
              {...register('startMonth')}
              {...field}
              error={errors.startMonth && errors.startMonth.message}
            />
          )}
          control={control}
        />
      </div>
      {!watch('stillWorking') && (
        <div className={classes.row}>
          <Controller
            name="endYear"
            render={({ field }) => (
              <Select
                label="End Year"
                styles={{
                  label: {
                    marginBottom: '12px',
                  },
                }}
                data={years}
                {...register('endYear')}
                {...field}
                error={errors.endYear && errors.endYear.message}
              />
            )}
            control={control}
          />

          <Controller
            name="endMonth"
            render={({ field }) => (
              <Select
                label="End Month"
                styles={{
                  label: {
                    marginBottom: '12px',
                  },
                }}
                data={months}
                {...register('endMonth')}
                {...field}
                error={errors.endMonth && errors.endMonth.message}
              />
            )}
            control={control}
          />
        </div>
      )}

      <Textarea
        mb="lg"
        label="Description"
        error={errors.description && errors.description.message}
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        {...register('description')}
      />
    </>
  )
}

export default {
  Component: Experience,
  validationSchema,
  defaultValues,
  stepTitle: 'Experience',
}
