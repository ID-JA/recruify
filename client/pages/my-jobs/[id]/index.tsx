import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { NextPageWithLayout } from '@/types'

const JobPage: NextPageWithLayout = () => {
  return <div></div>
}

JobPage.getLayout = (page) => <RootLayout>{page}</RootLayout>

export default JobPage
