import { ChangePassword, PersonalInfo } from '@/components'
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

Details.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>

export default Details
