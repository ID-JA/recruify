import { MainLayout, ProfileLayout } from '@/components'
import { NextPageWithLayout } from '@/types'
import { Alert } from '@mantine/core'
import { AlertCircle } from 'tabler-icons-react'

const Options: NextPageWithLayout = () => {
  return (
    <div>
      <Alert
        icon={<AlertCircle size={20} />}
        title="Alert!"
        color="yellow"
        radius="xs"
      >
        This Page is Under Construction
      </Alert>
    </div>
  )
}

Options.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default Options
