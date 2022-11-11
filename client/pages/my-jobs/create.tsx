import AddEditOffer from '@/components/jobs/add-edit-offer'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { NextPageWithLayout } from '@/types'
import { Divider, Title } from '@mantine/core'

const CreateNewJob: NextPageWithLayout = () => {
  return (
    <>
      <Title order={1} weight={500}>
        Post a job
      </Title>
      <Divider my="lg" />
      <AddEditOffer />
    </>
  )
}

CreateNewJob.getLayout = (page) => <RootLayout>{page}</RootLayout>

export default CreateNewJob
