import { Skeleton } from '@mantine/core'

function JobPreviewPlaceholder() {
  return (
    <div>
      <Skeleton height={10} width={300} />
      <Skeleton height={10} width={80} my="md" />
      <Skeleton height={10} width={80} mb="xl" />
      <Skeleton height={10} width={200} mb="md" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} width={200} mt="xl" mb="md" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} mb="sm" />
      <Skeleton height={10} width={500} mb="sm" />
    </div>
  )
}

export default JobPreviewPlaceholder
