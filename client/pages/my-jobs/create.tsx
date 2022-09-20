import {Divider, Title} from '@mantine/core'
import AppLayout from '../../components/AppLayout/AppLayout'
import CreateJobForm from '../../components/Jobs/CreateJobForm'
import {NextPageWithLayout} from '../_app'

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

CreateNewJob.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default CreateNewJob
