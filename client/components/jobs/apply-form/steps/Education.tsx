import {
  ActionIcon,
  Button,
  Checkbox,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { getYearsRange } from '@mantine/dates'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Minus } from 'tabler-icons-react'
import * as yup from 'yup'

const formState = {
  school: yup.string().required('This field is required'),
  degree: yup.string().required('This field is required'),
  inProgress: yup.bool(),
  degreeYear: yup.string().when('inProgress', {
    is: undefined,
    then: yup.string().required('This field is required'),
    otherwise: yup.string().notRequired(),
  }),
  description: yup.string(),
}

const validationSchema = yup.object().shape({
  educations: yup
    .array()
    .of(yup.object().shape(formState))
    .required('Must have fields')
    .min(1, 'Minimum of 1 field'),
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
  } = useFormContext<{
    educations: typeof defaultValues[]
  }>()

  const { fields, append, remove } = useFieldArray<{
    educations: {
      school: string
      degree: string
      inProgress: undefined
      degreeYear: string
      description: string
    }[]
  }>({
    name: 'educations',
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
            label="School"
            {...register(`educations.${index}.school`)}
            error={errors.educations?.[index]?.school?.message}
          />
          <TextInput
            styles={{
              label: {
                marginBottom: '12px',
              },
            }}
            mb="lg"
            label="Degree"
            {...register(`educations.${index}.degree`)}
            error={errors.educations?.[index]?.degree?.message}
          />
          <Controller
            name={`educations.${index}.inProgress`}
            render={({ field }) => (
              <Checkbox
                mb="lg"
                label="Currently in progress"
                {...register(`educations.${index}.inProgress`)}
                {...field}
              />
            )}
            control={control}
          />
          {!watch(`educations.${index}.inProgress`) && (
            <Controller
              name={`educations.${index}.degreeYear`}
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
                  {...register(`educations.${index}.degreeYear`)}
                  {...field}
                  error={errors.educations?.[index]?.degreeYear?.message}
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
            {...register(`educations.${index}.description`)}
            error={errors.educations?.[index]?.description?.message}
          />
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
  Component: Education,
  validationSchema,
  defaultValues,
  stepTitle: 'Eduction',
}
