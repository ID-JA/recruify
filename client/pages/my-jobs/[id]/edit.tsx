import { useRouter } from 'next/router'
import AppLayout from '../../../components/AppLayout/AppLayout'
import { NextPageWithLayout } from '../../_app'

const Edit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  return <div>This is edit page {id}</div>
}

export default Edit

Edit.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}
