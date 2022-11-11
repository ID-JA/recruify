import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import SettingsLayout from '@/layouts/SettingsLayout/SettingsLayout'
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
    <RootLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </RootLayout>
  )
}

export default Options
