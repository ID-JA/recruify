import { CreateJobForm } from '@/components'
import { Divider, Title } from '@mantine/core'

const CreateNewJob = () => {
  return (
    <>
      <Title order={1} weight={500}>
        Post a job
      </Title>
      <Divider my="lg" />
      <CreateJobForm />
    </>
  )
}

export default CreateNewJob
