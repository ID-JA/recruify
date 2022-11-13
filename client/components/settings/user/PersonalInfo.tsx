import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Group, TextInput } from '@mantine/core'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { SettingSection } from '../SettingsContainer'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),

  phoneNumber: yup.string().required(),
  position: yup.string().required(),
})

const defaultValues = {
  email: '',
  name: '',
  phoneNumber: '',
  position: '',
}

function PersonalInfo() {
  const {
    formState: { errors },
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
    <SettingSection
      title="Personal Info"
      description="Here you can update your photo and personal details"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Email address"
          mb="lg"
          error={errors.email && errors.email.message}
          {...register('email')}
        />
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Name"
          mb="lg"
          error={errors.name && errors.name.message}
          {...register('name')}
        />
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Job title"
          mb="lg"
          error={errors.position && errors.position.message}
          {...register('position')}
        />

        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Phone number"
          error={errors.phoneNumber && errors.phoneNumber.message}
          {...register('phoneNumber')}
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
    </SettingSection>
  )
}

export { PersonalInfo }
