import { Text, Title } from '@mantine/core'
import { MainLayout } from '~/components'
import { NextPageWithLayout } from '../_app'

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Title order={1} mb="sm">
        Dashboard
      </Title>
      <Text size="sm">Welcome Kent - Saturday, Sep 17, 2022</Text>
    </>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default Dashboard
