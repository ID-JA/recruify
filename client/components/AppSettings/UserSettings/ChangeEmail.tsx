import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Group, TextInput} from '@mantine/core'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import SettingsContainer from '../SettingsContainer'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
})
const defaultValues = {
  email: 'kent.smith@gmail.com',
}
function ChangeEmail() {
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
      title="Change Email"
      description="Having an up-to-date email attached to you account is a great step toward improved account security "
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email address"
          error={errors.email && errors.email.message}
          {...register('email')}
        />
        <Group position="right" mt="lg">
          <Button variant="light" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button ml="sm" size="md" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </SettingsContainer>
  )
}

export default ChangeEmail
