import { TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  full_name: yup.string().required('this field is required'),
  phoneNumber: yup.string().required('this field is required'),
  email: yup.string().email().required('this field is required'),
})

const defaultValues = {
  full_name: 'Jamal Id Aissa',
  phoneNumber: '',
  email: '',
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
        label="Email Address"
        {...register('email')}
        error={errors.email && errors.email.message}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '12px',
          },
        }}
        mb="lg"
        label="Phone Number"
        {...register('phoneNumber')}
        error={errors.phoneNumber && errors.phoneNumber.message}
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