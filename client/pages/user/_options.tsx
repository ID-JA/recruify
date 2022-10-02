import { MainLayout, ProfileLayout } from '~/components'
import { NextPageWithLayout } from '../_app'

const Options: NextPageWithLayout = () => {
  return <div>Options Page</div>
}

Options.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default Options
