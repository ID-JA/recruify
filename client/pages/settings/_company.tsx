import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import SettingsLayout from '@/layouts/SettingsLayout/SettingsLayout'
import { NextPageWithLayout } from '@/types'

const Company: NextPageWithLayout = () => {
  return <div>Hiring Company page</div>
}

Company.getLayout = (page) => (
  <RootLayout>
    <SettingsLayout>{page}</SettingsLayout>
  </RootLayout>
)

export default Company
