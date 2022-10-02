import { Text, TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
})

interface IEmployerAccount {
  email: string
  name: string
  password: string
}

const defaultValues: IEmployerAccount = {
  email: '',
  name: '',
  password: '',
}

function EmployerAccount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IEmployerAccount>()

  return (
    <>
      <Text size="xl" weight="bold" align="center" mb="24px">
        Create an Employer Account
      </Text>
      <TextInput
        label="Your Name"
        type="text"
        mb="20px"
        {...register('name')}
        error={errors.name && errors.name.message}
      />
      <TextInput
        label="Email address "
        type="email"
        mb="20px"
        {...register('email')}
        error={errors.email && errors.email.message}
      />
      <TextInput
        label="Password"
        type="password"
        mb="24px"
        {...register('password')}
        error={errors.password && errors.password.message}
      />
    </>
  )
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Component: EmployerAccount,
  validationSchema,
  defaultValues,
  key: 'employer-account',
}
