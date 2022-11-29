import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { getMonthsNames, getYearsRange } from '@mantine/dates'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Minus } from 'tabler-icons-react'
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

const formState = {
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
}

const validationSchema = yup.object().shape({
  experiences: yup
    .array()
    .of(yup.object().shape(formState))
    .required('Must have fields')
    .min(1, 'Minimum of 1 field'),
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
  } = useFormContext<{
    experiences: typeof defaultValues[]
  }>()

  const { fields, append, remove } = useFieldArray<{
    experiences: {
      position: string
      company: string
      stillWorking: undefined
      startYear: string
      startMonth: string
      endYear: string
      endMonth: string
      description: string
    }[]
  }>({
    name: 'experiences',
  })

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Text>
              <b>
                {index + 1} /{fields.length}
              </b>
            </Text>
            <ActionIcon
              variant="outline"
              color="red"
              onClick={() => {
                remove(index)
              }}
            >
              <Minus size={20} strokeWidth={2.5} />
            </ActionIcon>
          </div>
          <TextInput
            styles={{
              label: {
                marginBottom: '12px',
              },
            }}
            mb="lg"
            label="Job Title"
            error={errors.experiences?.[index]?.position?.message}
            {...register(`experiences.${index}.position`)}
          />
          <TextInput
            styles={{
              label: {
                marginBottom: '12px',
              },
            }}
            mb="lg"
            label="Company Name"
            error={errors.experiences?.[index]?.company?.message}
            {...register(`experiences.${index}.company`)}
          />
          <Controller
            name={`experiences.${index}.stillWorking`}
            render={({ field }) => (
              <Checkbox
                mb="lg"
                label="I currently work here"
                {...register(`experiences.${index}.stillWorking`)}
                {...field}
              />
            )}
            control={control}
          />
          <div className={classes.row}>
            <Controller
              name={`experiences.${index}.startYear`}
              control={control}
              render={({ field }) => (
                <Select
                  label="Start Year"
                  data={years}
                  styles={{
                    label: {
                      marginBottom: '12px',
                    },
                  }}
                  error={errors.experiences?.[index]?.startYear?.message}
                  {...register(`experiences.${index}.startYear`)}
                  {...field}
                />
              )}
            />
            <Controller
              name={`experiences.${index}.startMonth`}
              render={({ field }) => (
                <Select
                  label="Start Month"
                  styles={{
                    label: {
                      marginBottom: '12px',
                    },
                  }}
                  error={errors.experiences?.[index]?.startMonth?.message}
                  data={months}
                  {...register(`experiences.${index}.startMonth`)}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          {!watch(`experiences.${index}.stillWorking`) && (
            <div className={classes.row}>
              <Controller
                name={`experiences.${index}.endYear`}
                render={({ field }) => (
                  <Select
                    label="End Year"
                    styles={{
                      label: {
                        marginBottom: '12px',
                      },
                    }}
                    error={errors.experiences?.[index]?.endYear?.message}
                    data={years}
                    {...register(`experiences.${index}.endYear`)}
                    {...field}
                  />
                )}
                control={control}
              />

              <Controller
                name={`experiences.${index}.endMonth`}
                render={({ field }) => (
                  <Select
                    label="End Month"
                    styles={{
                      label: {
                        marginBottom: '12px',
                      },
                    }}
                    error={errors.experiences?.[index]?.endMonth?.message}
                    data={months}
                    {...register(`experiences.${index}.endMonth`)}
                    {...field}
                  />
                )}
                control={control}
              />
            </div>
          )}

          <Textarea
            mb="lg"
            label="Description"
            styles={{
              label: {
                marginBottom: '12px',
              },
            }}
            {...register(`experiences.${index}.description`)}
          />
          <Divider my="xl" size="md" />
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="subtle"
          mb={20}
          type="button"
          onClick={() => {
            append(defaultValues)
          }}
        >
          Add Experience
        </Button>
      </div>
    </>
  )
}

export default {
  Component: Experience,
  validationSchema,
  defaultValues,
  stepTitle: 'Experience',
}
