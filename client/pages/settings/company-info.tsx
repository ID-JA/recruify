import { CompanyInfo as CompanyProfile } from '@/components'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import SettingsLayout from '@/layouts/SettingsLayout/SettingsLayout'
import { NextPageWithLayout } from '@/types'

const CompanyInfo: NextPageWithLayout = () => <CompanyProfile />

CompanyInfo.getLayout = (page) => (
  <RootLayout>
    <SettingsLayout>{page}</SettingsLayout>
  </RootLayout>
)

export default CompanyInfo
