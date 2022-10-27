import { MainLayout, ProfileLayout } from '@/components'
import { NextPageWithLayout } from '@/types'

const Company: NextPageWithLayout = () => {
  return <div>Hiring Company page</div>
}

Company.getLayout = (page) => (
  <MainLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </MainLayout>
)

export default Company
