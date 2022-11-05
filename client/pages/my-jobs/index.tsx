import JobOffersContainer from '@/components/app/offer/job-offers-container'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { NextPageWithLayout } from '@/types'
import { Divider, Group, Title } from '@mantine/core'

const MyJobs: NextPageWithLayout = () => {
  return (
    <div>
      <Group align="center">
        <Title order={1} weight={600}>
          Jobs
        </Title>
      </Group>
      <Divider my="md" />
      <JobOffersContainer />
    </div>
  )
}

MyJobs.getLayout = (page) => <RootLayout>{page}</RootLayout>
export default MyJobs
