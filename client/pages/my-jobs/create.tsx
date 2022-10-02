import { Divider, Title } from '@mantine/core'
import { MainLayout, CreateJob } from '~/components'
import { NextPageWithLayout } from '../_app'

const CreateNewJob: NextPageWithLayout = () => {
  return (
    <>
      <Title order={1} weight={500}>
        Post a job
      </Title>
      <Divider my="lg" />
      <CreateJob />
    </>
  )
}

CreateNewJob.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default CreateNewJob
