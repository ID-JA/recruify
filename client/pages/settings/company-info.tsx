import { CompanyInfo as CompanyProfile } from '@/components'
import SettingsLayout from '@/layouts/SettingsLayout/SettingsLayout'
import { NextPageWithLayout } from '@/types'

const CompanyInfo: NextPageWithLayout = () => <CompanyProfile />

CompanyInfo.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>

export default CompanyInfo
