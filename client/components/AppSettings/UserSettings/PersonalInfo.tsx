import {yupResolver} from '@hookform/resolvers/yup'
import {Avatar, Button, Group, TextInput} from '@mantine/core'

import {useForm} from 'react-hook-form'
import * as yup from 'yup'

import SettingContainer from '../SettingsContainer'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  phone_number: yup.string().required(),
  position: yup.string().required(),
})

const defaultValues = {
  name: 'Kent Smith',
  phone_number: '+45 564 253 152',
  position: 'Admin',
}

function PersonalInfo() {
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
    <SettingContainer
      title="Personal Info"
      description="Here you can update your photo and personal details"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Avatar
          mb="lg"
          radius="xl"
          size="xl"
          color="red"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
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
          error={errors.phone_number && errors.phone_number.message}
          {...register('phone_number')}
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
    </SettingContainer>
  )
}

export default PersonalInfo
