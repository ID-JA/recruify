import { MainLayout, ProfileLayout } from '~/components'
import { NextPageWithLayout } from '../_app'

const Company: NextPageWithLayout = () => {
  return <div>Hiring Company page</div>
}

Company.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}
export default Company
