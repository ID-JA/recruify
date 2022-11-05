import { Center, Grid, Skeleton, Text, Title } from '@mantine/core'

import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import useAuthStore from '@/store'
import { NextPageWithLayout } from '@/types'

const MainSections = [
  {
    title: 'Post a job',
    description: 'Open job slots 5',
  },
  {
    title: 'Candidates',
    description: 'you have 5 candidates',
  },
  {
    title: 'Jobs',
    description: 'you have 5 Active jobs',
  },
]

const Dashboard: NextPageWithLayout = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <>
      <Title order={1} mb="sm">
        Dashboard
      </Title>
      {user ? (
        <Text size="sm" mb="xl">
          Welcome {user?.name}
        </Text>
      ) : (
        <Skeleton height={20} width={150} />
      )}
      <Grid mt={20}>
        {MainSections.map((section, index) => (
          <Grid.Col span={4} key={index}>
            <Center>
              <div>
                <Title order={3} mb="sm">
                  {section.title}
                </Title>
                <Text size="sm" mb="xl">
                  {section.description}
                </Text>
              </div>
            </Center>
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}

export default Dashboard

Dashboard.getLayout = (page) => <RootLayout>{page}</RootLayout>
