import { Select, Text, TextInput } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  position: yup.string().required('please select an position'),
  phoneNumber: yup.string().required('phone number is required'),
})

type FinalizeDetailsType = {
  position: string
  zipCode: string
  phoneNumber: string
}

const defaultValues = {
  zipCode: '',
  position: '',
  phoneNumber: '',
}

const POSITION_USER = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'HR / Talent Professional',
    value: 'hr / talent professional',
  },
  {
    label: 'Manager / Head of Department',
    value: 'manager / head of department',
  },
  {
    label: 'Director / VP',
    value: 'director / vp',
  },
  {
    label: 'Business Owner',
    value: 'business owner',
  },
  {
    label: 'Recruiting/Staffing Firm',
    value: 'recruiting/staffing firm',
  },
]

function FinalizeDetails() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<FinalizeDetailsType>()

  return (
    <>
      <Text size="xl" weight="bold" align="center" mb="24px">
        Finalize Your Details
      </Text>
      <Controller
        render={({ field }) => (
          <Select
            label="Your current position"
            mb="20px"
            data={POSITION_USER}
            {...field}
            error={errors.position && errors.position.message}
          />
        )}
        control={control}
        name="position"
      />
      <TextInput
        label="ZipCode"
        type="text"
        mb="20px"
        {...register('zipCode')}
        error={errors.zipCode && errors.zipCode.message}
      />
      <TextInput
        label="Phone number"
        mb="20px"
        {...register('phoneNumber')}
        error={errors.phoneNumber && errors.phoneNumber.message}
      />
    </>
  )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Component: FinalizeDetails,
  defaultValues,
  validationSchema,
  key: 'finalize-details',
}
