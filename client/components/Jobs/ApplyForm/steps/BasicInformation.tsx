import { TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  full_name: yup.string().required('full name is required'),
  phone_number: yup.string().required('phone number is required'),
})

const defaultValues = {
  full_name: '',
  phone_number: '',
}
function BasicInformation() {
  const {
    register,
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
        label="Full Name"
        {...register('full_name')}
        error={errors.full_name && errors.full_name.message}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Phone Number"
        {...register('phone_number')}
        error={errors.phone_number && errors.phone_number.message}
      />
    </>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Component: BasicInformation,
  validationSchema,
  defaultValues,
  stepTitle: 'Basic Information',
}
