import {
  MainLayout,
  ProfileLayout,
  CompanyInfo as CompanyProfile,
} from '~/components'
import { NextPageWithLayout } from '../_app'

const CompanyInfo: NextPageWithLayout = () => <CompanyProfile />

CompanyInfo.getLayout = (page) => (
  <MainLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </MainLayout>
)

export default CompanyInfo
