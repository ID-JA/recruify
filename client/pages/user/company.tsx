import AppLayout from '../../components/AppLayout/AppLayout'
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout'
import {NextPageWithLayout} from '../_app'

const Company: NextPageWithLayout = () => {
  return <div>Hiring Company page</div>
}

Company.getLayout = page => {
  return (
    <AppLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </AppLayout>
  )
}
export default Company
