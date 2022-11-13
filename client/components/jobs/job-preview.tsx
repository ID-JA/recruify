import { getJobOffer } from '@/services/employer-services'
import { Alert, Button, Paper, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { Briefcase } from 'tabler-icons-react'

function JobPreview({ id }: { id: string }) {
  const { data } = useQuery(['job', id], () => getJobOffer(id), {
    enabled: !!id,
    retry: false,
  })

  return (
    <Paper
      withBorder
      p="xl"
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          marginBottom: '1rem',
        }}
      >
        <Title order={2} mb="xs">
          {data?.title}
        </Title>
        <Text>{data?.companyName}</Text>
        <Text>{data?.address}</Text>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <Briefcase size={20} color="#2f3639" />
        <span>{data?.employmentType}</span>
      </div>
      {data?.whyUs && <Alert title="Why us">{data?.whyUs}</Alert>}
      <div
        style={{
          marginTop: '1rem',
        }}
        dangerouslySetInnerHTML={{ __html: data?.description }}
      />
      {/* <div>render skills</div> */}
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button>Apply Now</Button>
      </div>
    </Paper>
  )
}

export default JobPreview
