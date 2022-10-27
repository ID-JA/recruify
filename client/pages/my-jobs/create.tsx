import { CreateJobForm, MainLayout } from '@/components'
import { NextPageWithLayout } from '@/types'
import { Divider, Title } from '@mantine/core'

const CreateNewJob: NextPageWithLayout = () => {
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

CreateNewJob.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default CreateNewJob
