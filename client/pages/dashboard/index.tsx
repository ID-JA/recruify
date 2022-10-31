import { Center, Grid, Text, Title } from '@mantine/core'

import { RootLayout } from '@/layouts/RootLayout/RootLayout'
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
  return (
    <>
      <Title order={1} mb="sm">
        Dashboard
      </Title>
      <Text size="sm" mb="xl">
        Welcome Kent - Saturday, Sep 17, 2022
      </Text>
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
