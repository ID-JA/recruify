import AddEditOffer from '@/components/jobs/add-edit-offer'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { getJobOffer } from '@/services/employer-services'
import { NextPageWithLayout } from '@/types'
import { Divider, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const Edit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = useQuery(['job', id], () => getJobOffer(id), {
    enabled: !!id,
    retry: false,
    cacheTime: 0,
    staleTime: 0,
  })
  return (
    <>
      <Title order={2}>{data?.title}</Title>

      <Divider my="xl" />

      {data && <AddEditOffer offer={data} />}
    </>
  )
}

export default Edit

Edit.getLayout = (page) => <RootLayout>{page}</RootLayout>
