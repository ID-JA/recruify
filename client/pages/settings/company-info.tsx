import {
  CompanyInfo as CompanyProfile,
  MainLayout,
  ProfileLayout,
} from '@/components'
import { NextPageWithLayout } from '@/types'

const CompanyInfo: NextPageWithLayout = () => <CompanyProfile />

CompanyInfo.getLayout = (page) => (
  <MainLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </MainLayout>
)

export default CompanyInfo
