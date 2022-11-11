import JobPreview from '@/components/jobs/job-preview'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { NextPageWithLayout } from '@/types'
import { useRouter } from 'next/router'

const JobPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  return (
    <div>
      <JobPreview id={id} />
    </div>
  )
}

JobPage.getLayout = (page) => <RootLayout>{page}</RootLayout>

export default JobPage
