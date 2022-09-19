import AppLayout from '../../components/AppLayout/AppLayout'
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout'
import {NextPageWithLayout} from '../_app'

const Options: NextPageWithLayout = () => {
  return <div>Options Page</div>
}

Options.getLayout = page => {
  return (
    <AppLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </AppLayout>
  )
}

export default Options
