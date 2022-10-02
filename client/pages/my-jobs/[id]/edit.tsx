import { useRouter } from 'next/router'
import { NextPageWithLayout } from '~/pages/_app'
import { MainLayout } from '~/components'

const Edit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  return <div>This is edit page {id}</div>
}

export default Edit

Edit.getLayout = (page) => <MainLayout>{page}</MainLayout>
