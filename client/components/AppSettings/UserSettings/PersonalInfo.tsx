import { yupResolver } from '@hookform/resolvers/yup'
import {
  Avatar,
  Button,
  createStyles,
  Group,
  Text,
  TextInput,
} from '@mantine/core'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import SettingContainer from '../SettingsContainer'

import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { CloudUpload, Download, X } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}))

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
  const { classes, theme } = useStyles()
  return (
    <SettingContainer
      title="Personal Info"
      description="Here you can update your photo and personal details"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Avatar
            mb="lg"
            radius="xl"
            size="xl"
            color="red"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
          <div className={classes.wrapper}>
            <Dropzone
              onDrop={(files) => console.log('accepted files', files)}
              onReject={(files) => console.log('rejected files', files)}
              className={classes.dropzone}
              radius="md"
              accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
              maxSize={2 * 1024 ** 2}
              multiple={false}
            >
              <div style={{ pointerEvents: 'none' }}>
                <Group position="center">
                  <Dropzone.Accept>
                    <Download
                      size={50}
                      color={theme.colors[theme.primaryColor][6]}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <X size={50} color={theme.colors.red[6]} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <CloudUpload size={50} color="#475467" />
                  </Dropzone.Idle>
                </Group>

                <Text align="center" weight={600} size="lg" mt="md">
                  Upload Image
                </Text>
                <Text
                  align="center"
                  size="sm"
                  mt="xs"
                  sx={{
                    color: '#667085',
                  }}
                >
                  Drag&apos;n&apos;drop file here to upload. We can accept only{' '}
                  <i>.png</i>, <i>.jpeg</i> files that are less than 2mb in
                  size.
                </Text>
              </div>
            </Dropzone>
          </div>
        </div>
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
    </SettingContainer>
  )
}

export default PersonalInfo
