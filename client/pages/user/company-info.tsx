import {
  MainLayout,
  ProfileLayout,
  CompanyInfo as CompanyProfile,
} from '~/components'
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
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default CompanyInfo
