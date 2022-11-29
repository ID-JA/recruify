import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { fetchApplicants } from '@/services/employer-services'
import { NextPageWithLayout } from '@/types'
import { Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const JobPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = useQuery(['applicants', id], () => fetchApplicants(id))

  const loading = useMemo(() => !data, [data])
  return (
    <div>
      <Title>Applicants for Job</Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            Total Applicant:
            {data?.length}
          </div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

JobPage.getLayout = (page) => <RootLayout>{page}</RootLayout>

export default JobPage
