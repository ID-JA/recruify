import { Group, Paper, Skeleton } from '@mantine/core'

function JobOfferPlaceholder() {
  return (
    <Paper withBorder px="md" py="lg" mb="md">
      <Group position="apart" align="center">
        <div>
          <Group position="apart" align="center" mb="xs">
            <Skeleton height={20} width={112} />
            <Skeleton height={20} width={20} circle />
          </Group>
          <Skeleton height={20} width={160} />
        </div>
        <Group
          position="apart"
          align="center"
          sx={{
            width: '50%',
          }}
        >
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={80} />
          <Skeleton height={20} width={90} />
        </Group>
      </Group>
    </Paper>
  )
}

export default JobOfferPlaceholder
