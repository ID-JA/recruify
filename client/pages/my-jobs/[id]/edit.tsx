import { MainLayout } from '@/components'
import { NextPageWithLayout } from '@/types'
import { useRouter } from 'next/router'

const Edit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  return <div>This is edit page {id}</div>
}

export default Edit

Edit.getLayout = (page) => <MainLayout>{page}</MainLayout>
