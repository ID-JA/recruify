import { Text, Title } from '@mantine/core'
import AppLayout from '../../components/AppLayout/AppLayout'
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
  return <AppLayout>{page}</AppLayout>
}

export default Dashboard
