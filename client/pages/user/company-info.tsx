import AppLayout from '../../components/AppLayout/AppLayout'
import CompanyProfile from '../../components/AppSettings/CompanySettings/CompanyProfile'
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout'
import { NextPageWithLayout } from '../_app'

const CompanyInfo: NextPageWithLayout = () => {
  return (
    <>
      <CompanyProfile />
    </>
  )
}

CompanyInfo.getLayout = (page) => {
  return (
    <AppLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </AppLayout>
  )
}

export default CompanyInfo
