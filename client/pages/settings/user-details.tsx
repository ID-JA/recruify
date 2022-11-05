import { ChangePassword, PersonalInfo } from '@/components'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import SettingsLayout from '@/layouts/SettingsLayout/SettingsLayout'
import { NextPageWithLayout } from '@/types'
import { Divider } from '@mantine/core'

const Details: NextPageWithLayout = () => (
  <>
    <PersonalInfo />
    <Divider my="lg" />
    <ChangePassword />
  </>
)

Details.getLayout = (page) => (
  <RootLayout>
    <SettingsLayout>{page}</SettingsLayout>
  </RootLayout>
)

export default Details
