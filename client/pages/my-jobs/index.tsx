import AppLayout from '../../components/AppLayout/AppLayout'
import {NextPageWithLayout} from '../_app'

const MyJobs: NextPageWithLayout = () => {
  return (
    <>
      <h1>My jobs page</h1>
    </>
  )
}

MyJobs.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default MyJobs
