import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Group, TextInput} from '@mantine/core'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import SettingsContainer from '../SettingsContainer'

const validationSchema = yup.object().shape({
  current_password: yup.string().email().required(),
  new_password: yup.string().email().required(),
  confirm_password: yup.string().email().required(),
})
const defaultValues = {
  current_password: '',
  new_password: '',
  confirm_password: '',
}
function ChangePassword() {
  const {
    formState: {errors},
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values)
  }

  const onCancel = () => {
    reset()
  }

  return (
    <SettingsContainer
      title="Update password"
      description="Enter your current password to update your password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Current password"
          error={errors.current_password && errors.current_password.message}
          {...register('current_password')}
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          mb="lg"
        />

        <TextInput
          label="New password"
          error={errors.new_password && errors.new_password.message}
          {...register('new_password')}
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          mb="lg"
        />

        <TextInput
          label="Confirm password"
          error={errors.confirm_password && errors.confirm_password.message}
          {...register('confirm_password')}
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          mb="lg"
        />
        <Group position="right" mt="lg">
          <Button variant="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button ml="sm" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </SettingsContainer>
  )
}

export default ChangePassword
