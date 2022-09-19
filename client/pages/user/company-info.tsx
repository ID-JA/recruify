import AppLayout from '../../components/AppLayout/AppLayout'
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout'
import {NextPageWithLayout} from '../_app'

const CompanyInfo: NextPageWithLayout = () => {
  return <div>CompanyInfo Page</div>
}

CompanyInfo.getLayout = page => {
  return (
    <AppLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </AppLayout>
  )
}

export default CompanyInfo
